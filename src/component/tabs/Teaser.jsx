import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { IMAGE_BASE } from "../baseURL";

const VIDEO_BASE_URL = IMAGE_BASE;

const Teaser = ({ clubData = [] }) => {
  const [loaded, setLoaded] = useState({});

  const videoUrl = (file) => `${VIDEO_BASE_URL}${file}`;

  const handleLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const openReel = (item) => {
    MySwal.fire({
      showConfirmButton: false,
      showCloseButton: true,
      background: "#000",
      width: "400px",
      padding: 0,
      html: `
        <div style="position:relative;height:600px;color:white;">
          <video 
            src="${videoUrl(item.video)}"
            autoplay
            controls
            playsinline
            style="width:100%;height:100%;object-fit:cover;"
          ></video>

          <div style="
            position:absolute;
            right:12px;
            bottom:90px;
            display:flex;
            flex-direction:column;
            gap:18px;
            font-size:22px;
          ">
            ❤️
            💬
            🔗
          </div>

          
        </div>
      `,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Teaser</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {clubData.map((item) => (
          <div
            key={item.id}
            onClick={() => openReel(item)}
            className="min-w-[220px] h-[380px] rounded-2xl overflow-hidden relative cursor-pointer bg-gray-200"
          >
            {!loaded[item.id] && (
              <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <video
              src={videoUrl(item.video)}
              muted
              loop
              autoPlay
              playsInline
              onLoadedData={() => handleLoad(item.id)}
              className={`w-full h-full object-cover transition ${
                loaded[item.id] ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              Earn {item.tulips} Tulips
            </div>

            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {item.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teaser;
