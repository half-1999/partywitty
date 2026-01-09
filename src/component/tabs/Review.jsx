import React, { useState } from "react";
import { Star, MoreVertical } from "lucide-react";

export default function Reviews({ packageData }) {
  const reviewsData = packageData?.reviews || [];
  const INITIAL_COUNT = 2;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const isExpanded = visibleCount >= reviewsData.length;

  const toggleView = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount(reviewsData.length);
    }
  };

  if (reviewsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Star className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-600">No reviews yet</h3>
        <p className="text-sm text-slate-500 mt-1">
          Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      {reviewsData.slice(0, visibleCount).map((review) => (
        <div
          key={review.id}
          className="rounded-3xl p-6 bg-gradient-to-r from-purple-50 via-white to-yellow-50 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <img
                src={review.avatar}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />

              <div>
                <div className="font-semibold text-lg">{review.name}</div>
                <div className="text-sm text-slate-500">{review.date}</div>

                {/* Stars */}
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= review.rating
                          ? "fill-orange-400 text-orange-400"
                          : "text-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <MoreVertical className="text-slate-400" />
          </div>

          <p className="text-slate-600 mt-4 leading-relaxed">{review.text}</p>

          {review.images.length > 0 && (
            <div className="flex gap-3 mt-4">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-24 h-20 object-cover rounded-xl"
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {reviewsData.length > INITIAL_COUNT && (
        <div className="flex justify-center pt-4">
          <button
            onClick={toggleView}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            {isExpanded ? "View Less Reviews" : "View More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
