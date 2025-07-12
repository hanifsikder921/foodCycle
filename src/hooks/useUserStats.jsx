import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"

const useUserStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user-stats");
      return res.data;
    },
  });
};

export default useUserStats;
