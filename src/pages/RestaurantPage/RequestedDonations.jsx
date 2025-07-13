import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FiCheckCircle, FiXCircle, FiEye, FiClock, FiTruck, FiInfo } from "react-icons/fi";
import Loading from './../../components/Loading/Loading';


const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantDonationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant/donation-requests?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDecision = async (id, donationId, decision) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}`, {
        status: decision,
        donationId,
      });
      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire({
          icon: "success",
          title: `${decision} Successful`,
          text: `Request has been ${decision.toLowerCase()}`,
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["restaurantDonationRequests"]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to process request",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const showFullDescription = (title, description) => {
    Swal.fire({
      title: `Request Details: ${title}`,
      html: `<div class="text-left py-4">${description}</div>`,
      confirmButtonText: "Close",
      width: "600px",
    });
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Donation Requests
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage charity requests for your food donations
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
            {requests.length} Total Requests
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No donation requests found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are currently no active requests for your donations
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Donation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Charity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {request.donationTitle}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {request.foodType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {request.charityName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {request.charityEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {request.requestDescription.split(" ").slice(0, 10).join(" ")}
                            {request.requestDescription.split(" ").length > 10 && "..."}
                          </div>
                          <button
                            onClick={() => showFullDescription(request.donationTitle, request.requestDescription)}
                            className="ml-2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-700 border border-blue-600 dark:border-blue-400 hover:border-transparent transition-colors duration-200"
                          >
                            <FiEye className="mr-1" /> View
                          </button>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FiClock className="mr-1" /> {request.pickupTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : request.status === "Accepted"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {request.status === "Pending" ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDecision(request._id, request.donationId, "Accepted")}
                              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <FiCheckCircle className="mr-1" /> Accept
                            </button>
                            <button
                              onClick={() => handleDecision(request._id, request.donationId, "Rejected")}
                              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              <FiXCircle className="mr-1" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            Action completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestedDonations;