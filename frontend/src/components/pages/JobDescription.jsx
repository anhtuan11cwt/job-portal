import axios from "axios";
import {
  Banknote,
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import formatCurrency from "@/utils/formatCurrency";
import translateJobType from "@/utils/translateJobType";

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
      <div className="my-10 px-6 md:px-16 lg:px-24 xl:px-32 text-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="mb-6 sm:mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb
        items={[
          { href: "/jobs", label: "Việc làm" },
          { label: singleJob?.title || "Chi tiết công việc" },
        ]}
      />
      <div className="bg-card p-4 sm:p-6 border border-border rounded-2xl">
        <div className="flex sm:flex-row flex-col justify-between items-start gap-4">
          <div>
            <h1 className="font-bold text-xl sm:text-2xl">{singleJob.title}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
              <Badge className="bg-primary/10 hover:bg-primary/20 font-bold text-primary text-xs sm:text-sm">
                <Briefcase className="mr-1 size-3" />
                {singleJob.position} Vị trí
              </Badge>
              <Badge className="bg-brand-accent/10 hover:bg-brand-accent/20 font-bold text-brand-accent text-xs sm:text-sm">
                {translateJobType(singleJob.jobType)}
              </Badge>
              <Badge className="bg-[#7209b7]/10 hover:bg-[#7209b7]/20 font-bold text-[#7209b7] text-xs sm:text-sm">
                <Banknote className="mr-1 size-3" />
                {formatCurrency(singleJob.salary)}
              </Badge>
            </div>
          </div>
          <Button
            className={cn(
              "px-4 sm:px-6 rounded-full w-full sm:w-auto",
              isApplied && "bg-muted-foreground/50 cursor-not-allowed",
            )}
            disabled={isApplied}
            onClick={isApplied ? null : applyJobHandler}
          >
            {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
          </Button>
        </div>

        <hr className="my-6 border-border" />

        <h2 className="pb-3 border-border border-b-2 font-medium text-base sm:text-lg">
          Mô tả công việc
        </h2>

        <div className="space-y-4 mt-5">
          <div className="flex items-start sm:items-center gap-3">
            <Building2 className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">Vai trò: </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {singleJob.title}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <MapPin className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">Địa điểm: </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {singleJob.location || "Làm từ xa"}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Banknote className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Mức lương:{" "}
              </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {formatCurrency(singleJob.salary)}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Clock className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Kinh nghiệm:{" "}
              </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {singleJob.experience} năm
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Briefcase className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Loại công việc:{" "}
              </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {translateJobType(singleJob.jobType)}
              </span>
            </div>
          </div>

          <div className="flex items-start sm:items-center gap-3">
            <Users className="mt-0.5 sm:mt-0 size-5 text-muted-foreground shrink-0" />
            <div>
              <span className="font-bold text-sm sm:text-base">
                Tổng số ứng viên:{" "}
              </span>
              <span className="pl-2 text-muted-foreground text-sm sm:text-base">
                {singleJob.applications?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 font-bold text-base sm:text-lg">Về công việc</h3>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {singleJob.description}
          </p>
        </div>

        {singleJob.requirements && (
          <div className="mt-6">
            <h3 className="mb-3 font-bold text-base sm:text-lg">Yêu cầu</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {singleJob.requirements}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
