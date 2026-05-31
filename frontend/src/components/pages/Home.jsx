import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import Category from "../home/Category";
import Header from "../home/Header";
import LatestJobs from "../home/LatestJobs";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Category />
      <LatestJobs />
    </div>
  );
};

export default Home;
