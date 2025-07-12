import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import FeaturedDonationsCard from "./FeaturedDonationsCard";

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch only featured donations
  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations?isFeatured=true");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading featured donations...</p>;
  }

  return (
    <section className="my-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Donations
      </h2>
      {featuredDonations.length === 0 ? (
        <p className="text-center text-gray-500">
          No featured donations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonations.map((donation) => (
            <FeaturedDonationsCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedDonations;
