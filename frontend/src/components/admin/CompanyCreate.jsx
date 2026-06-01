import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
    <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
      <form className="w-4/5 md:w-1/2 border border-gray-200 rounded-md p-4 my-10">
        <h1 className="font-bold text-xl mb-5">Tên công ty của bạn</h1>
        <p className="text-gray-500 mb-5">
          Bạn có thể thay đổi tên công ty sau này.
        </p>
        <div className="mb-4">
          <Label>Tên công ty</Label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nhập tên công ty, ví dụ: Sunfire Sensei"
            type="text"
            value={companyName}
          />
        </div>
        <div className="flex gap-4 my-10">
          {loading ? (
            <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vui lòng chờ
            </Button>
          ) : (
            <Button
              className="bg-[#6A38C2] hover:bg-[#5b30a6]"
              disabled={!companyName.trim()}
              onClick={registerNewCompany}
              type="button"
            >
              Tiếp tục
            </Button>
          )}
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
