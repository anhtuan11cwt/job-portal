import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [errors, setErrors] = useState({});

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
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!input.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!input.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    if (!input.cccd.trim()) {
      newErrors.cccd = "Vui lòng nhập số CCCD";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 sm:px-6">
      <form
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm"
        noValidate
        onSubmit={submitHandler}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chào mừng bạn trở lại
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              autoComplete="email"
              disabled={loading}
              id="email"
              name="email"
              onChange={changeEventHandler}
              placeholder="you@example.com"
              type="email"
              value={input.email}
            />
            {errors.email && (
              <p
                className="text-xs text-destructive"
                id="email-error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                aria-invalid={!!errors.password}
                autoComplete="current-password"
                className="pr-10"
                disabled={loading}
                id="password"
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={input.password}
              />
              <button
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p
                className="text-xs text-destructive"
                id="password-error"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cccd">Số CCCD</Label>
            <Input
              aria-describedby={errors.cccd ? "cccd-error" : undefined}
              aria-invalid={!!errors.cccd}
              autoComplete="off"
              disabled={loading}
              id="cccd"
              inputMode="numeric"
              name="cccd"
              onChange={changeEventHandler}
              placeholder="Nhập số căn cước công dân"
              type="text"
              value={input.cccd}
            />
            {errors.cccd && (
              <p
                className="text-xs text-destructive"
                id="cccd-error"
                role="alert"
              >
                {errors.cccd}
              </p>
            )}
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Chọn vai trò</legend>
            <RadioGroup
              className="flex gap-6"
              disabled={loading}
              onValueChange={(value) => setInput({ ...input, role: value })}
              value={input.role}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="student" value="student" />
                <Label htmlFor="student">Sinh viên</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="recruiter" value="recruiter" />
                <Label htmlFor="recruiter">Nhà tuyển dụng</Label>
              </div>
            </RadioGroup>
          </fieldset>
        </div>

        <Button className="mt-6 w-full" disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Vui lòng chờ
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Bạn chưa có tài khoản?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to="/register"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
