import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { cn } from "@/lib/utils";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";

const getInitialInput = (company) => ({
  description: company?.description || "",
  file: null,
  location: company?.location || "",
  name: company?.name || "",
  website: company?.website || "",
});

const CompanyForm = ({ company, navigate, companyId }) => {
  const [input, setInput] = useState(() => getInitialInput(company));
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(company?.logo || "");
  const previewUrlRef = useRef("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const changeEventHandler = (e) => {
    setInput((currentInput) => ({
      ...currentInput,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] ?? null;

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }

    if (!file) {
      setInput((currentInput) => ({ ...currentInput, file: null }));
      setPreviewUrl(company?.logo || "");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setInput((currentInput) => ({ ...currentInput, file }));
    setPreviewUrl(objectUrl);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("logo", input.file);
      }
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Cập nhật công ty thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-card shadow-sm p-6 sm:p-8 border border-border rounded-2xl"
      onSubmit={submitHandler}
    >
      <Button
        className="mb-4"
        onClick={() => navigate("/admin/companies")}
        type="button"
        variant="outline"
      >
        <ArrowLeft className="mr-2 size-4" />
        Quay lại
      </Button>
      <h1 className="mb-5 font-bold text-xl">Thiết lập công ty</h1>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Tên công ty</Label>
          <Input
            disabled={loading}
            id="name"
            name="name"
            onChange={changeEventHandler}
            placeholder="Nhập tên công ty"
            type="text"
            value={input.name}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            disabled={loading}
            id="website"
            name="website"
            onChange={changeEventHandler}
            placeholder="Nhập website công ty"
            type="url"
            value={input.website}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Địa điểm</Label>
          <Input
            disabled={loading}
            id="location"
            name="location"
            onChange={changeEventHandler}
            placeholder="Nhập địa điểm"
            type="text"
            value={input.location}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Mô tả</Label>
          <textarea
            className={cn(
              "flex bg-input/30 px-3 py-2 border border-input rounded-2xl w-full min-h-[120px] text-sm transition-colors resize-y",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              "disabled:pointer-events-none disabled:opacity-50",
              "placeholder:text-muted-foreground",
            )}
            disabled={loading}
            id="description"
            name="description"
            onChange={changeEventHandler}
            placeholder="Nhập mô tả công ty..."
            value={input.description}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="logo">Logo</Label>
          <input
            accept="image/*"
            className={cn(
              "flex bg-input/30 file:bg-transparent disabled:opacity-50 file:me-3 px-3 py-1 border border-input focus-visible:border-ring file:border-0 rounded-4xl focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full h-9 file:h-7 file:font-medium text-foreground placeholder:text-muted-foreground file:text-foreground text-sm file:text-sm cursor-pointer file:cursor-pointer disabled:pointer-events-none",
            )}
            disabled={loading}
            id="logo"
            onChange={changeFileHandler}
            ref={fileInputRef}
            type="file"
          />
        </div>

        {previewUrl && (
          <div className="p-4 border border-border rounded-xl">
            <p className="mb-3 font-medium text-muted-foreground text-sm">
              Xem trước logo
            </p>
            <div className="flex items-center gap-4">
              <img
                alt="Xem trước logo"
                className="border rounded-full size-16 object-cover"
                src={previewUrl}
              />
              <p className="text-muted-foreground text-xs truncate">
                {input.file?.name || company?.logo?.split("/").pop()}
              </p>
            </div>
          </div>
        )}
      </div>

      <Button className="mt-6 w-full" disabled={loading} type="submit">
        {loading ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Vui lòng chờ
          </>
        ) : (
          "Cập nhật"
        )}
      </Button>
    </form>
  );
};

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  return (
    <div className="mx-auto pt-3 mb-10 px-2 sm:px-4 lg:px-6 max-w-7xl">
      <Breadcrumb
        items={[
          { href: "/admin/companies", label: "Công ty" },
          { label: "Thiết lập công ty" },
        ]}
      />
      <div className="mt-5">
        <CompanyForm
          company={singleCompany}
          companyId={params.id}
          key={singleCompany?._id || params.id}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default CompanySetup;
