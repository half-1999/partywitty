import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  FileText,
  Gavel,
  RotateCw,
  Search,
  MapPin,
  Bell,
  Bookmark,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(true);

  const menu = [
    { to: "/dashboard", label: "Home", icon: Home },
    { to: "/dashboard/catering", label: "Orders", icon: FileText },
    { to: "/dashboard/bids", label: "Bids", icon: Gavel },
    { to: "/dashboard/refresh", label: "Refresh", icon: RotateCw },
    { to: "/dashboard/search", label: "Search", icon: Search },
    { to: "/dashboard/map", label: "Locations", icon: MapPin },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/saved", label: "Saved", icon: Bookmark },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed z-100 inset-y-0 left-0 
        bg-gradient-to-b from-[#eef0f6] to-[#f8efe4]
        border-r border-gray-300 shadow-3xl transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
        ${collapsed ? "w-[72px]" : "w-[240px]"}
      `}
      >
        {/* Top Section */}
        <div className="h-16 flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
                <div className="w-2 h-2 bg-lime-400 rounded-full" />
                <div className="w-2 h-2 bg-lime-400 rotate-45" />
                <div className="w-2 h-2 bg-lime-400 rounded-full" />
              </div>
            </div>
            {!collapsed && <span className="font-bold text-lg">CaterPro</span>}
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-black/10"
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 px-3 mt-4">
          {menu.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={i}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                      : "text-gray-700 hover:bg-white/70"
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />

                {!collapsed && (
                  <span className="whitespace-nowrap font-medium">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Profile */}
        <div className="absolute bottom-4 w-full flex flex-col items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            className="w-10 h-10 rounded-full object-cover"
          />
          {!collapsed && <span className="text-sm font-medium">John Doe</span>}
          {!collapsed && <User className="w-4 h-4 text-gray-500" />}
        </div>
      </div>
    </>
  );
}
