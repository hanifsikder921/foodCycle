import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiUser, FiMail, FiCheckCircle, FiXCircle, FiInfo, FiClock } from "react-icons/fi";


const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load all charity requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["charity-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data;
    },
  });

  // Load all user data
  const { data: usersData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (request) => {
      const matchedUser = usersData.find(
        (user) => user.email === request.userEmail
      );

      if (!matchedUser?._id) throw new Error("User not found");

      await axiosSecure.patch(`/users/role/${matchedUser._id}`, {
        role: "charity",
      });

      await axiosSecure.patch(`/charity-requests/${request._id}`, {
        status: "Approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["charity-requests"]);
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "User has been promoted to Charity role",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to approve request",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/charity-requests/${id}`, {
        status: "Rejected",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["charity-requests"]);
      Swal.fire({
        icon: "info",
        title: "Rejected!",
        text: "Request has been rejected",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to reject request",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleApprove = (request) => {
    Swal.fire({
      title: `Approve ${request.userName}'s request?`,
      text: "This will grant them Charity privileges",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(request);
      }
    });
  };

  const handleReject = (request) => {
    Swal.fire({
      title: `Reject ${request.userName}'s request?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(request._id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Charity Role Requests
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Review and manage requests for Charity role promotion
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
              {requests.filter(r => r.status === "pending").length} Pending
            </div>
            <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-sm">
              {requests.length} Total
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <FiClock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No requests found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are currently no charity role requests
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Request
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Organization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mission
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Transaction ID
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
                  {requests.map((request, idx) => (
                    <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {request.userName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <FiMail className="mr-1" /> {request.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.organizationName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.mission.length > 50
                            ? request.mission.substring(0, 50) + "..."
                            : request.mission}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          request.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : request.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {request.status === "pending" ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleApprove(request)}
                              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <FiCheckCircle className="mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              <FiXCircle className="mr-1" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            No actions available
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

export default ManageRoleRequests;