import axios from "axios";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import JobCard from "../home/JobCard";
import FilterCard from "../jobs/FilterCard";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

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

  const filteredJobs = allJobs.filter((job) => {
    if (!searchedQuery) return true;
    const query = searchedQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.jobType?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto my-6 sm:my-10 px-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
          variant="outline"
        >
          {showFilter ? (
            <>
              <X className="size-4" />
              Đóng bộ lọc
            </>
          ) : (
            <>
              <SlidersHorizontal className="size-4" />
              Hiện bộ lọc
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Filter Sidebar */}
        <div
          className={`${
            showFilter ? "block" : "hidden"
          } lg:block lg:w-[20%] w-full`}
        >
          <FilterCard />
        </div>

        {/* Job List */}
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-bold mb-5">
            Kết quả tìm kiếm ({filteredJobs.length})
          </h1>

          <div className="overflow-y-auto max-h-[80vh]">
            {filteredJobs.length <= 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Không tìm thấy việc làm</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <JobCard job={job} key={job._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
