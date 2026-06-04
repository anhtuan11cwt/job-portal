import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Login = () => {
  const [input, setInput] = useState({
    cccd: "",
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        {
          cccd: input.cccd,
          email: input.email,
          password: input.password,
          role: input.role,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center px-6 md:px-12 lg:px-24 xl:px-40">
      <form
        className="w-4/5 md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-xl mb-5">Đăng nhập</h1>

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

        <div className="mb-4">
          <Label>Số CCCD</Label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            name="cccd"
            onChange={changeEventHandler}
            placeholder="Nhập số căn cước công dân"
            type="text"
            value={input.cccd}
          />
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
            Đăng nhập
          </Button>
        )}

        <span
          className={`text-sm ${loading ? "pointer-events-none opacity-50" : ""}`}
        >
          Bạn chưa có tài khoản?{" "}
          <Link className="text-blue-600" to="/register">
            Đăng ký
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
