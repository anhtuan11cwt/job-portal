import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobTable from "./AdminJobTable";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [filterByTitle, setFilterByTitle] = useState("");

  return (
    <div className="mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb items={[{ label: "Việc làm" }]} />
      <div className="flex justify-between items-center my-5">
        <Input
          className="w-64 sm:w-80"
          onChange={(e) => setFilterByTitle(e.target.value)}
          placeholder="Tìm theo tên công việc"
          value={filterByTitle}
        />
        <Button onClick={() => navigate("/admin/jobs/create")}>
          Đăng tin mới
        </Button>
      </div>
      <AdminJobTable filterByTitle={filterByTitle} />
    </div>
  );
};

export default AdminJobs;
