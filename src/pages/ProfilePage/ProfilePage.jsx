import React from "react";
import { FaUserShield, FaEnvelope, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const ProfilePage = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-24 w-24 mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const joinDate = user?.metadata?.creationTime
    ? format(new Date(user.metadata.creationTime), "MMMM d, yyyy")
    : "N/A";

  const roleBadgeColors = {
    admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    restaurant: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    charity: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    user: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 md:h-48 h-36">
          <div className="absolute -bottom-16 left-6">
            <div className="relative group">
              <img
                src={user?.photoURL || "https://i.ibb.co/1dKKbZL/default-avatar.png"}
                alt="User"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-6 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                {user.displayName || "Unnamed User"}
                {role !== "user" && (
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${roleBadgeColors[role]}`}>
                    <FaUserShield className="inline mr-1" />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
            </div>
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <FaUserCircle className="text-blue-500" />
                Basic Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-800 dark:text-white">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="text-gray-800 dark:text-white">{joinDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <FaUserShield className="text-blue-500" />
                Account Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-800 dark:text-white capitalize">Baangladesh</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-gray-800 dark:text-white">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;