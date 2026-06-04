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
  const { allJobs, filters } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);

  const filteredJobs = allJobs.filter((job) => {
    if (filters.location && job.location !== filters.location) return false;
    if (filters.salary) {
      const salaryNum = job.salary;
      const matchSalary = (range) => {
        if (range === "0 - 50 triệu") return salaryNum <= 50000000;
        if (range === "50 - 100 triệu")
          return salaryNum > 50000000 && salaryNum <= 100000000;
        if (range === "100 - 200 triệu")
          return salaryNum > 100000000 && salaryNum <= 200000000;
        if (range === "200 triệu+") return salaryNum > 200000000;
        return true;
      };
      if (!matchSalary(filters.salary)) return false;
    }
    if (filters.industry) {
      const query = filters.industry.toLowerCase();
      const match =
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query);
      if (!match) return false;
    }
    return true;
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
