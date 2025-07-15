import React from "react";
import { useQuery } from "@tanstack/react-query";
import FeaturedDonationsCard from "./FeaturedDonationsCard";
import { FaStar, FaUtensils } from "react-icons/fa";

import useAxios from "../../../../hooks/useAxios";


const FeaturedDonations = () => {
  const axios = useAxios();

  const { data: featuredDonations = [], isLoading, isError } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axios.get("/latesFeatured?isFeatured=true");
      return res.data;
    },
    staleTime: 5 * 60 * 1000 
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
            Failed to load featured donations
          </h3>
          <p className="mt-2 text-red-700 dark:text-red-300">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-2 rounded-full flex items-center">
              <FaStar className="mr-2" />
              Featured Collections
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            Highlighted <span className="text-green-600">Food Donations</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover exceptional food donations making a real difference in our community
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {featuredDonations.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <FaUtensils className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No Featured Donations Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Check back later for featured food donations
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredDonations.map((donation) => (
              <FeaturedDonationsCard 
                key={donation._id} 
                donation={donation} 
              />
            ))}
          </div>
        )}

       
      </div>
    </section>
  );
};

export default FeaturedDonations;