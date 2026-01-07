import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Link to="/dashboard" className="text-blue-600 underline">
        Go to Dashboard
      </Link>
    </div>
  );
}
