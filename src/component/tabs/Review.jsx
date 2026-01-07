import React, { useState } from "react";
import { Star, MoreVertical } from "lucide-react";

/* ------------------ DUMMY DATA (LONG, REALISTIC) ------------------ */
const reviewsData = [
  {
    id: 1,
    name: "Grace Carey",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "24 January, 2023",
    rating: 4,
    text: "We booked this catering service for my sister’s wedding and honestly it exceeded all expectations. The food quality was excellent, presentation was elegant, and the staff was extremely professional. Guests were continuously asking about the caterer. The live counters were a big hit and everything was managed smoothly without any chaos. Would definitely recommend them for any big event.",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330",
    ],
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 February, 2023",
    rating: 5,
    text: "Amazing catering service from start to finish. The team helped us design the menu, suggested great combinations, and executed everything perfectly on the event day. Food was fresh, hot, and very tasty. All our guests were impressed. Will surely book again for future events.",
    images: [],
  },
  {
    id: 3,
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "5 March, 2023",
    rating: 4,
    text: "We hired them for a corporate event and the experience was very good overall. The setup was on time, staff was polite, and the food quality was consistent throughout the event. A few items could have been slightly better, but overall it was a great experience and worth the price.",
    images: ["https://images.unsplash.com/photo-1552566626-52f8b828add9"],
  },
  {
    id: 4,
    name: "Rahul Verma",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    date: "18 April, 2023",
    rating: 5,
    text: "Everything was perfect from planning to execution. They handled a gathering of more than 300 guests very efficiently. Food taste, hygiene, presentation, and service quality were all top-notch. Many guests personally told us they loved the food. Highly recommended.",
    images: [],
  },
  {
    id: 5,
    name: "Ananya Gupta",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    date: "2 May, 2023",
    rating: 5,
    text: "Booked them for my parents’ anniversary party and they did a wonderful job. The menu was well balanced, desserts were amazing, and the staff was very courteous. They took care of everything so we could enjoy the function tension-free.",
    images: [],
  },
];

/* ------------------ COMPONENT ------------------ */
export default function Reviews() {
  const INITIAL_COUNT = 2;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const isExpanded = visibleCount >= reviewsData.length;

  const toggleView = () => {
    if (isExpanded) {
      setVisibleCount(INITIAL_COUNT); // collapse
    } else {
      setVisibleCount(reviewsData.length); // expand all
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* ----------- SUMMARY CARD ----------- */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-purple-100 via-white to-yellow-100 shadow-sm">
        <div className="text-4xl font-bold">4.8</div>
        <div className="text-slate-500">of 125 reviews</div>

        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i <= 4 ? "fill-orange-400 text-orange-400" : "text-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ----------- REVIEWS LIST ----------- */}
      {reviewsData.slice(0, visibleCount).map((review) => (
        <div
          key={review.id}
          className="rounded-3xl p-6 bg-gradient-to-r from-purple-50 via-white to-yellow-50 shadow-sm"
        >
          {/* Header */}
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

          {/* Text */}
          <p className="text-slate-600 mt-4 leading-relaxed">{review.text}</p>

          {/* Images */}
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

      {/* ----------- TOGGLE BUTTON ----------- */}
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
