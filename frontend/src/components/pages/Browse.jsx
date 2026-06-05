import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/shared/Breadcrumb";
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
    <div className="mb-6 sm:mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb items={[{ label: "Tìm kiếm" }]} />
      <h1 className="mb-5 font-bold text-lg sm:text-xl">
        Kết quả tìm kiếm ({allJobs.length})
      </h1>

      {allJobs.length <= 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">
            Không tìm thấy kết quả
          </p>
        </div>
      ) : (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allJobs.map((job, index) => (
            <JobCard index={index} job={job} key={job._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
