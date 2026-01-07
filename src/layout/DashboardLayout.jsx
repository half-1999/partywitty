import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../component/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* Mobile Top Bar */}
      <div className="lg:hidden h-14 bg-white border-b flex items-center px-4">
        <button onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
        <span className="ml-4 font-semibold">Dashboard</span>
      </div>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Content */}
      <div className="lg:ml-[72px] p-4">
        <Outlet />
      </div>
    </div>
  );
}
