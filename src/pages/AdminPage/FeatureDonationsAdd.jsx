import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiArrowUp, FiArrowDown, FiStar, FiEye, FiClock } from "react-icons/fi";
import Loading from './../../components/Loading/Loading';


const FeatureDonationsAdd = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isAtTop, setIsAtTop] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations?status=Verified&status=Requested&status=Picked Up`
      );
      return res.data;
    },
  });

  const filteredDonations = donations.filter(donation =>
    donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { mutate: toggleFeature, isPending } = useMutation({
    mutationFn: async (donation) => {
      const res = await axiosSecure.patch(
        `/donations/feature/${donation._id}`,
        { isFeatured: !donation.isFeatured }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Featured status updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["verifiedDonations"]);
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to update featured status",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleScrollClick = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <Loading/>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Featured Donations Management
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Highlight exceptional donations on the platform homepage
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiEye className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search donations..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {donations.length} Total
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {donations.filter(d => d.isFeatured).length} Featured
                </span>
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700"></div>
        </div>

        {/* Donations Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {filteredDonations.length === 0 ? (
            <div className="text-center py-12">
              <FiClock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No donations found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? "Try a different search term" : "There are currently no verified donations"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Donation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredDonations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={donation.image || "https://via.placeholder.com/150"}
                              alt={donation.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {donation.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {donation.foodType}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          Quantity: {donation.quantity}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Loaction: {donation?.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {donation.restaurantName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => toggleFeature(donation)}
                          disabled={isPending}
                          className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                            donation.isFeatured
                              ? "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                              : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                          }`}
                        >
                          <FiStar className="mr-1" />
                          {donation.isFeatured ? "Remove Feature" : "Make Featured"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Scroll to Top/Bottom Button */}
        <button
          onClick={handleScrollClick}
          className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
          aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
        >
          {isAtTop ? <FiArrowDown size={20} /> : <FiArrowUp size={20} />}
        </button>
      </div>
    </div>
  );
};

export default FeatureDonationsAdd;