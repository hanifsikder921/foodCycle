import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // GET all requests for this restaurant (assumes restaurant email is tied to login)
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["restaurantDonationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/restaurant/donation-requests?email=${user?.email}`
      );
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
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["restaurantRequests"]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Something went wrong!" });
    }
  };

  const showFullDescription = (description) => {
    Swal.fire({
      title: "Full Request Description",
      text: description,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
      <table className="table w-full shadow">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="dark:text-white">
            <th>Title</th>
            <th>Food Type</th>
            <th>Charity Name</th>
            <th>Charity Email</th>
            <th>Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="dark:text-gray-200">
              <td>{request.donationTitle}</td>
              <td>{request.foodType}</td>
              <td>{request.charityName}</td>
              <td>{request.charityEmail}</td>
              <td>
                {request.requestDescription.split(" ").slice(0, 4).join(" ")}
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
              <td>{request.pickupTime}</td>
              <td>
                <span
                  className={`badge ${
                    request.status === "Pending"
                      ? "badge-warning"
                      : request.status === "Accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="space-x-2">
                {request.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleDecision(
                          request._id,
                          request.donationId,
                          "Accepted"
                        )
                      }
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleDecision(
                          request._id,
                          request.donationId,
                          "Rejected"
                        )
                      }
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedDonations;
