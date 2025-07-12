import React from "react";
import useAuth from "../../hooks/useAuth";
import {
  FiMail,
  FiUser,
  FiShield,
  FiClock,
  FiPhone,
  FiMapPin,
  FiSettings,
} from "react-icons/fi";
import useUserRole from "./../../hooks/useUserRole";
import Loading from './../../components/Loading/Loading';

const AdminProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  const adminInfo = {
    name: user?.displayName || "Admin Name",
    email: user?.email || "admin@example.com",
    image: user?.photoURL || "https://i.ibb.co/2YkJm6F/default-avatar.png",
    role: role,
    lastLogin: user?.metadata?.lastSignInTime || "Unavailable",
    phone: "+1 234 567 890",
    location: "New York, USA",
    joinDate: "January 15, 2022",
    status: "Active",
  };

  if (roleLoading) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={adminInfo.image}
                alt="Admin"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4 md:mb-0 md:mr-6"
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{adminInfo.name}</h2>
                <p className="text-blue-100 flex items-center justify-center md:justify-start mt-1 capitalize">
                  <FiShield className="mr-2" />
                  {adminInfo.role}
                </p>
                <p className="text-blue-100 mt-2">
                  {adminInfo.status} • Joined {adminInfo.joinDate}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <FiUser className="mr-2 text-blue-500" />
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMail className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      {adminInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiPhone className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      {adminInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMapPin className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      {adminInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <FiSettings className="mr-2 text-blue-500" />
                Account Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiShield className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="text-gray-800 dark:text-white capitalize">
                      {adminInfo.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiClock className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last Login
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      {new Date(adminInfo.lastLogin).toLocaleString() ||
                        "Unavailable"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiUser className="mt-1 mr-3 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Account Status
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {adminInfo.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  1,248
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Sessions
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  42
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tasks Completed
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  89%
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Storage Used
                </p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  65%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
