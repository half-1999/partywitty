import {
  Clock,
  Star,
  Calendar,
  Users,
  ShieldCheck,
  MapPin,
  Receipt,
  Wallet,
  Timer,
  Utensils,
  Martini,
  IceCream,
  TimerReset,
  Clock4,
  Leaf,
} from "lucide-react";

import Swal from "sweetalert2";
import { cateringHeaderData as data } from "../data/cateringHeaderData";

export default function CateringTopHeader() {
  return (
    <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#f6f6ef] w-full">
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-cyan-400 to-green-400 text-center text-sm font-semibold py-4">
        Make your counter bid and grab the best deal for your catering! •{" "}
        <span className="underline cursor-pointer">Counter Bid</span>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-2">
        {/* MAIN GRID */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* LEFT INFO */}
          <div className="w-full md:w-[22%] space-y-2">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              {data.title}
            </h2>

            <div className="text-sm font-medium">
              Cater’s Code - {data.code}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {data.rating}
              </span>
              <span className="underline font-semibold cursor-pointer">
                Review ({data.totalReviews})
              </span>
            </div>

            <div className="text-sm font-medium">
              Serves In - {data.locations.primary}{" "}
              <span className="text-blue-600 font-semibold cursor-pointer">
                +{data.locations.more.length} More
              </span>
            </div>

            <div className="text-sm underline font-semibold cursor-pointer">
              Caterings Done ({data.stats.completed})
            </div>
          </div>

          {/* RIGHT STACK */}
          <div className="w-full md:w-[88%] space-y-4">
            {/* TIMER + PRICE */}
            <div className="flex justify-between items-center">
              <div className="bg-white rounded-full px-6 py-2 text-sm font-bold shadow">
                03 : 40 : 59
              </div>

              <div className="text-right">
                <div className="text-green-600 line-through font-semibold text-sm">
                  MRP-₹{data.pricing.mrp}
                </div>
                <div className="text-3xl font-bold">₹{data.pricing.offer}</div>
              </div>
            </div>

            {/* AMOUNTS */}
            <div className="grid md:grid-cols-3 gap-4">
              <WhitePill text={`Total Amount : ₹${data.pricing.total}`} />
              <WhitePill
                text={`Advance Booking Amount : ₹${data.pricing.advance}`}
              />
              <WhitePill text={`Balance Amount : ₹${data.pricing.balance}`} />
            </div>

            {/* DATE BAR */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-600 rounded-xl text-white flex justify-between px-4 py-4 font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {data.dateTime.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {data.dateTime.time}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {data.dateTime.guests}
              </div>
            </div>
          </div>
        </div>

        <hr className="text-gray-300" />

        {/* BOTTOM FEATURES */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-wrap gap-3">
            <FeaturePill
              green
              icon={<Utensils />}
              text="3 Starters + 2 Main Course"
            />
            <FeaturePill
              icon={<Martini />}
              text="2 Mocktails + 2 Soft drinks"
            />
            <FeaturePill icon={<IceCream />} text="Dessert" />
            <FeaturePill icon={<TimerReset />} text="3h" />
            <FeaturePill icon={<Clock4 />} text="1.5h" />
            <FeaturePill icon={<Leaf />} text="Pure Veg" />
          </div>

          <div className="ml-auto flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure Payment
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-gradient-to-r from-cyan-400 to-green-400 text-center text-sm font-bold py-4">
        Great Choice! ₹{data.pricing.mrp - data.pricing.offer} would be Saved
        Instantly on This Booking!
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function WhitePill({ text }) {
  return (
    <div className="bg-white rounded-full px-4 py-2 text-sm text-center shadow font-medium">
      {text}
    </div>
  );
}

function GradientPill({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl py-3 text-white font-semibold bg-gradient-to-r from-yellow-400 to-orange-500">
      {icon}
      {text}
    </div>
  );
}

function FeaturePill({ icon, text, green }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        ${
          green
            ? "bg-green-100 text-green-700"
            : "bg-white border text-gray-700"
        }`}
    >
      {icon}
      {text}
    </div>
  );
}
