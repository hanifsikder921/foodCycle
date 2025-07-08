// src/pages/Dashboard/RestaurantPage/MyDonations.jsx

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["myDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/donations/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Donation has been deleted.", "success");
      queryClient.invalidateQueries(["myDonations"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the donation permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">My Donations</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border rounded-lg shadow-md bg-white dark:bg-gray-800 p-4"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3 dark:text-white">{donation.title}</h3>
              <p className="dark:text-white">Type: {donation.foodType}</p>
              <p className="dark:text-white">Quantity: {donation.quantity}</p>
              <p className="dark:text-white">Restaurant: {donation.restaurantName}</p>
              <p className="dark:text-white">
                Status:{" "}
                <span
                  className={`font-bold ${
                    donation.status === "Pending"
                      ? "text-yellow-500"
                      : donation.status === "Verified"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {donation.status}
                </span>
              </p>

              <div className="mt-3 flex gap-3">
                {donation.status !== "Rejected" && (
                  <Link
                    to={`/dashboard/update-donation/${donation._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(donation._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
