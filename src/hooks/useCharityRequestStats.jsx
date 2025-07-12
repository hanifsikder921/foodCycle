import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCharityRequestStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["charityRequestStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-request-stats");
    
      return res.data;
    },
  });
};

export default useCharityRequestStats;
