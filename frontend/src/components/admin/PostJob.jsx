import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { cn } from "@/lib/utils";
import { JOB_API_ENDPOINT } from "@/utils/constant";

const PostJob = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    companyId: "",
    description: "",
    experience: "",
    jobType: "",
    location: "",
    position: "",
    requirements: "",
    salary: "",
    title: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const companyId = e.target.value;
    setInput({ ...input, companyId });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        {
          companyId: input.companyId,
          description: input.description,
          experience: Number(input.experience),
          jobType: input.jobType,
          location: input.location,
          position: Number(input.position),
          requirements: input.requirements,
          salary: Number(input.salary),
          title: input.title,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đăng tin tuyển dụng thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectClasses = cn(
    "flex bg-input/30 px-3 py-1 border border-input rounded-4xl w-full h-9 md:text-sm text-base transition-colors",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
  );

  return (
    <div className="mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb
        items={[
          { href: "/admin/jobs", label: "Việc làm" },
          { label: "Đăng tin mới" },
        ]}
      />
      <form
        className="bg-card shadow-sm mt-5 p-6 sm:p-8 border border-border rounded-2xl"
        onSubmit={submitHandler}
      >
        <h1 className="mb-6 font-bold text-xl">Đăng tin tuyển dụng</h1>

        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              disabled={loading}
              id="title"
              name="title"
              onChange={changeEventHandler}
              placeholder="VD: Lập trình viên Backend"
              value={input.title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Lương (VNĐ)</Label>
            <Input
              disabled={loading}
              id="salary"
              name="salary"
              onChange={changeEventHandler}
              placeholder="VD: 15000000"
              type="number"
              value={input.salary}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Địa điểm</Label>
            <Input
              disabled={loading}
              id="location"
              name="location"
              onChange={changeEventHandler}
              placeholder="VD: Hà Nội"
              value={input.location}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Loại công việc</Label>
            <select
              className={selectClasses}
              disabled={loading}
              id="jobType"
              name="jobType"
              onChange={changeEventHandler}
              value={input.jobType}
            >
              <option value="">Chọn loại công việc</option>
              <option value="Full-time">Toàn thời gian</option>
              <option value="Part-time">Bán thời gian</option>
              <option value="Contract">Hợp đồng</option>
              <option value="Internship">Thực tập</option>
              <option value="Remote">Làm việc từ xa</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
            <Input
              disabled={loading}
              id="experience"
              name="experience"
              onChange={changeEventHandler}
              placeholder="VD: 2"
              type="number"
              value={input.experience}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Số lượng tuyển</Label>
            <Input
              disabled={loading}
              id="position"
              name="position"
              onChange={changeEventHandler}
              placeholder="VD: 3"
              type="number"
              value={input.position}
            />
          </div>
        </div>

        <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <textarea
              className={cn(
                "flex bg-input/30 px-3 py-2 border border-input rounded-2xl w-full min-h-[140px] text-sm transition-colors resize-y",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-50",
                "placeholder:text-muted-foreground",
              )}
              disabled={loading}
              id="description"
              name="description"
              onChange={changeEventHandler}
              placeholder="Mô tả chi tiết công việc..."
              value={input.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Yêu cầu</Label>
            <textarea
              className={cn(
                "flex bg-input/30 px-3 py-2 border border-input rounded-2xl w-full min-h-[140px] text-sm transition-colors resize-y",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-50",
                "placeholder:text-muted-foreground",
              )}
              disabled={loading}
              id="requirements"
              name="requirements"
              onChange={changeEventHandler}
              placeholder="Yêu cầu đối với ứng viên..."
              value={input.requirements}
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="companyId">Chọn công ty</Label>
          {companies.length > 0 ? (
            <select
              className={cn(selectClasses, "w-full")}
              disabled={loading}
              id="companyId"
              name="companyId"
              onChange={selectChangeHandler}
              value={input.companyId}
            >
              <option value="">Chọn công ty</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="mt-2 text-destructive text-sm">
              Bạn cần đăng ký công ty trước khi đăng tin.
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            disabled={
              loading ||
              !input.title ||
              !input.description ||
              !input.salary ||
              !input.location ||
              !input.jobType ||
              !input.position ||
              !input.companyId
            }
            type="submit"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Đang đăng tin...
              </>
            ) : (
              "Đăng tin"
            )}
          </Button>
          <Button
            disabled={loading}
            onClick={() => navigate("/admin/jobs")}
            type="button"
            variant="outline"
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
