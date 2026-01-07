import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <nav className="p-4 shadow flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
