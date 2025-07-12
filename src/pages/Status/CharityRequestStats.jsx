import React from "react";
import { FaClock, FaCheckCircle, FaTimesCircle, FaListAlt } from "react-icons/fa";
import useCharityRequestStats from "../../hooks/useCharityRequestStats";



const cardConfig = [
  {
    key: "pending",
    label: "Pending Requests",
    color: "yellow",
    icon: <FaClock className="text-2xl" />,
  },
  {
    key: "Approved",
    label: "Approved Requests",
    color: "green",
    icon: <FaCheckCircle className="text-2xl" />,
  },
  {
    key: "rejected",
    label: "Rejected Requests",
    color: "red",
    icon: <FaTimesCircle className="text-2xl" />,
  },
  {
    key: "total",
    label: "Total Requests",
    color: "blue",
    icon: <FaListAlt className="text-2xl" />,
  },
];

const colorClasses = {
  yellow: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
  green: "text-green-500 bg-green-100 dark:bg-green-900",
  red: "text-red-500 bg-red-100 dark:bg-red-900",
  blue: "text-blue-500 bg-blue-100 dark:bg-blue-900",
};

const CharityRequestStats = () => {
  const { data = {}, isLoading } = useCharityRequestStats();

  if (isLoading) return <p className="text-center py-5">Loading stats...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardConfig.map((card) => (
        <div
          key={card.key}
          className={`bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-between border-l-4 shadow transition duration-300 hover:shadow-md cursor-pointer border-${card.color}-500`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${colorClasses[card.color]}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                {card.key}
              </h2>
            </div>
          </div>
          <div>
            <p className={`text-3xl font-extrabold ${colorClasses[card.color].split(" ")[0]}`}>
              {data[card.key] ?? 0}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharityRequestStats;
