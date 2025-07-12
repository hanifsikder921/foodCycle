import React from "react";
import useUserStats from "../../hooks/useUserStats";
import {
  FaUserGroup,
  FaUserShield,
  FaUtensils,
  FaHandHoldingHeart,
} from "react-icons/fa6";

const UserStats = () => {
  const { data: userStats } = useUserStats();

  const statCards = [
    {
      title: "Users",
      subtitle: "Total Users",
      count: userStats?.user || 0,
      icon: <FaUserGroup className="text-2xl" />,
      color: "yellow",
    },
    {
      title: "Admins",
      subtitle: "Total Admins",
      count: userStats?.admin || 0,
      icon: <FaUserShield className="text-2xl" />,
      color: "blue",
    },
    {
      title: "Restaurants",
      subtitle: "Total Restaurants",
      count: userStats?.restaurant || 0,
      icon: <FaUtensils className="text-2xl" />,
      color: "green",
    },
    {
      title: "Charities",
      subtitle: "Total Charities",
      count: userStats?.charity || 0,
      icon: <FaHandHoldingHeart className="text-2xl" />,
      color: "rose",
    },
  ];

  const colorClasses = {
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900",
      text: "text-yellow-500",
    },
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-500",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-500",
    },
    rose: {
      border: "border-rose-500",
      bg: "bg-rose-100 dark:bg-rose-900",
      text: "text-rose-500",
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-between hover:shadow-md cursor-pointer transition duration-300 border-l-4 shadow ${
              colorClasses[card.color].border
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${colorClasses[card.color].bg} ${
                  colorClasses[card.color].text
                }`}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.subtitle}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {card.title}
                </h2>
              </div>
            </div>
            <div>
              <p
                className={`text-3xl font-extrabold ${
                  colorClasses[card.color].text
                }`}
              >
                {card.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
