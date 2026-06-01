import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Register = () => {
  const [input, setInput] = useState({
    email: "",
    file: null,
    fullName: "",
    password: "",
    phone: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const previewUrlRef = useRef("");

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }

    if (!file) {
      setInput({ ...input, file: null });
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setInput({ ...input, file });
    setPreviewUrl(objectUrl);
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phone);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("profilePhoto", input.file);
      }
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
      <form
        className="w-4/5 md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-xl mb-5">Đăng ký</h1>

        <div className="mb-4">
          <Label>Họ và tên</Label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            name="fullName"
            onChange={changeEventHandler}
            placeholder="Nhập họ và tên của bạn"
            type="text"
            value={input.fullName}
          />
        </div>

        <div className="mb-4">
          <Label>Email</Label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            name="email"
            onChange={changeEventHandler}
            placeholder="Nhập email của bạn"
            type="email"
            value={input.email}
          />
        </div>

        <div className="mb-4">
          <Label>Số điện thoại</Label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            name="phone"
            onChange={changeEventHandler}
            placeholder="Nhập số điện thoại của bạn"
            type="tel"
            value={input.phone}
          />
        </div>

        <div className="mb-4">
          <Label>Mật khẩu</Label>
          <div className="relative">
            <input
              className="w-full border border-gray-300 rounded-md p-2 mt-4 pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              name="password"
              onChange={changeEventHandler}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
              value={input.password}
            />
            <button
              className="absolute right-3 top-[65%] -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="my-5">
          <Label className="mb-3 block">Chọn vai trò</Label>
          <RadioGroup
            className="flex items-center gap-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            onValueChange={(value) => setInput({ ...input, role: value })}
            value={input.role}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="student" value="student" />
              <Label htmlFor="student">Sinh viên</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="recruiter" value="recruiter" />
              <Label htmlFor="recruiter">Nhà tuyển dụng</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-4">
          <Label>Ảnh đại diện</Label>
          <input
            accept="image/*"
            className="w-full border border-gray-300 rounded-md p-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            onChange={fileHandler}
            type="file"
          />
        </div>

        {previewUrl ? (
          <div className="mb-4 rounded-md border border-dashed border-gray-300 p-3">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Xem trước ảnh
            </p>
            <img
              alt="Xem trước ảnh đại diện"
              className="size-16 rounded-full border object-cover"
              src={previewUrl}
            />
            <p className="mt-2 truncate text-xs text-gray-500">
              {input.file?.name}
            </p>
          </div>
        ) : null}

        {loading ? (
          <Button className="w-full my-4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Vui lòng chờ
          </Button>
        ) : (
          <Button
            className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6]"
            type="submit"
          >
            Đăng ký
          </Button>
        )}

        <span
          className={`text-sm ${loading ? "pointer-events-none opacity-50" : ""}`}
        >
          Đã có tài khoản?{" "}
          <Link className="text-blue-600" to="/login">
            Đăng nhập
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
