import React from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
  FaUserCheck,
} from "react-icons/fa";
import useDonationStats from "../../hooks/useDonationStats";


const statsConfig = [
  {
    key: "total",
    label: "Total Donations",
    icon: <FaClipboardList className="text-2xl" />,
    color: "blue",
  },
  {
    key: "pending",
    label: "Pending",
    icon: <FaClock className="text-2xl" />,
    color: "yellow",
  },
  {
    key: "verified",
    label: "Verified",
    icon: <FaCheckCircle className="text-2xl" />,
    color: "green",
  },
  {
    key: "pickedUp",
    label: "Picked Up",
    icon: <FaTruck className="text-2xl" />,
    color: "indigo",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: <FaTimesCircle className="text-2xl" />,
    color: "red",
  },
  {
    key: "Requested",
    label: "Requested",
    icon: <FaUserCheck className="text-2xl" />,
    color: "violet",
  },
];

const colorMap = {
  yellow: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
  green: "text-green-500 bg-green-100 dark:bg-green-900",
  red: "text-red-500 bg-red-100 dark:bg-red-900",
  blue: "text-blue-500 bg-blue-100 dark:bg-blue-900",
  indigo: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900",
  violet: "text-violet-500 bg-violet-100 dark:bg-violet-900",
};
const borderColorMap = {
  yellow: "border-yellow-500",
  green: "border-green-500",
  red: "border-red-500",
  blue: "border-blue-500",
  indigo: "border-indigo-500",
  violet: "border-violet-500",
};

const DonationStats = () => {
  const { data = {}} = useDonationStats();


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsConfig.map((stat) => (
        <div
          key={stat.key}
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-between shadow transition duration-300 hover:shadow-md border-l-4 ${
            borderColorMap[stat.color]
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${colorMap[stat.color]}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {data[stat.key] ?? 0}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationStats;
