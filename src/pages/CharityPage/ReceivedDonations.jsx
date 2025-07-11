import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donationRequests?email=${user.email}&status=Picked Up`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading your donations...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>
      {donations.length === 0 ? (
        <p>You haven't received any donations yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border p-4 rounded-xl shadow-md dark:bg-gray-800 dark:text-white"
            >
              <h3 className="text-lg font-semibold">{donation.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
              <p><strong>Location:</strong> {donation.location}</p>
              <p><strong>Food Type:</strong> {donation.foodType}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-semibold">Picked Up</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
