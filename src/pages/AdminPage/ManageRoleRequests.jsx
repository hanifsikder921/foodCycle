import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  // Approve mutation (update user role + update request status)
  const approveMutation = useMutation({
    mutationFn: async (request) => {
      const matchedUser = usersData.find(
        (user) => user.email === request.userEmail
      );

      if (!matchedUser?._id) throw new Error("User not found");

      // 1. Update user role
      await axiosSecure.patch(`/users/role/${matchedUser._id}`, {
        role: "charity",
      });

      // 2. Update charity request status
      await axiosSecure.patch(`/charity-requests/${request._id}`, {
        status: "Approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["charity-requests"]);
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "User promoted to Charity",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Approval failed", "error");
    },
  });

  // Reject mutation (only update request status)
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
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Rejection failed", "error");
    },
  });

  const handleApprove = (request) => approveMutation.mutate(request);
  const handleReject = (id) => rejectMutation.mutate(id);

  return (
    <div className="mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Manage Charity Role Requests
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table  w-full">
            <thead className="bg-base-200 dark:bg-gray-800 dark:text-white">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Mission</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-300">
              {requests.map((request, idx) => (
                <tr key={request._id}>
                  <td>{idx + 1}</td>
                  <td>{request.userName}</td>
                  <td>{request.userEmail}</td>
                  <td>{request.organizationName}</td>
                  <td>
                    <span className="cursor-pointer" title={request.mission}>
                      {request.mission.length > 30
                        ? request.mission.substring(0, 30) + "..."
                        : request.mission}
                    </span>
                  </td>
                  <td className="text-sm">{request.paymentMethod}</td>
                  <td>
                    <span
                      className={`badge badge-sm capitalize ${
                        request.status === "Approved"
                          ? "badge-success"
                          : request.status === "Rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="text-center space-x-2">
                    {request.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(request)}
                          className="btn btn-xs btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">No actions</span>
                    )}
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

export default ManageRoleRequests;
