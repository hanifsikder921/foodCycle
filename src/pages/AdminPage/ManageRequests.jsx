import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Load all charity donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationRequests");
      return res.data;
    },
  });

  // Delete request mutation
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
        text: "Request has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete request", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const showFullDescription = (description) => {
    Swal.fire({
      title: "Full Request Description",
      text: description,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className=" mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Manage Donation Requests
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table  w-full">
            <thead className="  dark:bg-gray-800 dark:text-white">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, idx) => (
                <tr key={request._id} className="dark:text-gray-200">
                  <td>{idx + 1}</td>
                  <td>{request.donationTitle || "N/A"}</td>
                  <td>{request.charityName}</td>
                  <td>{request.charityEmail}</td>
                  <td>
                    {request.requestDescription
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")}
                    {request.requestDescription.split(" ").length > 4 && "..."}
                    <button
                      onClick={() =>
                        showFullDescription(request.requestDescription)
                      }
                      className="bg-emerald-500/25 text-emerald-500 px-2 rounded-2xl border-r cursor-pointer hover:bg-emerald-500/50 hover:text-emerald-400 duration-300 ml-2"
                    >
                      view
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
