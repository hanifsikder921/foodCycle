import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiPackage, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      Swal.fire({
        title: "Deleted!",
        text: "Donation has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["myDonations"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this donation? This action cannot be undone.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/trash-can.gif")
        left top
        no-repeat
      `
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-donation/${id}`);
  };

  const StatusBadge = ({ status }) => {
  // Define all possible status configurations with defaults
  const statusConfig = {
    Pending: {
      icon: <FiClock className="mr-1" />,
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
    },
    Verified: {
      icon: <FiCheckCircle className="mr-1" />,
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
    },
    Rejected: {
      icon: <FiXCircle className="mr-1" />,
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200",
    },
    // Default fallback for unknown statuses
    default: {
      icon: <FiPackage className="mr-1" />,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      text: "Unknown",
    },
  };

  // Get the config for the current status or fallback to default
  const config = statusConfig[status] || statusConfig.default;
  const displayText = status || config.text;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.icon}
      {displayText}
    </span>
  );
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          My Food Donations
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Manage your food donations and track their status
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loading />
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
            <FiPackage className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No donations yet
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            You haven't added any food donations. Start by creating a new donation.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/dashboard/add-donation")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Donation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48 w-full">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={donation.status} />
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {donation.title}
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Restaurant:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{donation.restaurantName}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Food Type:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200 capitalize">{donation.foodType}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Quantity:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{donation.quantity} servings</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 dark:text-gray-400 w-24 flex-shrink-0">Location:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{donation.location}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                  {donation.status !== "Rejected" && (
                    <button
                      onClick={() => handleUpdate(donation._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEdit className="mr-1.5 h-3 w-3" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrashAlt className="mr-1.5 h-3 w-3" />
                    Delete
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

export default MyDonations;