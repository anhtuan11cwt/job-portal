import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
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
      className="w-full rounded-md border border-gray-200 p-4"
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
      <h1 className="mb-5 text-xl font-bold">Thiết lập công ty</h1>

      <div className="mb-4">
        <Label>Tên công ty</Label>
        <input
          className="mt-4 w-full rounded-md border border-gray-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          name="name"
          onChange={changeEventHandler}
          placeholder="Nhập tên công ty"
          type="text"
          value={input.name}
        />
      </div>

      <div className="mb-4">
        <Label>Mô tả</Label>
        <input
          className="mt-4 w-full rounded-md border border-gray-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          name="description"
          onChange={changeEventHandler}
          placeholder="Nhập mô tả công ty"
          type="text"
          value={input.description}
        />
      </div>

      <div className="mb-4">
        <Label>Website</Label>
        <input
          className="mt-4 w-full rounded-md border border-gray-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          name="website"
          onChange={changeEventHandler}
          placeholder="Nhập website công ty"
          type="url"
          value={input.website}
        />
      </div>

      <div className="mb-4">
        <Label>Địa điểm</Label>
        <input
          className="mt-4 w-full rounded-md border border-gray-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          name="location"
          onChange={changeEventHandler}
          placeholder="Nhập địa điểm"
          type="text"
          value={input.location}
        />
      </div>

      <div className="mb-4">
        <Label>Logo</Label>
        <input
          accept="image/*"
          className="mt-4 w-full cursor-pointer rounded-md border border-gray-300 p-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          onChange={changeFileHandler}
          type="file"
        />
      </div>

      {previewUrl ? (
        <div className="mb-4 rounded-md border border-dashed border-gray-300 p-3">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Xem trước logo
          </p>
          <img
            alt="Xem trước logo"
            className="size-16 rounded-full border object-cover"
            src={previewUrl}
          />
          <p className="mt-2 truncate text-xs text-gray-500">
            {input.file?.name || company?.logo?.split("/").pop()}
          </p>
        </div>
      ) : null}

      {loading ? (
        <Button className="my-4 w-full" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Vui lòng chờ
        </Button>
      ) : (
        <Button
          className="my-4 w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
          type="submit"
        >
          Cập nhật
        </Button>
      )}
    </form>
  );
};

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  return (
    <div className="mx-auto flex items-center justify-center px-6 md:px-12 lg:px-24 xl:px-40">
      <CompanyForm
        company={singleCompany}
        companyId={params.id}
        key={singleCompany?._id || params.id}
        navigate={navigate}
      />
    </div>
  );
};

export default CompanySetup;
