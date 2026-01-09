import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaUtensils } from "react-icons/fa";
import { IMAGE_BASE, API_BASE } from "../../component/baseURL";
import { ArrowLeft } from "lucide-react";

export default function CateringList() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [club, setClub] = useState(null);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("club_slug", "flaunt-by-dutyfree--noida-sector-142");
      formData.append("package_slug", "veg-food-only");

      const response = await axios.post(
        `${API_BASE}/Web/packageDetails`,
        formData
      );

      if (response.data?.status && response.data.data?.length > 0) {
        const pkg = response.data.data[0];
        fetchClubDetails(pkg.club_slug, pkg.latitude, pkg.longitude);
      } else {
        setError("No package data found");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchClubDetails = async (slug, latitude, longitude) => {
    try {
      const formData = new FormData();
      formData.append("slug", slug);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const response = await axios.post(
        `${API_BASE}/Web/getClubDetails`,
        formData
      );

      if (response.data?.status) {
        setClub(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch club details", err);
    }
  };

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  if (loading) return <p className="p-4">Loading packages...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-2 md:p-4">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded hover:bg-gray-100  cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Recommended Party Packages</h1>
      </div>

      <div className="space-y-6">
        {club?.party_packages?.map((pkg) => (
          <div
            key={pkg.id}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* MAIN ROW */}
            <div className="flex flex-col sm:flex-row">
              {/* LEFT IMAGE */}
              <div className="w-full sm:w-1/4 bg-black h-48 sm:h-auto">
                <img
                  src={
                    pkg.packageThumbnail
                      ? `${IMAGE_BASE}${pkg.packageThumbnail}`
                      : "/fallback-image.png"
                  }
                  alt={pkg.clubName || pkg.title}
                  className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                />
              </div>

              {/* CENTER DETAILS */}
              <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold truncate">{pkg.title}</h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 flex-wrap">
                    <FaMapMarkerAlt />
                    <span className="truncate">
                      {pkg.areaName}, {pkg.cityName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-2 flex-wrap">
                    <FaUtensils /> {pkg.foodserving}
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-semibold">Service Time</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaClock /> 3 hr
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT INCLUSIONS */}
              <div className="w-full sm:w-1/4 border-t sm:border-t-0 sm:border-l p-4 sm:p-6">
                <h3 className="font-semibold text-sm mb-2 text-right sm:text-right">
                  Inclusion
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 text-right">
                  {pkg.inclusion?.veg_starter && (
                    <li>Veg Starter: {pkg.inclusion.veg_starter}</li>
                  )}
                  {pkg.inclusion?.nonveg_starter && (
                    <li>Non-Veg Starter: {pkg.inclusion.nonveg_starter}</li>
                  )}
                  {pkg.inclusion?.veg_maincourse && (
                    <li>Veg Maincourse: {pkg.inclusion.veg_maincourse}</li>
                  )}
                  {pkg.inclusion?.nonveg_maincourse && (
                    <li>
                      Non-Veg Maincourse: {pkg.inclusion.nonveg_maincourse}
                    </li>
                  )}
                  {pkg.inclusion?.veg_desserts && (
                    <li>Desserts: {pkg.inclusion.veg_desserts}</li>
                  )}
                </ul>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="relative flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 gap-2 sm:gap-0">
              {/* Decorative skew bar */}
              <div className="absolute left-[100px] sm:left-[160px] top-0 h-full w-3 bg-white -skew-x-12 hidden sm:block"></div>

              {/* View Details Button */}
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/catering/${pkg.club_slug}/${pkg.package_slug}`
                  )
                }
                className="text-white font-semibold text-sm px-4 py-3 rounded-md hover:bg-white/20 transition w-full sm:w-auto text-center cursor-pointer"
              >
                View Details
              </button>

              {/* Coupon Code */}
              <span className="text-white text-xs font-medium text-center sm:text-right">
                Coupon Code: PARTY25
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
