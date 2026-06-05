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
    <div className="mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
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
