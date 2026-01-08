import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Utensils, Wine } from "lucide-react";
import { IMAGE_BASE } from "./baseURL";

export default function RecommendedPackages({ packageId, clubId }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const formData = new FormData();
      formData.append("package_id", packageId);
      formData.append("club_id", clubId);

      const res = await axios.post(
        "https://admin.partywitty.com/master/APIs/ClubPackage/packageOfSameClub",
        formData
      );

      if (res.data?.status) {
        setPackages(res.data.data);
      }
      setLoading(false);
    };

    fetchPackages();
  }, [packageId, clubId]);

  if (loading) {
    return <p className="text-center py-10">Loading packages...</p>;
  }

  if (!packages.length) {
    return <p className="text-center py-10">No recommended packages found</p>;
  }

  return (
    <div className="mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-6">
        Recommended Packages from Same Club
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-3xl  shadow-2xl hover:shadow-xl transition overflow-hidden bg-white"
          >
            {/* Thumbnail */}
            <img
              src={`${IMAGE_BASE}${pkg.thumbnail}`}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="font-semibold text-lg">{pkg.title}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                {pkg.foodserving && (
                  <span className="flex items-center gap-1">
                    <Utensils size={16} />
                    {pkg.foodserving}
                  </span>
                )}

                {pkg.alcoholserving && (
                  <span className="flex items-center gap-1">
                    <Wine size={16} />
                    {pkg.alcoholserving}
                  </span>
                )}
              </div>

              {/* Inclusion Summary */}
              <div className="text-sm text-gray-700 space-y-1">
                {pkg.inclusion?.total_non_alcoholic && (
                  <p>
                    <strong>Non-Alcoholic:</strong>{" "}
                    {pkg.inclusion.total_non_alcoholic}
                  </p>
                )}

                {pkg.inclusion?.total_alcoholic && (
                  <p>
                    <strong>Alcoholic:</strong> {pkg.inclusion.total_alcoholic}
                  </p>
                )}
              </div>

              {/* CTA */}
              {/* <button className="w-full mt-3 bg-violet-600 text-white py-2 rounded-xl text-sm hover:bg-violet-700 transition">
                View Package
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
