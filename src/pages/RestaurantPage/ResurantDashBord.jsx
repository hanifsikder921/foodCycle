import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const STATUS_TYPES = ["pending", "Accepted", "Rejected", "Picked Up"];
const CHART_COLORS = ["#facc15", "#4ade80", "#f87171", "#60a5fa"]; // Yellow, Green, Red, Blue

const RestaurantDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    Accepted: 0,
    Rejected: 0,
    "Picked Up": 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;
      
      try {
        setIsLoading(true);
        const response = await axiosSecure.get(
          `/restaurant/request-stats?email=${user.email}`
        );
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user, axiosSecure]);

  const chartData = STATUS_TYPES.map(status => ({
    name: status,
    value: stats[status],
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Restaurant Dashboard
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Overview of your food request statistics
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 col-span-1 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Total Requests
          </h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.total.toLocaleString()}
          </p>
        </div>

        {STATUS_TYPES.map((status, index) => (
          <div
            key={status}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2">
              {status}
            </h3>
            <p 
              className="text-3xl font-bold"
              style={{ color: CHART_COLORS[index] }}
            >
              {stats[status].toLocaleString()}
            </p>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-4">
            Request Status Overview
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: "#6b7280" }} 
                  axisLine={{ stroke: "#6b7280" }}
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fill: "#6b7280" }}
                  axisLine={{ stroke: "#6b7280" }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`bar-cell-${index}`} 
                      fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-4">
            Request Status Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label={({ name, percent }) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`pie-cell-${index}`} 
                      fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [value, "Count"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e5e7eb",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};


export default RestaurantDashboard;