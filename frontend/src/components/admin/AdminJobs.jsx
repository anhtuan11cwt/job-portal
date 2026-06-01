import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobTable from "./AdminJobTable";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [filterByTitle, setFilterByTitle] = useState("");

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-64 sm:w-80"
          onChange={(e) => setFilterByTitle(e.target.value)}
          placeholder="Tìm theo tên công việc"
          value={filterByTitle}
        />
        <Button
          className="bg-[#6A38C2] hover:bg-[#5b30a6]"
          onClick={() => navigate("/admin/jobs/create")}
        >
          Đăng tin mới
        </Button>
      </div>
      <AdminJobTable filterByTitle={filterByTitle} />
    </div>
  );
};

export default AdminJobs;
