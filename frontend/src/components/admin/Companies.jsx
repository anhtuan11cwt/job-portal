import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import CompanyTable from "./CompanyTable";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [filterByName, setFilterByName] = useState("");

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-64 sm:w-80"
          onChange={(e) => setFilterByName(e.target.value)}
          placeholder="Tìm theo tên công ty"
          value={filterByName}
        />
        <Button
          className="bg-[#6A38C2] hover:bg-[#5b30a6]"
          onClick={() => navigate("/admin/companies/create")}
        >
          Thêm công ty
        </Button>
      </div>
      <CompanyTable filterByName={filterByName} />
    </div>
  );
};

export default Companies;
