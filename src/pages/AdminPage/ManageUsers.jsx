import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const roles = ["admin", "user", "restaurant", "charity"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        title: "Success",
        text: "User role updated",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to update role",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.delete(`/users/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted!", "User has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  const handleRoleChange = (userId, role) => {
    updateRoleMutation.mutate({ userId, role });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      timer: 10000,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(userId);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Manage Users
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading users...
        </p>
      ) : (
        <div>
          <table className="table w-full h-full">
            <thead className="bg-base-200  dark:bg-gray-800">
              <tr className="text-base text-gray-700 dark:text-gray-200">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="dark:text-white">
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name || user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`capitalize font-medium ${
                        user.role === "admin"
                          ? "text-green-500"
                          : user.role === "restaurant"
                          ? "text-blue-500"
                          : user.role === "charity"
                          ? "text-purple-500"
                          : "dark:text-white"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="text-center">
                    {/* Dropdown Role Selector */}
                    <div className="dropdown dropdown-bottom">
                      <label
                        tabIndex={0}
                        className="btn btn-xs btn-outline m-1"
                      >
                        Set Role
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-40"
                      >
                        {roles.map((role) => (
                          <li key={role}>
                            <button
                              className={`capitalize ${
                                user.role === role
                                  ? "text-green-500 font-semibold"
                                  : ""
                              }`}
                              disabled={user.role === role}
                              onClick={() => handleRoleChange(user._id, role)}
                            >
                              {role}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-xs btn-outline btn-error mt-1"
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

export default ManageUsers;
