import React, { useState } from "react";

const CateringDetails = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="p-2">
      <div className="space-y-5">
        {/* ABOUT */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            About The &lt; name of the Venue &gt;
          </h2>

          <p className="text-gray-700 leading-relaxed transition-all duration-300">
            The Grand Sapphire Hall is a premier event venue located in the
            heart of Delhi. Known for its luxurious interiors, elegant ambiance,
            and top-notch services, it is the perfect location for weddings,
            corporate events, receptions, and social gatherings.
            {!showMore && "..."}
            {showMore && (
              <>
                {" "}
                With world-class catering, professional staff, and customizable
                décor options, we ensure every event becomes a memorable
                experience. Our spacious halls, modern lighting, and seamless
                service make us one of the top choices for premium events in the
                city.
              </>
            )}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="text-violet-600 font-semibold mt-2 hover:underline"
          >
            {showMore ? "Read Less" : "Read More....."}
          </button>
        </div>

        <hr className="border-gray-300" />

        {/* INCLUSIONS */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Inclusions</h2>
          <ul className="space-y-3 text-gray-700 font-medium list-disc pl-6">
            <li>Starters (3 Veg) + (3 Non-Veg)</li>
            <li>Beverages (Any 2)</li>
            <li>Main (3 Veg) + (3 Non-Veg)</li>
            <li>Breads (Assorted)</li>
            <li>Sides</li>
            <li>Desserts (Any 2)</li>
          </ul>
        </div>

        <hr className="border-gray-300" />

        {/* SPECIALITY */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Speciality (Chef’s Recommended)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-gray-700 font-medium list-disc pl-6">
              <li>Paneer Tikka</li>
              <li>Daal Kachoudi</li>
              <li>Gol Guppe</li>
            </ul>

            <ul className="space-y-3 text-gray-700 font-medium list-disc pl-6">
              <li>Gazar Ka Halwa</li>
              <li>Kheer</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* CATERING FEATURES */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Catering Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-3 text-gray-700 font-medium list-disc pl-6">
              <li>Cutlery Included</li>
              <li>Tandoor Included</li>
              <li>1 Server / 10 PAX</li>
              <li>4 Hours Pre-Setup</li>
            </ul>

            <ul className="space-y-3 text-gray-700 font-medium list-disc pl-6">
              <li>Disposable Crockery</li>
              <li>Chef n Dish</li>
              <li>Clean-up</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CateringDetails;
