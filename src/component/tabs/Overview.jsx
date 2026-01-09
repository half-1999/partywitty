import React from "react";
import Package from "./Package";
import Gallery from "./Gallery";
import Teaser from "./Teaser";
import CateringDetails from "./CateringDetails";
import Reviews from "./Review";

const Overview = ({ packageData, clubData }) => {
  console.log(packageData, clubData);
  return (
    <div className="space-y-10">
      <Package packageData={packageData} />
      <Gallery images={clubData?.gallery} />
      <Teaser clubData={clubData?.teasers} />
      <CateringDetails clubData={clubData} />
      <Reviews packageData={packageData} />
    </div>
  );
};

export default Overview;
