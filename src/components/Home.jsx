import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchFoods = async () => {
  const res = await axios.get("http://localhost:3000/foods");
  return res.data;
};

export default function Home() {
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  // sort foods by quantity (assumes quantity string like "Serves 5 people")
  const sortedFoods = [...foods].sort((a, b) => {
    const numA = parseInt(a.quantity.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.quantity.replace(/\D/g, "")) || 0;
    return numB - numA;
  });

  const featured = sortedFoods.slice(0, 6);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to PlateShare</h1>
      <p>Share your surplus food and help the community.</p>

      <h2>Featured Foods</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {featured.map((food) => (
          <div key={food._id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
            <img src={food.image} alt={food.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
            <h3>{food.name}</h3>
            <p><b>Donor:</b> {food.donor}</p>
            <p><b>Quantity:</b> {food.quantity}</p>
            <p><b>Location:</b> {food.location}</p>
            <Link to={`/food/${food._id}`}>
              <button style={{ marginTop: "10px" }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/foods">
          <button>Show All Foods</button>
        </Link>
      </div>
    </div>
  );
}
