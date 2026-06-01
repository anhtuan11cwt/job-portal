import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
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

  return (
    <div className="flex items-center justify-center max-w-4xl mx-auto my-10 px-4">
      <form
        className="w-full border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-xl mb-6">Đăng tin tuyển dụng</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <Label>Tiêu đề</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="title"
              onChange={changeEventHandler}
              placeholder="VD: Lập trình viên Backend"
              value={input.title}
            />
          </div>

          <div className="mb-4">
            <Label>Mô tả</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="description"
              onChange={changeEventHandler}
              placeholder="Mô tả công việc"
              value={input.description}
            />
          </div>

          <div className="mb-4">
            <Label>Yêu cầu</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="requirements"
              onChange={changeEventHandler}
              placeholder="Yêu cầu công việc"
              value={input.requirements}
            />
          </div>

          <div className="mb-4">
            <Label>Lương (VNĐ)</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="salary"
              onChange={changeEventHandler}
              placeholder="VD: 15000000"
              type="number"
              value={input.salary}
            />
          </div>

          <div className="mb-4">
            <Label>Địa điểm</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="location"
              onChange={changeEventHandler}
              placeholder="VD: Hà Nội"
              value={input.location}
            />
          </div>

          <div className="mb-4">
            <Label>Loại công việc</Label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
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

          <div className="mb-4">
            <Label>Kinh nghiệm (năm)</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="experience"
              onChange={changeEventHandler}
              placeholder="VD: 2"
              type="number"
              value={input.experience}
            />
          </div>

          <div className="mb-4">
            <Label>Số lượng tuyển</Label>
            <Input
              className="mt-2"
              disabled={loading}
              name="position"
              onChange={changeEventHandler}
              placeholder="VD: 3"
              type="number"
              value={input.position}
            />
          </div>
        </div>

        <div className="mb-6 mt-4">
          <Label>Chọn công ty</Label>
          {companies.length > 0 ? (
            <select
              className="w-full border border-gray-300 rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
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
            <p className="text-red-500 text-sm mt-2">
              Bạn cần đăng ký công ty trước khi đăng tin.
            </p>
          )}
        </div>

        <div className="flex gap-4">
          {loading ? (
            <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng tin...
            </Button>
          ) : (
            <Button
              className="bg-[#6A38C2] hover:bg-[#5b30a6]"
              disabled={
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
              Đăng tin
            </Button>
          )}
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
