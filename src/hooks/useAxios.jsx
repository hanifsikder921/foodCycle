import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://food-cycle-server-blond.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;