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
      return res.data.filter((req) => req.status === "Accepted");
    },
    enabled: !!user?.email,
  });

  // Mutation to mark as Picked Up
  const { mutate: confirmPickup, isPending } = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(
        `/donations/mark-picked-up/${donationId}`,
        {
          status: "Picked Up",
          receiverCharity: user.email,
        }
      );
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
      <h2 className="text-2xl font-bold mb-4 dark:text-white">My Pickups</h2>
      {pickups.length === 0 ? (
        <div className="col-span-full py-12 text-center">
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
        No pickups available
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        There are currently no food pickups scheduled. Please check back later.
      </p>
    </div>
  </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800"
            >
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    {pickup.donationTitle}
                  </h3>

                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Restaurant:
                      </span>
                      <span>{pickup.restaurantName}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Location:
                      </span>
                      <span>{pickup.location}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Food Type:
                      </span>
                      <span>{pickup.foodType}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Quantity:
                      </span>
                      <span>{pickup.quantity}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Pickup Time:
                      </span>
                      <span>{pickup.pickupTime}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 dark:text-gray-200 w-28 flex-shrink-0">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          pickup.status === "Picked Up"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {pickup.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => confirmPickup(pickup.donationId)}
                    disabled={isPending}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors ${
                      isPending
                        ? "bg-emerald-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Confirm Pickup"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
