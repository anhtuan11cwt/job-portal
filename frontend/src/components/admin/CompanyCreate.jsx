import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { name: companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const companyId = res.data.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký công ty thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 px-6 md:px-16 lg:px-24 xl:px-32 pt-3">
      <Breadcrumb
        items={[
          { href: "/admin/companies", label: "Công ty" },
          { label: "Thêm công ty" },
        ]}
      />
      <form className="bg-card shadow-sm mt-5 p-6 sm:p-8 border border-border rounded-2xl">
        <h1 className="mb-5 font-bold text-xl">Tên công ty của bạn</h1>
        <p className="mb-5 text-muted-foreground">
          Bạn có thể thay đổi tên công ty sau này.
        </p>
        <div className="mb-4 max-w-xl">
          <Label htmlFor="companyName">Tên công ty</Label>
          <Input
            className="mt-2"
            disabled={loading}
            id="companyName"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nhập tên công ty, ví dụ: Sunfire Sensei"
            type="text"
            value={companyName}
          />
        </div>
        <div className="flex gap-4 my-10">
          <Button
            disabled={loading || !companyName.trim()}
            onClick={registerNewCompany}
            type="button"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Vui lòng chờ
              </>
            ) : (
              "Tiếp tục"
            )}
          </Button>
          <Button
            disabled={loading}
            onClick={() => navigate("/admin/companies")}
            variant="outline"
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyCreate;
