import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import JobCard from "../home/JobCard";

const Browse = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${encodeURIComponent(keyword)}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [dispatch, keyword]);

  return (
    <div className="max-w-7xl mx-auto my-6 sm:my-10 px-4">
      <h1 className="text-lg sm:text-xl font-bold mb-5">
        Kết quả tìm kiếm ({allJobs.length})
      </h1>

      {allJobs.length <= 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Không tìm thấy kết quả</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
