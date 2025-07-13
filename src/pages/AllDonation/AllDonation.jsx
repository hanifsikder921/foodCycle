import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import { FiSearch, FiFilter, FiClock, FiPackage } from "react-icons/fi";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const axios = useAxios();

  useEffect(() => {
    axios
      .get(`/donations?status=Verified&status=Requested&status=Picked Up`)
      .then((res) => {
        setDonations(res.data);
        setFilteredDonations(res.data);
      })
      .catch((err) => console.error(err));
  }, [axios]);

  useEffect(() => {
    const results = donations.filter((donation) =>
      donation.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDonations(results);
  }, [searchTerm, donations]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    setFilteredDonations((prevDonations) => {
      const sortedDonations = [...prevDonations].sort((a, b) => {
        if (key === "pickupTime") {
          const dateA = new Date(a[key]);
          const dateB = new Date(b[key]);
          return direction === "asc" ? dateA - dateB : dateB - dateA;
        } else {
          // For quantity or other numeric values
          return direction === "asc"
            ? a[key] - b[key]
            : b[key] - a[key];
        }
      });
      return sortedDonations;
    });
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      "Picked Up": {
        color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
        icon: <FiPackage className="mr-1" />,
      },
      Requested: {
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
        icon: <FiClock className="mr-1" />,
      },
      Verified: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
        icon: <FiFilter className="mr-1" />,
      },
    };

    const config = statusConfig[status] || {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      icon: <FiPackage className="mr-1" />,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Available Food Donations
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Browse and request available food donations in your area
        </p>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by location (city or zip code)..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleSort("quantity")}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            {sortConfig.key === "quantity" && sortConfig.direction === "asc" ? (
              <FaSortAmountUp className="mr-2" />
            ) : (
              <FaSortAmountDown className="mr-2" />
            )}
            Sort by Quantity
          </button>

        
        </div>
      </div>

      {filteredDonations.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
            <FiPackage className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No donations found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "There are currently no available donations"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48 w-full">
                <img
                  src={donation.image}
                  alt={donation.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={donation.status} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {donation.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="text-gray-500 dark:text-gray-400 w-24">Restaurant:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {donation.restaurantName}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 dark:text-gray-400 w-24">Location:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {donation.location}
                    </span>
                  </div>
                  {donation.charityName && (
                    <div className="flex">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Charity:</span>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {donation.charityName}
                      </span>
                    </div>
                  )}
                  <div className="flex">
                    <span className="text-gray-500 dark:text-gray-400 w-24">Quantity:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {donation.quantity} servings
                    </span>
                  </div>
                  {donation.pickupTime && (
                    <div className="flex">
                      <span className="text-gray-500 dark:text-gray-400 w-24">Pickup By:</span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {donation.pickupTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to={`/donationDetails/${donation._id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonation;