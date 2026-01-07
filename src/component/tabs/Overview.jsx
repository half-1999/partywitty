import React from "react";
import Package from "./Package";
import Gallery from "./Gallery";
import Teaser from "./Teaser";
import CateringDetails from "./CateringDetails";
import Reviews from "./Review";
import Posts from "./Post";

const Overview = () => {
  return (
    <div className="space-y-5">
      <Package />
      <Gallery />
      <Teaser />
      <CateringDetails />
      <Reviews />
      <Posts />
    </div>
  );
};

export default Overview;
