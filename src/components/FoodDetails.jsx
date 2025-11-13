import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [showRequestModal, setShowRequestModal] = useState(false);
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
      setShowRequestModal(false);
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
          <button onClick={() => setShowRequestModal(true)}>Request Food</button>

          {showRequestModal && (
            <div style={modalStyles.overlay}>
              <div style={modalStyles.modal}>
                <h3>Request Food</h3>
                <form onSubmit={handleSubmit}>
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
                  <div style={{ marginTop: "10px" }}>
                    <button type="submit">Submit Request</button>
                    <button type="button" onClick={() => setShowRequestModal(false)} style={{ marginLeft: "10px" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
};
