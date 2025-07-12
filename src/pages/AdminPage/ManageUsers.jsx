import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiUser, FiMail, FiShield, FiTrash2, FiEdit, FiChevronDown, FiSearch } from "react-icons/fi";
import Loading from "../../components/Loading/Loading";


const roles = [
  { value: "admin", label: "Admin", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { value: "restaurant", label: "Restaurant", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { value: "charity", label: "Charity", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { value: "user", label: "User", color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" }
];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setOpenDropdown(null);
      Swal.fire({
        title: "Success",
        text: "User role updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to update user role",
        icon: "error",
        timer: 1500,
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
      Swal.fire({
        title: "Deleted!",
        text: "User has been removed successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Failed to delete user",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleRoleChange = (userId, role) => {
    updateRoleMutation.mutate({ userId, role });
  };

  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: `Delete ${userName || 'this user'}?`,
      text: "This action cannot be undone. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(userId);
      }
    });
  };

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
              User Management
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage all user accounts and permissions
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm sm:text-base text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Users</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{users.length}</p>
          </div>
          {roles.map((role) => (
            <div key={role.value} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{role.label}s</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                {users.filter(u => u.role === role.value).length}
              </p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loading/>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <FiUser className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? "Try a different search term" : "There are currently no users"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => {
                    const roleConfig = roles.find(r => r.value === user.role) || roles[3];
                    return (
                      <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                              <img src={user?.image} className="rounded-full object-cover h-8 w-8" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name || user.displayName || "No name"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {user._id.slice(-6)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiMail className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                            <div className="text-sm text-gray-900 dark:text-white">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleConfig.color}`}>
                            {roleConfig.label}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <div className="relative inline-block text-left">
                              <div>
                                <button
                                  type="button"
                                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-2 sm:px-3 py-1 bg-white dark:bg-gray-800 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  onClick={() => toggleDropdown(user._id)}
                                >
                                  <FiEdit className="mr-1" />
                                  Change Role
                                  <FiChevronDown className="ml-1" />
                                </button>
                              </div>

                              {openDropdown === user._id && (
                                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                                  <div className="py-1" role="menu" aria-orientation="vertical">
                                    {roles.map((role) => (
                                      <button
                                        key={role.value}
                                        disabled={user.role === role.value}
                                        onClick={() => handleRoleChange(user._id, role.value)}
                                        className={`block w-full text-left px-4 py-2 text-xs sm:text-sm ${
                                          user.role === role.value 
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                        role="menuitem"
                                      >
                                        {role.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleDelete(user._id, user.name || user.email)}
                              className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 dark:hover:bg-red-700 border border-red-600 dark:border-red-400 hover:border-transparent transition-colors duration-200"
                            >
                              <FiTrash2 className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;