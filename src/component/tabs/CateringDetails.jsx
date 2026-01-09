import React, { useState } from "react";
import { IMAGE_BASE } from "../baseURL";
import Swal from "sweetalert2";

const CateringDetails = ({ clubData }) => {
  const [showMore, setShowMore] = useState(false);
  if (!clubData) return null;

  const {
    name,
    about,
    address,
    open_time,
    close_time,
    club_menu = [],
    party_packages = [],
  } = clubData;

  const description = about?.description || "";

  // Utility
  const splitText = (text, limit = 240) =>
    text.length > limit ? text.slice(0, limit) : text;

  const openImagePreview = (src, title = "Menu Image") => {
    Swal.fire({
      title,
      imageUrl: src,
      imageAlt: title,
      width: "80vw",
      padding: "1rem",
      background: "#000",
      showCloseButton: true,
      showConfirmButton: false,
      imageWidth: "100%",
      imageHeight: "80vh",
      customClass: {
        popup: "rounded-xl",
      },
    });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">About {name}</h2>

          <p className="text-gray-700 leading-relaxed">
            {!showMore ? splitText(description) : description}
            {!showMore && description.length > 240 && "..."}
          </p>

          {description.length > 240 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-violet-600 font-semibold mt-2 hover:underline"
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          )}

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              <strong>Venue Type:</strong> {about?.venue_type}
            </p>
            <p>
              <strong>Address:</strong> {address}
            </p>
            <p>
              <strong>Timings:</strong> {open_time} – {close_time}
            </p>
          </div>
        </section>

        <hr />

        {club_menu.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Available Menus</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {club_menu.map((menu) => (
                <div
                  key={menu.id}
                  className="border rounded-xl p-4 shadow-sm bg-white space-y-3"
                >
                  <h3 className="font-semibold text-lg">{menu.name}</h3>

                  <p className="text-sm text-gray-600">
                    {menu.images?.length || 0} Menu Images Available
                  </p>

                  {menu.images?.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {menu.images.map((img, index) => (
                        <div
                          key={index}
                          className="h-32 rounded-lg overflow-hidden border bg-gray-100"
                        >
                          <img
                            src={`${IMAGE_BASE}${img.img}`}
                            alt={`${menu.name} ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition"
                            loading="lazy"
                            onClick={() =>
                              openImagePreview(
                                `${IMAGE_BASE}${img.img}`,
                                `${menu.name}`
                              )
                            }
                            onError={(e) => {
                              e.target.src = "/placeholder.jpg";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <hr />

        {party_packages.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Catering Inclusions</h2>

            <div className="space-y-4">
              {party_packages.slice(0, 2).map((pkg) => (
                <div key={pkg.id} className="border rounded-xl p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>

                  <ul className="grid md:grid-cols-2 gap-2 text-gray-700 list-disc pl-5 text-sm">
                    {pkg.inclusion?.veg_starter && (
                      <li>Veg Starters: {pkg.inclusion.veg_starter}</li>
                    )}
                    {pkg.inclusion?.nonveg_starter && (
                      <li>Non-Veg Starters: {pkg.inclusion.nonveg_starter}</li>
                    )}
                    {pkg.inclusion?.veg_maincourse && (
                      <li>Veg Main Course: {pkg.inclusion.veg_maincourse}</li>
                    )}
                    {pkg.inclusion?.nonveg_maincourse && (
                      <li>
                        Non-Veg Main Course: {pkg.inclusion.nonveg_maincourse}
                      </li>
                    )}
                    {pkg.inclusion?.breads && (
                      <li>Breads: {pkg.inclusion.breads}</li>
                    )}
                    {pkg.inclusion?.veg_desserts && (
                      <li>Desserts: {pkg.inclusion.veg_desserts}</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr />

        <section>
          <h2 className="text-2xl font-bold mb-4">Catering Features</h2>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li>Professional Chefs</li>
              <li>Live Counters Available</li>
              <li>Premium Cutlery</li>
              <li>Pre-Event Setup</li>
            </ul>

            <ul className="list-disc pl-6 space-y-2">
              <li>Dedicated Service Staff</li>
              <li>Hygienic Food Preparation</li>
              <li>Custom Menu Options</li>
              <li>Post-Event Cleanup</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CateringDetails;
