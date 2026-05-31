import axios from "axios";
import {
  Briefcase,
  Building2,
  Clock,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import formatCurrency from "@/utils/formatCurrency";

const JobDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id,
            ) || false,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [id, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto my-10 px-4 text-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-6 sm:my-10 px-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{singleJob.title}</h1>
            <div className="flex items-center gap-2 sm:gap-3 mt-3 flex-wrap">
              <Badge className="text-[#6A38C2] font-bold bg-[#6A38C2]/10 hover:bg-[#6A38C2]/20 text-xs sm:text-sm">
                <Briefcase className="size-3 mr-1" />
                {singleJob.position} Vị trí
              </Badge>
              <Badge className="text-[#f83002] font-bold bg-[#f83002]/10 hover:bg-[#f83002]/20 text-xs sm:text-sm">
                {singleJob.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold bg-[#7209b7]/10 hover:bg-[#7209b7]/20 text-xs sm:text-sm">
                <IndianRupee className="size-3 mr-1" />
                {formatCurrency(singleJob.salary)}
              </Badge>
            </div>
          </div>
          <Button
            className={`rounded-full px-4 sm:px-6 w-full sm:w-auto ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#6A38C2] hover:bg-[#5b30a6]"
            }`}
            disabled={isApplied}
            onClick={isApplied ? null : applyJobHandler}
          >
            {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
          </Button>
        </div>

        <hr className="my-6" />

        <h2 className="border-b-2 border-gray-300 font-medium pb-3 text-base sm:text-lg">
          Mô tả công việc
        </h2>

        <div className="space-y-4 mt-5">
          <div className="flex items-start sm:items-center gap-3">
            <Building2 className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">Vai trò: </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {singleJob.title}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <MapPin className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">Địa điểm: </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {singleJob.location || "Làm từ xa"}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <IndianRupee className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Mức lương:{" "}
              </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {formatCurrency(singleJob.salary)}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Clock className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Kinh nghiệm:{" "}
              </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {singleJob.experience} năm
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Briefcase className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Loại công việc:{" "}
              </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {singleJob.jobType}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Users className="size-5 text-gray-500 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Tổng số ứng viên:{" "}
              </span>
              <span className="pl-2 text-gray-700 text-sm sm:text-base">
                {singleJob.applications?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-base sm:text-lg mb-3">Về công việc</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {singleJob.description}
          </p>
        </div>

        {singleJob.requirements && (
          <div className="mt-6">
            <h3 className="font-bold text-base sm:text-lg mb-3">Yêu cầu</h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {singleJob.requirements}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
