import { ChevronRight } from "lucide-react";

export default function BottomBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-3">
      <div className="w-[95%] md:w-[30%] bg-white rounded-2xl shadow-2xl border border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <button className="bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold px-5 py-2 rounded-xl text-sm">
                Counter Bid
              </button>
              <span className="text-md text-center text-gray-600 mt-1">
                Try It Now
              </span>
            </div>
          </div>
          <div>
            <p className="text-md mb-2 font-semibold text-center">
              {" "}
              Book Now Pay Later
            </p>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm md:text-base">
              Booking Amount ₹3,000
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
