import { useState, useRef } from "react";
import Package from "./tabs/Package";
import Overview from "./tabs/Overview";
import Gallery from "./tabs/Gallery";
import Teaser from "./tabs/Teaser";
import Reviews from "./tabs/Review";
import Posts from "./tabs/Post";
import CateringDetails from "./tabs/CateringDetails";

const TABS = [
  "Overview",
  "Package",
  "Gallery",
  "Teaser",
  "Catering Details",
  "Review",
  "Post",
];

export default function CateringTabs() {
  const [activeTab, setActiveTab] = useState("Package");
  const contentRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Smooth scroll to content
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <div className="mt-6">
      {/* ================= STICKY TABS BAR ================= */}
      <div className="sticky top-0 z-50 bg-white pt-2">
        <div className="bg-white rounded-xl p-2 shadow flex gap-3 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2 rounded-full cursor-pointer shadow-2xl whitespace-nowrap font-medium transition
                ${
                  activeTab === tab
                    ? "bg-[#6C5CE7] text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT AREA ================= */}
      <div
        ref={contentRef}
        className="mt-3 bg-white rounded-xl p-2 shadow min-h-[300px]"
      >
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Package" && <Package />}
        {activeTab === "Gallery" && <Gallery />}
        {activeTab === "Teaser" && <Teaser />}
        {activeTab === "Catering Details" && <CateringDetails />}
        {activeTab === "Review" && <Reviews />}
        {activeTab === "Post" && <Posts />}
      </div>
    </div>
  );
}
