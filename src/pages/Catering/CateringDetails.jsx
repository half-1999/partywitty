import { Link, useNavigate, useParams } from "react-router-dom";
import CateringTabs from "../../component/CateringTabs";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import BottomBookingBar from "../../component/BottomBookingBar";
import axios from "axios";
import CateringPackageCard from "../../component/CateringPackageCard";
import RecommendedPackages from "../../component/RecommendedPackages";
import { API_BASE } from "../../component/baseURL";

export default function CateringDetails() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);
  const [club, setClub] = useState(null);
  const { club_slug, package_slug } = useParams();

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("club_slug", club_slug);
      formData.append("package_slug", package_slug);

      const response = await axios.post(
        `${API_BASE}/Web/packageDetails`,
        formData
      );
      console.log(response);

      if (response.data?.status && response.data.data?.length > 0) {
        const pkg = response.data.data;
        setPackages(pkg);

        // 🔥 Trigger club fetch using package data
        fetchClubDetails(pkg[0].club_slug, pkg[0].latitude, pkg[0].longitude);
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

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded hover:bg-gray-100  cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold uppercase text-blue-600">
          {club_slug} -{" "}
          <span className="text-xl text-red-600">{package_slug}</span>
        </h1>
      </div>
      {/* Top Row */}
      <div className="flex flex-col gap-2 mb-4">
        <Breadcrumb
          items={[
            { label: "Recommended Party Packages", to: "/dashboard/catering" },
            { label: package_slug }, // current page (no link)
          ]}
        />
      </div>

      {packages[0] && (
        <>
          <CateringPackageCard data={packages[0]} />

          <CateringTabs packageData={packages[0]} clubData={club} />
        </>
      )}

      {/* FAQ ACCORDION */}
      <div className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden mt-5 mb-2">
        <div
          onClick={() => toggleAccordion("faq")}
          className="flex justify-between items-center p-2 cursor-pointer font-semibold"
        >
          Frequently asked questions
          <FaChevronDown
            className={`transition ${
              openAccordion === "faq" ? "rotate-180" : ""
            }`}
          />
        </div>

        {openAccordion === "faq" && (
          <div className="p-2 border-t text-gray-700">
            <p>Here goes your FAQ content...</p>
          </div>
        )}
      </div>

      {/* TERMS ACCORDION */}
      <div className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden m-2 mb-10">
        <div
          onClick={() => toggleAccordion("terms")}
          className="flex justify-between items-center p-2 cursor-pointer font-semibold"
        >
          Terms of Service
          <FaChevronDown
            className={`transition ${
              openAccordion === "terms" ? "rotate-180" : ""
            }`}
          />
        </div>

        {openAccordion === "terms" && (
          <div className="p-2 border-t text-gray-700">
            {packages?.[0]?.tc ? (
              <div dangerouslySetInnerHTML={{ __html: packages[0].tc }} />
            ) : (
              <p>No Terms and Conditions</p>
            )}
          </div>
        )}
      </div>

      <RecommendedPackages packageId={packages?.id} clubId={97} />

      {/* VEG PACKAGES */}
      {/* 

      <div className="space-y-2">
        {vegPackages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 md:p-6">
              <div className="relative w-full h-[220px] lg:h-[260px] rounded-2xl overflow-hidden lg:col-span-1">
                <img src={pkg.image} className="w-full h-full object-cover" />

                <div className="absolute top-3 left-3 bg-white/90 p-2 rounded-full">
                  <FiHeart />
                </div>
                <div className="absolute top-3 left-14 bg-white/90 p-2 rounded-full">
                  <FiShare2 />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-2">
                <p className="text-sm text-gray-600">
                  <b>Rohit Sharma</b> have used the catering service for this
                  caterer
                </p>

                <h2 className="text-xl md:text-2xl font-bold">
                  Cater’s Code - T45665467
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <FaStar className="text-yellow-500" /> {pkg.rating}
                  </span>
                  <span className="text-gray-500 underline cursor-pointer">
                    Review ({pkg.reviews})
                  </span>
                  <span className="text-blue-600 underline cursor-pointer">
                    Caterings Done (234)
                  </span>
                </div>

                <p className="text-gray-600 text-sm">
                  Serves In - {pkg.location}{" "}
                  <span className="text-blue-600">+8 More</span>
                </p>

                <div className="flex flex-wrap gap-2 text-sm mt-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    🍸 IMFL Drinks + Food
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    🍽 3 hrs
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    🕒 1.5 hrs
                  </span>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-2">
                <p className="font-semibold">Inclusion</p>

                <div className="flex flex-wrap gap-2">
                  {pkg.inclusions.map((i, iidx) => (
                    <span
                      key={iidx}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                    >
                      {i}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs cursor-pointer">
                    +3 More
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 pb-4 md:px-6 md:pb-6">
              <div className="hidden lg:block" />{" "}
              <div className="lg:col-span-3">
                <div className="flex flex-col md:flex-row overflow-hidden rounded-xl">
                  <div className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-4 py-3 font-medium">
                    Flat 50% Off Up To 750 On Booking Amount | Coupon: PARTY25
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-semibold">
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-1 text-sm text-slate-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-blue-600 transition font-medium "
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold uppercase">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
      ))}

      <BottomBookingBar />
    </div>
  );
}
