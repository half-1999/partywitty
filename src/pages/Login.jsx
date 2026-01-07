import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>
      <button
        className="mt-4 px-4 py-2 bg-black text-white"
        onClick={() => navigate("/dashboard")}
      >
        Login
      </button>
    </div>
  );
}
