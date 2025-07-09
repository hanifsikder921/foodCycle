import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

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

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-donation/${id}`);
  };

  return (
    <div>
      <h2 className="md:text-3xl text-2xl font-bold mb-6 text-center dark:text-white bg-white dark:bg-gray-700 sticky top-16 p-5 md:z-15">
        My Donations
      </h2>
      {isLoading ? (
        <Loading />
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have not added any donations yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border dark:border-gray-700"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold dark:text-white">
                  {donation.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restaurant: <span className="font-medium">{donation.restaurantName}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Type: <span className="font-medium">{donation.foodType}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quantity: <span className="font-medium">{donation.quantity}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Location: <span className="font-medium">{donation.location}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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

                <div className="flex justify-end gap-2 pt-3">
                  {donation.status !== "Rejected" && (
                    <button
                      onClick={() => handleUpdate(donation._id)}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      <FaEdit /> Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    <FaTrashAlt /> Delete
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
