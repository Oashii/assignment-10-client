import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function ManageMyFoods() {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch foods by the logged-in user
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/foods");
      return res.data.filter(food => food.donorEmail === user.email);
    },
    enabled: !!user,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`http://localhost:3000/foods/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myFoods", user?.email]);
      alert("✅ Food deleted successfully!");
    },
  });

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to manage your foods.</p>;
  if (isLoading) return <p>Loading your foods...</p>;
  if (isError) return <p>Failed to load foods.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage My Foods 🍱</h2>
      {foods.length === 0 && <p>No foods added yet.</p>}
      {foods.map(food => (
        <div
          key={food._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3>{food.name}</h3>
          <p><b>Location:</b> {food.location}</p>
          <p><b>Quantity:</b> {food.quantity}</p>
          <p>{food.description}</p>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this food?")) {
                deleteMutation.mutate(food._id);
              }
            }}
            style={{ marginRight: "10px" }}
          >
            Delete
          </button>
          {/* Update button navigates to update page or opens modal */}
          <button
            onClick={() => alert("Update feature coming soon!")}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}
