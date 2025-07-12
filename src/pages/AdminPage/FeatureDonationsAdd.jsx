import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { GoMoveToTop, GoMoveToBottom } from "react-icons/go";

const FeatureDonationsAdd = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isAtTop, setIsAtTop] = useState(true);


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


  const { mutate: toggleFeature, isPending } = useMutation({
    mutationFn: async (donation) => {
      const res = await axiosSecure.patch(`/donations/feature/${donation._id}`, {
        isFeatured: !donation.isFeatured,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Feature status updated.", "success");
      queryClient.invalidateQueries(["verifiedDonations"]);
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  const handleScrollClick = () => {
    if (isAtTop) {

      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 text-start">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Food Type</th>
              <th className="p-2">Restaurant</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="text-center shadow">
                <td className="p-2">
                  <img
                    src={donation.image}
                    alt="Donation"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2 text-start">{donation.title}</td>
                <td className="p-2">{donation.foodType}</td>
                <td className="p-2">{donation.restaurantName}</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleFeature(donation)}
                    className={`px-3 py-1 rounded text-white ${
                      donation.isFeatured
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isPending}
                  >
                    {donation.isFeatured ? "Remove Feature" : "Feature"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      <button
        onClick={handleScrollClick}
        className="fixed bottom-5 right-5 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 animate-bounce"
      >
        {isAtTop ? <GoMoveToBottom size={20} /> : <GoMoveToTop size={20} />}
      </button>
    </div>
  );
};

export default FeatureDonationsAdd;
