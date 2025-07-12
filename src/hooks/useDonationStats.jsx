import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonationStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["donationStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-stats");
      return res.data;
    },
  });
};

export default useDonationStats;
