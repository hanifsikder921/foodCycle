import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/verify/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
      Swal.fire("Verified!", "Donation has been verified.", "success");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/donations/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
      Swal.fire("Rejected!", "Donation has been rejected.", "warning");
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
    <div className="p-6  dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Manage Donations
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full bg-white dark:bg-gray-800">
          {/* Head */}
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr className="text-sm text-left ">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Food Type</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Restaurant</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200 dark:divide-gray-700">
            {donations.map((donation, index) => (
              <tr
                key={donation._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200  text-gray-800 dark:text-white"
              >
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3">{donation.title}</td>
                <td className="px-4 py-3">{donation.foodType}</td>
                <td className="px-4 py-3">{donation.quantity}</td>
                <td className="px-4 py-3">{donation.restaurantName}</td>
                <td className="px-4 py-3">{donation.restaurantEmail}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      donation.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : donation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleVerify(donation._id)}
                    disabled={donation.status === "Verified"}
                    className="btn btn-xs btn-success"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleReject(donation._id)}
                    disabled={donation.status === "Rejected"}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
