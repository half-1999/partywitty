import { useState } from "react";
import {
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  Leaf,
  IndianRupee,
  Utensils,
  MapPin,
  BadgeCheck,
  GlassWater,
} from "lucide-react";
import { FaCocktail, FaIceCream } from "react-icons/fa";
import { IMAGE_BASE } from "./baseURL";

export default function CateringPackageCard({ data }) {
  const highlightBadges = [
    {
      condition: Number(data?.starter_choice) > 0,
      icon: <Utensils size={14} />,
      text: `${data?.starter_choice} Starters`,
    },
    {
      condition: Number(data?.maincourse_choice) > 0,
      icon: <Utensils size={14} />,
      text: `${data?.maincourse_choice} Main Course`,
    },
    {
      condition: Number(data?.rice_choice) > 0,
      icon: <Utensils size={14} />,
      text: `${data?.rice_choice} Rice`,
    },
    {
      condition: Number(data?.breads_choice) > 0,
      icon: <Utensils size={14} />,
      text: `${data?.breads_choice} Breads`,
    },
    {
      condition: Number(data?.desserts_choice) > 0,
      icon: <FaIceCream />,
      text: `${data?.desserts_choice} Desserts`,
    },
    {
      condition: data?.mocktails_choice === "All",
      icon: <FaCocktail />,
      text: "Mocktails Included",
    },
    {
      condition: data?.soft_drinks_choice === "All",
      icon: <GlassWater size={14} />,
      text: "Soft Drinks Included",
    },
    {
      condition: data?.foodserving,
      icon: <Clock size={14} />,
      text: `Food Serving: ${data?.foodserving}`,
    },
    {
      condition: Number(data?.gst) > 0,
      icon: <IndianRupee size={14} />,
      text: `GST ${data?.gst}% Included`,
    },
    {
      condition: data?.type === "Non-Alcoholic",
      icon: <Leaf size={14} />,
      text: "Pure Veg / Non-Alcoholic",
    },
    {
      condition: data?.verify_status === "verified",
      icon: <ShieldCheck className="text-green-600" size={14} />,
      text: "Verified Vendor",
    },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-300 bg-white flex flex-col">
      {/* TOP INFO BAR */}
      <div className="bg-gradient-to-r from-cyan-400 to-green-400 text-center py-2 text-sm font-semibold text-white">
        Make your counter bid and grab the best deal for your catering!
      </div>

      {/* MAIN CONTENT */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row gap-4">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/3 flex-shrink-0 h-48 md:h-auto">
          <img
            src={
              data?.thumbnail
                ? `${IMAGE_BASE}${data.thumbnail}`
                : "/placeholder.jpg"
            }
            alt={data?.clubName || "Club Image"}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="flex-1 flex flex-col gap-4">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {data?.title}
                <Leaf className="text-green-600" size={18} />
              </h2>
              <p className="text-xs uppercase font-semibold text-gray-500">
                {data?.type} • {data?.vendor_type}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1 truncate">
                <MapPin size={14} /> {data?.address}
              </p>
              <div className="flex items-center gap-2 mt-1 text-sm flex-wrap">
                ⭐ 4.1 (3 Reviews)
                {data?.verify_status === "verified" && (
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <BadgeCheck size={14} /> Verified
                  </span>
                )}
              </div>
            </div>

            {/* TIME + PRICE */}
            <div className="flex flex-col sm:items-end gap-2 min-w-[140px]">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} /> {data?.open_time} – {data?.close_time}
              </p>
              <p className="text-sm text-green-600 line-through">
                MRP ₹{data?.mrp}
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-black">
                ₹{data?.price}
              </p>
            </div>
          </div>

          {/* AMOUNT PILLS */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-wrap justify-between">
            <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm font-semibold min-w-[160px] text-center">
              Total Amount : ₹{(data?.price || 0) * (data?.mg || 0)}
            </div>
            <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm font-semibold min-w-[160px] text-center">
              Advance Booking Amount : ₹{data?.advance || 1200}
            </div>
            <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm font-semibold min-w-[160px] text-center">
              Balance Amount : ₹
              {(data?.price || 0) * (data?.mg || 0) - (data?.advance || 1200)}
            </div>
          </div>

          {/* DATE / TIME / GUEST */}
          <div className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-2xl px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-white font-semibold gap-2">
            <div className="flex items-center gap-2">
              <Calendar size={18} /> {data?.event_date || "10 April 2025"}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {data?.open_time} PM Onwards
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} /> {data?.mg} Guests
            </div>
          </div>

          {/* HIGHLIGHTS BADGES */}
          <div className="flex flex-wrap gap-2 mt-3">
            {highlightBadges
              .filter((badge) => badge.condition)
              .map((badge, idx) => (
                <Badge key={idx} icon={badge.icon} text={badge.text} />
              ))}
          </div>
        </div>
      </div>

      {/* BOTTOM INFO BAR */}
      <div className="bg-gradient-to-r from-cyan-400 to-green-400 text-center py-2 text-sm font-semibold text-white">
        Great Choice! ₹500 would be Saved Instantly on This Booking!
      </div>
    </div>
  );
}

/* ---------- REUSABLE BADGE ---------- */
const Badge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-gray-50 text-sm flex-shrink-0">
    {icon} {text}
  </div>
);
