import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiTrash2, FiClock, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";
import Loading from './../../components/Loading/Loading';


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
        title: "Request Cancelled",
        text: "Your donation request has been successfully cancelled",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to cancel request",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleCancel = (id, title) => {
    Swal.fire({
      title: `Cancel "${title}"?`,
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "Go back",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            My Donation Requests
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your food donation requests
          </p>
        </div>

        {/* Content */}
        {myRequests.length === 0 ? (
          <div className="text-center py-12">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No requests found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven't made any donation requests yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
                      {request.donationTitle}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : request.status === "Accepted"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Restaurant</p>
                      <p className="text-gray-800 dark:text-white">{request.restaurantName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Food Type</p>
                      <p className="text-gray-800 dark:text-white">{request.foodType}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                      <p className="text-gray-800 dark:text-white">{request.quantity} servings</p>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      Requested: {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {request.status === "pending" && (
                    <button
                      onClick={() => handleCancel(request._id, request.donationTitle)}
                      className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiTrash2 className="mr-2" />
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;