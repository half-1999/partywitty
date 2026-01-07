import { useNavigate } from "react-router-dom";

export default function CateringList() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold">Catering List</h1>

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white"
          onClick={() => navigate("/dashboard/catering/123")}
        >
          Open Catering Details
        </button>
      </div>
    </div>
  );
}
