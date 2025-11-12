import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function FoodRequests() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch all requests for foods owned by this user
  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/requests");
      // filter requests where foodOwnerEmail === user.email
      return res.data.filter((req) => req.foodOwnerEmail === user.email);
    },
  });

  // Mutation to update request status
  const mutation = useMutation({
    mutationFn: async ({ requestId, status, foodId }) => {
      // Update request status
      await axios.patch(`http://localhost:3000/requests/${requestId}`, { status });
      // If accepted, also update food status
      if (status === "accepted") {
        await axios.patch(`http://localhost:3000/foods/${foodId}`, { food_status: "donated" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      queryClient.invalidateQueries(["foods"]);
    },
  });

  const handleAction = (requestId, status, foodId) => {
    mutation.mutate({ requestId, status, foodId });
  };

  if (isLoading) return <p>Loading requests...</p>;
  if (isError) return <p>Failed to load requests.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Food Requests 🍱</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Requester</th>
              <th>Location</th>
              <th>Reason</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{req.userName}</td>
                <td>{req.location}</td>
                <td>{req.reason}</td>
                <td>{req.contact}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, "accepted", req.foodId)}
                        style={{ marginRight: "5px" }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "rejected", req.foodId)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
