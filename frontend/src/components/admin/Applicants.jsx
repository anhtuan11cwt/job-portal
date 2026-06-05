import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import ApplicantsTable from "./ApplicantsTable";

const Applicants = () => {
  const params = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setApplicants(res.data.applicants);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Lỗi lấy danh sách ứng viên",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [params.id]);

  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app,
          ),
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Cập nhật trạng thái thất bại",
      );
    }
  };

  if (loading) {
    return (
      <div className="my-10 px-6 md:px-16 lg:px-24 xl:px-32">
        <p className="text-muted-foreground text-center">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb
        items={[
          { href: "/admin/jobs", label: "Việc làm" },
          { label: "Ứng viên" },
        ]}
      />
      <h1 className="my-5 font-bold text-xl">
        Danh sách ứng viên ({applicants.length})
      </h1>
      <ApplicantsTable applicants={applicants} statusHandler={statusHandler} />
    </div>
  );
};

export default Applicants;
