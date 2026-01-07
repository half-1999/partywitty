import { Link } from "react-router-dom";
import CateringTabs from "../../component/CateringTabs";
import CateringTopHeader from "../../component/CateringTopHeader";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { FiHeart, FiShare2 } from "react-icons/fi";
import BottomBookingBar from "../../component/BottomBookingBar";

export default function CateringDetails() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const vegPackages = [
    {
      title: "Black Dog Premium IMFL Package",
      image:
        "https://antiquitywhisky.in/wp-content/uploads/2024/07/Black-Dog-Price-in-August-2024.webp",
      rating: 4.6,
      reviews: 128,
      location: "Sector 63, Noida",
      inclusions: [
        "Black Dog Whisky",
        "3 Starters",
        "2 Main Course",
        "5+ Mocktails",
        "1 Waiter / 20 Pax",
        "Transport Included",
      ],
    },
    {
      title: "Chivas Regal Royal Party Package",
      image:
        "https://cdn-img.freshdi.com/640x640/files/24b49ed703d407e6042401fa69323857.jpg",
      rating: 4.8,
      reviews: 214,
      location: "Delhi NCR",
      inclusions: [
        "Chivas Regal",
        "4 Starters",
        "3 Main Course",
        "Cocktail Counter",
        "2 Bartenders",
        "Premium Glassware",
      ],
    },
    {
      title: "Jack Daniel’s Night Bash Package",
      image:
        "https://flickkon7.myshopify.com/cdn/shop/products/Jack-Daniel_s-Single-Barrel-45_650x.jpg?v=1587537730",
      rating: 4.7,
      reviews: 176,
      location: "Gurgaon",
      inclusions: [
        "Jack Daniel’s",
        "Live Grill Counter",
        "4 Starters",
        "3 Main Course",
        "DJ + Bar Setup",
        "2 Bartenders",
      ],
    },
  ];

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="md:p-4">
      {/* Top Row */}
      <div className="flex flex-col gap-2 mb-4">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Catering Details", to: "/catering" },
            { label: "Selected Item" }, // current page (no link)
          ]}
        />
      </div>

      <CateringTopHeader />
      <CateringTabs />

      {/* FAQ ACCORDION */}
      <div className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden m-2">
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
      <div className="bg-white rounded-xl shadow border border-gray-300 overflow-hidden m-2">
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
            <p>Here goes your Terms & Conditions...</p>
          </div>
        )}
      </div>

      {/* VEG PACKAGES */}
      <h2 className="text-2xl font-bold pt-4">
        Veg Package From Other Catering
      </h2>

      <div className="space-y-6">
        {vegPackages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* ================= TOP CONTENT ================= */}
            <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* ========== LEFT IMAGE ========== */}
              <div className="relative w-full lg:w-[280px] h-[220px] lg:h-[260px] rounded-2xl overflow-hidden shrink-0">
                <img src={pkg.image} className="w-full h-full object-cover" />

                <div className="absolute top-3 left-3 bg-white/90 p-2 rounded-full">
                  <FiHeart />
                </div>
                <div className="absolute top-3 left-14 bg-white/90 p-2 rounded-full">
                  <FiShare2 />
                </div>
              </div>

              {/* ========== MIDDLE INFO ========== */}
              <div className="flex-1 space-y-2">
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

              {/* ========== RIGHT INCLUSION ========== */}
              <div className="w-full lg:w-[300px] space-y-2">
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
            {/* ================= BOTTOM DISCOUNT BAR ================= */}
            <div className="">
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
        ))}
      </div>
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
              className="hover:text-blue-600 transition font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold">{item.label}</span>
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
