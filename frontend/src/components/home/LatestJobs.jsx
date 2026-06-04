import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="my-12 sm:my-20">
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        <span className="text-[#6A38C2]">Mới nhất & Hàng đầu</span> Việc làm
      </h2>

      {allJobs.length <= 0 ? (
        <p className="text-center text-gray-500 mt-10">Không có việc làm nào</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {allJobs?.slice(0, 6).map((job, index) => (
            <JobCard index={index} job={job} key={job._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
