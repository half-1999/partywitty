import React, { useState } from "react";
import Swal from "sweetalert2";

/* ------------------ DUMMY JSON DATA ------------------ */
const galleryData = [
  {
    id: 1,
    title: "Ambiance",
    count: 31,
    images: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330",
    ],
  },
  {
    id: 2,
    title: "Food",
    count: 21,
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
    ],
  },
  {
    id: 3,
    title: "Beverages",
    count: 56,
    images: [
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b",
    ],
  },
];

/* ------------------ COMPONENT ------------------ */
const Gallery = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const optimize = (url, w = 500) => `${url}?w=${w}&auto=format&fit=crop&q=60`;

  const handleLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

  const openGallery = async (category) => {
    // Preload modal images
    await Promise.all(
      category.images.map(
        (src) =>
          new Promise((res) => {
            const img = new Image();
            img.src = optimize(src, 900);
            img.onload = res;
          })
      )
    );

    Swal.fire({
      title: category.title,
      width: "900px",
      html: `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
          ${category.images
            .map(
              (img) =>
                `<img 
                  src="${optimize(img, 600)}" 
                  style="width:100%;height:180px;object-fit:cover;border-radius:10px;" 
                  loading="lazy"
                />`
            )
            .join("")}
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {galleryData.map((item) => (
          <div key={item.id} className="text-center">
            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

            {/* Card Stack */}
            <div
              onClick={() => openGallery(item)}
              className="relative w-[260px] h-[260px] mx-auto cursor-pointer group"
            >
              {/* Back Card 1 */}
              <div className="absolute inset-0 rotate-[-12deg] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                {!loadedImages[`${item.id}-1`] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                  src={optimize(item.images[1], 400)}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleLoad(`${item.id}-1`)}
                  className={`w-full h-full object-cover transition duration-500 ${
                    loadedImages[`${item.id}-1`] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Back Card 2 */}
              <div className="absolute inset-0 rotate-[8deg] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                {!loadedImages[`${item.id}-2`] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-300" />
                )}
                <img
                  src={optimize(item.images[2], 400)}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleLoad(`${item.id}-2`)}
                  className={`w-full h-full object-cover transition duration-500 ${
                    loadedImages[`${item.id}-2`] ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Front Card */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-purple-500/70 backdrop-blur-2xl flex flex-col items-center justify-center text-white font-bold text-xl">
                <div className="text-4xl">{item.count}+</div>
                <div className="text-sm tracking-widest">PICTURES</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
