import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch accepted donation requests
  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ["myPickups"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donationRequests?email=${user?.email}`
      );
      return res.data.filter(
        (req) => req.status === "Accepted" || req.status === "Picked Up"
      );
    },
    enabled: !!user?.email,
  });

  // Mutation to mark as Picked Up
  const { mutate: confirmPickup, isPending } = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(`/donations/mark-picked-up/${donationId}`, {
        status: "Picked Up",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Pickup confirmed!",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["myPickups"]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to confirm pickup",
      });
    },
  });

  if (isLoading) return <p className="text-center py-5">Loading pickups...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Pickups</h2>
      {pickups.length === 0 ? (
        <p>No pickups found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-lg font-semibold">{pickup.donationTitle}</h3>
              <p>
                <strong>Restaurant:</strong> {pickup.restaurantName}
              </p>
              <p>
                <strong>Location:</strong> {pickup.location}
              </p>
              <p>
                <strong>Food Type:</strong> {pickup.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {pickup.quantity}
              </p>
              <p>
                <strong>Pickup Time:</strong> {pickup.pickupTime}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    pickup.status === "Picked Up"
                      ? "text-green-500 font-semibold"
                      : "text-yellow-500 font-semibold"
                  }`}
                >
                  {pickup.status === "Picked Up" ? "Picked Up" : "Assigned"}
                </span>
              </p>
              <button
                onClick={() => confirmPickup(pickup.donationId)}
                disabled={isPending}
                className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700 duration-300"
              >
                {isPending ? "Updating..." : "Confirm Pickup"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
