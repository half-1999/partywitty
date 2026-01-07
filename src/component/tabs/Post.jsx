import React from "react";
import Swal from "sweetalert2";
import { FiHeart, FiSend, FiBookmark, FiSmile } from "react-icons/fi";

// ====================
// DUMMY DATA
// ====================
const posts = [
  {
    id: 1,
    img: "https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    likes: "120k",
    comments: "320",
    title: "The Dark Room",
  },
  {
    id: 2,
    img: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    likes: "100k",
    comments: "250",
    title: "Skyfall",
  },
  {
    id: 3,
    img: "https://image.tmdb.org/t/p/w500/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg",
    likes: "90k",
    comments: "190",
    title: "Birds of Prey",
  },
];

// ====================
// OPEN MODAL
// ====================
const openPostModal = (post) => {
  Swal.fire({
    html: `
      <div class="flex h-[80vh] max-w-5xl">
        
        <!-- LEFT IMAGE -->
        <div class="w-1/2 bg-black">
          <img src="${post.img}" class="w-full h-full object-cover"/>
        </div>

        <!-- RIGHT COMMENTS -->
        <div class="w-1/2 flex flex-col bg-[#f5f5f5]">
          
          <!-- HEADER -->
          <div class="p-4 border-b flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full"/>
              <div>
                <p class="font-bold">${post.title}</p>
                <p class="text-xs text-gray-500">@username</p>
              </div>
            </div>
          </div>

          <!-- COMMENTS LIST -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4 text-left">
            <div class="flex gap-3">
              <img src="https://i.pravatar.cc/32?1" class="w-8 h-8 rounded-full"/>
              <p><b>Albert</b> Amazing party vibes 🔥</p>
            </div>
            <div class="flex gap-3">
              <img src="https://i.pravatar.cc/32?2" class="w-8 h-8 rounded-full"/>
              <p><b>John</b> Love this design 😍</p>
            </div>
            <div class="flex gap-3">
              <img src="https://i.pravatar.cc/32?3" class="w-8 h-8 rounded-full"/>
              <p><b>Riya</b> When is this event?</p>
            </div>
          </div>

          <!-- ACTION BAR -->
          <div class="border-t p-3">
            <div class="flex justify-between mb-2 text-xl">
              <div class="flex gap-4">
                ❤️ 💬 ✈️
              </div>
              🔖
            </div>
            <p class="font-semibold mb-2">${post.likes} likes</p>

            <!-- INPUT -->
            <div class="flex items-center gap-2 border-t pt-2">
              😊
              <input 
                class="flex-1 outline-none bg-transparent" 
                placeholder="Add a comment..." 
              />
              <button class="text-blue-600 font-semibold">Post</button>
            </div>
          </div>

        </div>
      </div>
    `,
    width: "80vw",
    showConfirmButton: false,
    showCloseButton: true,
    background: "transparent",
    padding: 0,
    customClass: {
      popup: "rounded-2xl overflow-hidden",
    },
  });
};

// ====================
// COMPONENT
// ====================
const Posts = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => openPostModal(post)}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <img
              src={post.img}
              alt=""
              className="w-full h-[500px] object-cover group-hover:scale-95 transition duration-300 rounded-xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-8 text-white">
              <div className="flex items-center gap-2 text-lg">
                ❤️ <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                💬 <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
