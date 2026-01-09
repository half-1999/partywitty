import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";

import { IMAGE_BASE } from "../baseURL";
import { useNavigate } from "react-router-dom";

export default function PackageHorizontalSlider({ packages }) {
  const data = packages?.party_packages || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!data.length) return;
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % data.length),
      2000
    );
    return () => clearInterval(interval);
  }, [data.length]);

  if (!data.length) return null;

  return (
    <div className="w-full relative overflow-hidden px-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {data.map((pkg) => (
          <div key={pkg?.id} className="min-w-full">
            <HorizontalCard pkg={pkg} />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-5 mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full ${
              current === index ? "bg-violet-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function HorizontalCard({ pkg }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!pkg?.package_slug || !pkg?.club_slug) return;

    navigate(`/dashboard/catering/${pkg.club_slug}/${pkg.package_slug}`);
  };
  const showAllInclusions = () => {
    const inc = pkg?.inclusion || {};

    Swal.fire({
      title: "Package Inclusions",
      html: `
      <div style="text-align:left">
        ${inc.veg_starter ? `<p>🍃 Veg Starter: ${inc.veg_starter}</p>` : ""}
        ${
          inc.nonveg_starter
            ? `<p>🍗 Non-Veg Starter: ${inc.nonveg_starter}</p>`
            : ""
        }
        ${
          inc.veg_maincourse
            ? `<p>🍛 Veg Maincourse: ${inc.veg_maincourse}</p>`
            : ""
        }
        ${
          inc.nonveg_maincourse
            ? `<p>🥩 Non-Veg Maincourse: ${inc.nonveg_maincourse}</p>`
            : ""
        }
        ${inc.veg_rice ? `<p>🍚 Rice: ${inc.veg_rice}</p>` : ""}
        ${inc.breads ? `<p>🥖 Breads: ${inc.breads}</p>` : ""}
        ${inc.veg_desserts ? `<p>🍰 Desserts: ${inc.veg_desserts}</p>` : ""}

        ${
          inc.total_alcoholic
            ? `<hr/><p><b>Alcoholic Drinks</b><br/>${inc.total_alcoholic}</p>`
            : ""
        }
      </div>
    `,
      width: 600,
      confirmButtonColor: "#7c3aed",
    });
  };

  const inc = pkg?.inclusion || {};

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl gap-5 overflow-hidden flex">
      <div className="w-[30%]">
        <img
          src={
            pkg?.clubLogo
              ? `${IMAGE_BASE}${pkg.clubLogo}`
              : pkg?.thumbnail
              ? `${IMAGE_BASE}${pkg.thumbnail}`
              : "/placeholder.jpg"
          }
          alt={pkg?.clubName || "Club Image"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-[70%] flex flex-col">
        <div className="flex p-6 gap-6 flex-1">
          <div className="flex-1">
            <h2 className="text-xl font-bold">{pkg?.title}</h2>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <FaMapMarkerAlt /> {pkg?.areaName}, {pkg?.cityName}
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
              <FaUtensils /> {pkg?.foodserving}
            </div>

            <div className="mt-4">
              <p className="font-semibold text-sm">Service Time</p>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FaClock /> 3 hr
              </div>
            </div>
          </div>

          <div className="w-64 border-l pl-6">
            <h3 className="font-semibold text-lg mb-2 text-right">Inclusion</h3>

            <ul className="text-sm text-gray-600 space-y-1 text-right">
              {inc.veg_starter && <li>Veg Starter: {inc.veg_starter}</li>}
              {inc.nonveg_starter && (
                <li>Non-Veg Starter: {inc.nonveg_starter}</li>
              )}
              {inc.veg_maincourse && (
                <li>Veg Maincourse: {inc.veg_maincourse}</li>
              )}
              {inc.nonveg_maincourse && (
                <li>Non-Veg Maincourse: {inc.nonveg_maincourse}</li>
              )}
              {inc.veg_desserts && <li>Desserts: {inc.veg_desserts}</li>}

              <li
                onClick={showAllInclusions}
                className="text-violet-600 font-medium cursor-pointer"
              >
                + View All
              </li>
            </ul>
          </div>
        </div>

        <div className="relative flex items-center justify-between px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-b-3xl overflow-hidden">
          <div className="absolute left-[140px] top-0 h-full w-3 bg-white transform -skew-x-12"></div>

          <button
            className="relative z-10 text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-white/10 transition"
            onClick={handleViewDetails}
          >
            View Details
          </button>

          <p className="relative z-10 text-white text-sm font-semibold text-right">
            <span className="text-xs font-medium opacity-90">
              Coupon Code: PARTY25
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
