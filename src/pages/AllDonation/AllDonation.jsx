import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import moment from "moment";
import { Link } from "react-router";

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios
       .get(`/donations?status=Verified&status=Requested`)
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err));
  }, [axios]);

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white sticky top-16 md:top-18 p-5 z-5 bg-white dark:bg-gray-700">All Verified Donations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold dark:text-white mb-1">
                {donation.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <strong>Location:</strong> {donation.location}
              </p>

              {donation.charityName && (
                <p className="text-sm text-indigo-500 mt-1">
                  <strong>Assigned Charity:</strong> {donation.charityName}
                </p>
              )}

              <p className="text-sm mt-1 dark:text-gray-200">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-medium ${
                    donation.status === "Picked Up"
                      ? "text-green-500"
                      : donation.status === "Requested"
                      ? "text-yellow-500"
                      : "text-blue-500"
                  }`}
                >
                  {donation.status}
                </span>
              </p>

              <p className="text-sm mt-1 dark:text-gray-200">
                <strong>Quantity:</strong> {donation.quantity}
              </p>

              <div className="mt-4 text-right">
                <Link
                  to={`/donationDetails/${donation._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {donations.length === 0 && (
        <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
          No donations found.
        </p>
      )}
    </div>
  );
};

export default AllDonation;
