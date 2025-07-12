import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiTrash2, FiEye, FiMail, FiUser, FiInfo } from "react-icons/fi";
import Loading from './../../components/Loading/Loading';


const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationRequests");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donationRequests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-requests"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Request has been removed successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to delete request",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleDelete = (id, charityName) => {
    Swal.fire({
      title: `Delete ${charityName}'s request?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const showFullDescription = (title, description) => {
    Swal.fire({
      title: `Description: ${title}`,
      html: `<div class="text-left py-4">${description}</div>`,
      confirmButtonText: "Close",
      width: "600px",
    });
  };

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
              Manage all charity donation requests
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
            {requests.length} Total Requests
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loading/>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-12">
              <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No donation requests found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are currently no active donation requests
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
                      Charity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
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
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          #{idx + 1} {request.donationTitle || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {request.charityName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <FiMail className="mr-1" /> {request.charityEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {request.requestDescription.split(" ").slice(0, 10).join(" ")}
                          {request.requestDescription.split(" ").length > 10 && "..."}
                          <button
                            onClick={() => showFullDescription(request.donationTitle, request.requestDescription)}
                            className="ml-2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 border border-emerald-600 dark:border-emerald-400 hover:border-transparent transition-colors duration-200"
                          >
                            <FiEye className="mr-1" /> View
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(request._id, request.charityName)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-700 border border-red-600 dark:border-red-400 hover:border-transparent transition-colors duration-200"
                        >
                          <FiTrash2 className="mr-1" /> Delete
                        </button>
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

export default ManageRequests;