import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  // Fetch single food
  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/foods/${id}`);
      return res.data;
    },
  });

  // Submit request mutation
  const requestMutation = useMutation({
    mutationFn: async (newRequest) => {
      const res = await axios.post("http://localhost:3000/requests", newRequest);
      return res.data;
    },
    onSuccess: () => {
      alert("✅ Request submitted!");
      setShowRequestForm(false);
      setRequestData({ location: "", reason: "", contact: "" });
      queryClient.invalidateQueries(["requests"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    requestMutation.mutate({
      ...requestData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      foodId: id,
      status: "pending",
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load food details.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{food.name}</h2>
      <img src={food.image} alt={food.name} style={{ maxWidth: "300px" }} />
      <p><b>Donor:</b> {food.donor}</p>
      <p><b>Quantity:</b> {food.quantity}</p>
      <p><b>Location:</b> {food.location}</p>
      <p>{food.description}</p>

      {user && (
        <>
          <button onClick={() => setShowRequestForm(!showRequestForm)}>
            {showRequestForm ? "Cancel Request" : "Request Food"}
          </button>

          {showRequestForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <input
                type="text"
                placeholder="Your Pickup Location"
                value={requestData.location}
                onChange={(e) => setRequestData({ ...requestData, location: e.target.value })}
                required
              />
              <br />
              <textarea
                placeholder="Why do you need this food?"
                value={requestData.reason}
                onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                required
              ></textarea>
              <br />
              <input
                type="text"
                placeholder="Your Contact Number"
                value={requestData.contact}
                onChange={(e) => setRequestData({ ...requestData, contact: e.target.value })}
                required
              />
              <br />
              <button type="submit">Submit Request</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
