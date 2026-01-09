import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardLayout from "./layout/DashboardLayout";
import CateringList from "./pages/Catering/CateringList";
import CateringDetails from "./pages/Catering/CateringDetails";

export default function App() {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();

    const blockKeys = (e) => {
      const key = e.key.toLowerCase();

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.ctrlKey && ["u", "s", "p"].includes(key)) || // view-source, save, print
        (e.ctrlKey && key === "c") || // copy
        (e.ctrlKey && key === "a") // select all
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /* ---------- BLOCK COPY / CUT / PASTE ---------- */
    const blockClipboard = (e) => e.preventDefault();

    /* ---------- BLOCK TEXT SELECTION ---------- */
    const blockSelection = () => {
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.toString()) sel.removeAllRanges();
      }
    };

    /* ---------- BLOCK DRAG ---------- */
    const blockDrag = (e) => e.preventDefault();

    /* ---------- APPLY LISTENERS ---------- */
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("copy", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    document.addEventListener("paste", blockClipboard);
    document.addEventListener("selectstart", blockClipboard);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("mouseup", blockSelection);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      document.removeEventListener("paste", blockClipboard);
      document.removeEventListener("selectstart", blockClipboard);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("mouseup", blockSelection);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/catering" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="catering" element={<CateringList />} />
        <Route
          path="catering/:club_slug/:package_slug"
          element={<CateringDetails />}
        />
      </Route>
    </Routes>
  );
}
