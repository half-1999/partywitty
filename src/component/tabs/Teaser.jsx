import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ===================
// DUMMY DATA
// ===================
const teaserData = [
  {
    id: 1,
    title: "Night Party",
    type: "image",
    src: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77",
  },
  {
    id: 2,
    title: "Club Entry",
    type: "image",
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
  },
  {
    id: 3,
    title: "Vlogger",
    type: "image",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    id: 4,
    title: "Food Reel",
    type: "image",
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: 5,
    title: "Night Party",
    type: "image",
    src: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77",
  },
  {
    id: 6,
    title: "Vlogger",
    type: "image",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    id: 7,
    title: "Food Reel",
    type: "image",
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
];

// ===================
// COMPONENT
// ===================
const Teaser = () => {
  const [loaded, setLoaded] = useState({});

  const optimize = (url, w = 500) => `${url}?w=${w}&auto=format&fit=crop&q=60`;

  const handleLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  // ===================
  // REEL POPUP UI
  // ===================
  const openReel = async (item) => {
    // Preload image
    const img = new Image();
    img.src = optimize(item.src, 900);
    await img.decode();

    MySwal.fire({
      showConfirmButton: false,
      showCloseButton: true,
      background: "#000",
      width: "400px",
      html: `
        <div class="w-full h-full text-white relative">
          <img src="${optimize(
            item.src,
            900
          )}" class="w-full h-[500px] object-cover rounded-lg" />

          <div style="position:absolute; right:10px; bottom:80px; display:flex; flex-direction:column; gap:16px; font-size:22px;">
            ❤️
            💬
            🔗
          </div>

          <div style="position:absolute; bottom:10px; left:10px; right:10px;">
            <p style="font-weight:bold;">${item.title}</p>
            <p style="font-size:12px; opacity:0.7;">@thestackguy • Original Audio</p>
          </div>
        </div>
      `,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teaser</h2>

      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {teaserData.map((item) => (
          <div
            key={item.id}
            onClick={() => openReel(item)}
            className="min-w-[220px] h-[380px] rounded-2xl overflow-hidden relative cursor-pointer hover:scale-95 transition bg-gray-200"
          >
            {/* Skeleton */}
            {!loaded[item.id] && (
              <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <img
              src={optimize(item.src, 500)}
              loading="lazy"
              decoding="async"
              onLoad={() => handleLoad(item.id)}
              className={`w-full h-full object-cover transition duration-500 ${
                loaded[item.id] ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Top Badge */}
            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              Earn 25 Tulips
            </div>

            {/* Top Right Tag */}
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Ambience
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teaser;
