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
    <div className="mx-auto pt-3 mb-10 px-2 sm:px-4 lg:px-6 max-w-7xl">
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
