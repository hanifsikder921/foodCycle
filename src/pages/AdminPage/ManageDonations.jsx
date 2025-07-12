import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import {
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiFilter,
} from "react-icons/fi";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = React.useState("All");

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const filteredDonations =
    statusFilter === "All"
      ? donations
      : donations.filter((d) => d.status === statusFilter);

  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/verify/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
      Swal.fire({
        title: "Verified!",
        text: "Donation has been verified.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
      Swal.fire({
        title: "Rejected!",
        text: "Donation has been rejected.",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
    },
  });

  const handleVerify = (id) => {
    verifyMutation.mutate(id);
  };

  const handleReject = (id) => {
    rejectMutation.mutate(id);
  };

  if (isLoading) return <Loading />;

  return (
    <div className=" p-6 dark:bg-gray-900 min-h-screen rounded-xl">
      <div className=" max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Donation Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Review and manage food donation requests from restaurants
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
                <option value="Requested">Requested</option>
                <option value="Picked Up">Picked Up</option>
              </select>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {filteredDonations.length} donations
            </span>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Donation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDonations.map((donation, index) => (
                  <tr
                    key={donation?._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              donation?.image ||
                              "https://via.placeholder.com/150"
                            }
                            alt={donation?.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {donation?.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {donation?.foodType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                       Quantity: {donation?.quantity}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Location:{donation?.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {donation?.restaurantName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {donation?.restaurantEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donation?.status === "Verified"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : donation?.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : donation?.status === "Picked Up"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                            : donation?.status === "Requested"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {donation?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleVerify(donation?._id)}
                          disabled={
                            donation?.status === "Verified" ||
                            donation?.status === "Requested" ||
                            donation?.status === "Picked Up"
                          }
                          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium   ${
                            donation?.status === "Verified" ||
                            donation?.status === "Requested" ||
                            donation?.status === "Picked Up"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                              : "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                          }`}
                        >
                          <FiCheckCircle className="mr-1" /> Verify
                        </button>
                        <button
                          onClick={() => handleReject(donation?._id)}
                          disabled={
                            donation?.status === "Rejected" ||
                            donation?.status === "Picked Up"
                          }
                          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium  ${
                            donation?.status === "Rejected" ||
                            donation?.status === "Picked Up"
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                              : "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                          }`}
                        >
                          <FiXCircle className="mr-1" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <FiRefreshCw className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No donations found
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {statusFilter === "All"
                ? "There are currently no donations"
                : `No donations with status "${statusFilter}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDonations;
