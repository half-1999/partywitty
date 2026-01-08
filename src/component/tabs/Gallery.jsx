import React, { useState } from "react";
import Swal from "sweetalert2";

import { IMAGE_BASE } from "../baseURL";

const IMAGE_BASE_URL = IMAGE_BASE;

const Gallery = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const imgUrl = (img, w = 600) =>
    `${IMAGE_BASE_URL}${img}?w=${w}&auto=format&fit=crop&q=60`;

  const handleLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

  const openGallery = async (item) => {
    await Promise.all(
      item?.images.map(
        (i) =>
          new Promise((res) => {
            const img = new Image();
            img.src = imgUrl(i.img, 900);
            img.onload = res;
          })
      )
    );

    Swal.fire({
      title: item.category,
      width: "900px",
      html: `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          ${item.images
            .map(
              (i) => `
                <img 
                  src="${imgUrl(i.img, 600)}"
                  style="
                    width:100%;
                    height:180px;
                    object-fit:cover;
                    border-radius:12px;
                  "
                />
              `
            )
            .join("")}
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {images?.map((item) => (
        <div key={item.id} className="text-center">
          <h3 className="text-xl font-semibold mb-4">{item.category}</h3>

          {/* CARD STACK */}
          <div
            onClick={() => openGallery(item)}
            className="relative w-[260px] h-[260px] mx-auto cursor-pointer"
          >
            {/* BACK CARD 1 */}
            {item.images[1] && (
              <div className="absolute inset-0 rotate-[-12deg] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                {!loadedImages[`${item.id}-1`] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                  src={imgUrl(item.images[1].img, 400)}
                  onLoad={() => handleLoad(`${item.id}-1`)}
                  className={`w-full h-full object-cover transition ${
                    loadedImages[`${item.id}-1`] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}

            {/* BACK CARD 2 */}
            {item.images[2] && (
              <div className="absolute inset-0 rotate-[8deg] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                {!loadedImages[`${item.id}-2`] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                  src={imgUrl(item.images[2].img, 400)}
                  onLoad={() => handleLoad(`${item.id}-2`)}
                  className={`w-full h-full object-cover transition ${
                    loadedImages[`${item.id}-2`] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            )}

            {/* FRONT CARD */}
            <div className="absolute inset-0 rounded-2xl shadow-xl bg-purple-600/80 backdrop-blur-xl flex flex-col items-center justify-center text-white">
              <div className="text-4xl font-bold">{item.images.length}+</div>
              <div className="text-sm tracking-widest mt-1">PICTURES</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
