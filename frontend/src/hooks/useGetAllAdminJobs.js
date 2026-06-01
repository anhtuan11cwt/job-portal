import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
