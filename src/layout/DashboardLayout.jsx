import { Outlet, useNavigate } from "react-router-dom";
import { Menu, ArrowLeft } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <div className="lg:hidden h-12 bg-white border-b flex items-center px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded hover:bg-gray-100 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <span className="ml-4 font-semibold">PartyWitty</span>

        {/* <button className="ml-auto">
          <Menu size={20} />
        </button> */}
      </div>

      {/* Content */}
      <div className="p-2 m-1 rounded-2xl bg-white shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
}
