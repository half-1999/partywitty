import { useParams } from "react-router-dom";

export default function CateringBooking() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Booking Page</h1>
      <p>Booking for Catering ID: {id}</p>
    </div>
  );
}
