import { Outlet, useNavigate } from "react-router-dom";
import { Menu, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  // const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Mobile Top Bar */}
      <div className="lg:hidden h-12 bg-white border-b flex items-center px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <span className="ml-4 font-semibold">PartyWitty</span>

        {/* Optional Mobile Menu Button */}
        <button className="ml-auto">
          <Menu size={20} />
        </button>
      </div>

      {/* <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /> */}

      {/* Content */}
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
}
