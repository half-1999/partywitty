import { useState, useRef } from "react";
import Package from "./tabs/Package";
import Overview from "./tabs/Overview";
import Gallery from "./tabs/Gallery";
import Teaser from "./tabs/Teaser";
import Reviews from "./tabs/Review";
import Posts from "./tabs/Post";
import CateringInfo from "./tabs/CateringDetails";

const TABS = [
  "Overview",
  "Menu",
  "Gallery",
  "Teaser",
  "Catering Details",
  "Review",
  "Post",
];

export default function CateringTabs({ packageData, clubData }) {
  const [activeTab, setActiveTab] = useState("Teaser");
  const contentRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      if (!contentRef.current) return;

      const yOffset = -200; // 200px gap from top
      const y =
        contentRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <div className="mt-6">
      <div className="sticky top-0 z-50 bg-white pt-2">
        <div className="bg-white rounded-xl p-2 shadow flex gap-3 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2 rounded-full whitespace-nowrap cursor-pointer font-medium transition
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

      <div
        ref={contentRef}
        className="mt-10 bg-white rounded-xl p-4 shadow min-h-[300px]"
      >
        {activeTab === "Overview" && (
          <Overview packageData={packageData} clubData={clubData} />
        )}

        {activeTab === "Menu" && (
          <Package packageData={packageData} packages={clubData} />
        )}

        {activeTab === "Gallery" && <Gallery images={clubData?.gallery} />}

        {activeTab === "Teaser" && <Teaser clubData={clubData?.teasers} />}

        {activeTab === "Catering Details" && (
          <CateringInfo packageData={packageData} clubData={clubData} />
        )}

        {activeTab === "Review" && <Reviews packageData={packageData} />}

        {activeTab === "Post" && <Posts clubSlug={packageData?.club_slug} />}
      </div>
    </div>
  );
}
