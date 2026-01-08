import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CateringList from "./pages/Catering/CateringList";
import CateringDetails from "./pages/Catering/CateringDetails";
import CateringBooking from "./pages/Catering/CateringBooking";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/dashboard/catering" replace />} />

      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        {/* Catering */}
        <Route path="catering" element={<CateringList />} />
        <Route
          path="catering/:club_slug/:package_slug"
          element={<CateringDetails />}
        />
        <Route
          path="catering/:club_slug/:package_slug/book"
          element={<CateringBooking />}
        />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
