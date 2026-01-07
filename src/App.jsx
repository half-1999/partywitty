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
      {/* Redirect root to dashboard */}
      <Route
        path="/"
        element={<Navigate to="/dashboard/catering/123" replace />}
      />

      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="catering" element={<CateringList />} />
        <Route path="catering/:id" element={<CateringDetails />} />
        <Route path="catering/:id/book" element={<CateringBooking />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
