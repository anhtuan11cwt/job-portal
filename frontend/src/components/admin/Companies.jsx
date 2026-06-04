import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import CompanyTable from "./CompanyTable";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [filterByName, setFilterByName] = useState("");

  return (
    <div className="mx-auto pt-3 mb-10 px-2 sm:px-4 lg:px-6 max-w-7xl">
      <Breadcrumb items={[{ label: "Công ty" }]} />
      <div className="flex justify-between items-center my-5">
        <Input
          className="w-64 sm:w-80"
          onChange={(e) => setFilterByName(e.target.value)}
          placeholder="Tìm theo tên công ty"
          value={filterByName}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          Thêm công ty
        </Button>
      </div>
      <CompanyTable filterByName={filterByName} />
    </div>
  );
};

export default Companies;
