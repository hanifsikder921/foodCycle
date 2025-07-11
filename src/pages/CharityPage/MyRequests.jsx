import React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load my donation requests
  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  // Cancel request mutation
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donationRequests/${id}`, {
        data: { userEmail: user.email },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-donation-requests"]);
      Swal.fire({
        icon: "success",
        title: "Cancelled",
        text: "Your request has been cancelled.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel request", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
        My Donation Requests
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : myRequests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myRequests.map((req) => (
            <div
              key={req._id}
              className="card border rounded-lg p-4 shadow-md dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{req.donationTitle}</h3>
              <p className="dark:text-gray-200"><span className="font-medium">Restaurant:</span> {req.restaurantName}</p>
              <p className="dark:text-gray-200"><span className="font-medium">Food Type:</span> {req.foodType}</p>
              <p className="dark:text-gray-200"><span className="font-medium">Quantity:</span> {req.quantity}</p>
              <p className="dark:text-gray-200">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`badge badge-outline ${
                    req.status === "Pending"
                      ? "badge-warning"
                      : req.status === "Accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {req.status === "Pending" &&  (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="btn btn-sm btn-error mt-3"
                >
                  Cancel
                </button>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
