import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import JobCard from "../home/JobCard";
import FilterCard from "../jobs/FilterCard";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

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
    <div className="mx-auto pt-3 mb-6 sm:mb-10 px-2 sm:px-4 lg:px-6 max-w-7xl">
      <Breadcrumb items={[{ label: "Việc làm" }]} />
      <div className="lg:hidden mb-4">
        <Button
          className="flex justify-center items-center gap-2 w-full"
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

      <div className="flex lg:flex-row flex-col gap-5">
        <div
          className={`${
            showFilter ? "block" : "hidden"
          } lg:block lg:w-[20%] w-full`}
        >
          <FilterCard />
        </div>

        <div className="flex-1">
          <h1 className="mb-5 font-bold text-lg sm:text-xl">
            Kết quả tìm kiếm ({filteredJobs.length})
          </h1>

          <div className="max-h-[80vh] overflow-y-auto">
            {filteredJobs.length <= 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-lg">
                  Không tìm thấy việc làm
                </p>
              </div>
            ) : (
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {filteredJobs.map((job, index) => (
                  <JobCard index={index} job={job} key={job._id} />
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
