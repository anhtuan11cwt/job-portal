import axios from "axios";
import { Camera, Eye, EyeOff, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { setLoading } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Register = () => {
  const [input, setInput] = useState({
    cccd: "",
    email: "",
    file: null,
    fullName: "",
    password: "",
    phone: "",
    role: "student",
    taxCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const previewUrlRef = useRef("");
  const fileInputRef = useRef(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
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

  const clearFile = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
    setInput({ ...input, file: null });
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!input.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }
    if (!input.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!input.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!input.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (input.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!input.cccd.trim()) {
      newErrors.cccd = "Vui lòng nhập số CCCD";
    }
    if (input.role === "recruiter" && !input.taxCode.trim()) {
      newErrors.taxCode = "Vui lòng nhập mã số thuế";
    }
    if (!input.file) {
      newErrors.file = "Vui lòng chọn ảnh đại diện";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phone);
      formData.append("password", input.password);
      formData.append("role", input.role);
      formData.append("taxCode", input.taxCode);
      formData.append("cccd", input.cccd);
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
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8 sm:px-6">
      <form
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm"
        noValidate
        onSubmit={submitHandler}
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Đăng ký</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tạo tài khoản mới
          </p>
        </div>

        <div className="space-y-6">
          <fieldset>
            <legend className="mb-4 text-sm font-semibold text-foreground">
              Thông tin cá nhân
            </legend>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Họ và tên <span className="text-destructive">*</span>
                </Label>
                <Input
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  aria-invalid={!!errors.fullName}
                  autoComplete="name"
                  disabled={loading}
                  id="fullName"
                  name="fullName"
                  onChange={changeEventHandler}
                  placeholder="Nguyễn Văn A"
                  type="text"
                  value={input.fullName}
                />
                {errors.fullName && (
                  <p
                    className="text-xs text-destructive"
                    id="fullName-error"
                    role="alert"
                  >
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
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
                <Label htmlFor="phone">
                  Số điện thoại <span className="text-destructive">*</span>
                </Label>
                <Input
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  aria-invalid={!!errors.phone}
                  autoComplete="tel"
                  disabled={loading}
                  id="phone"
                  name="phone"
                  onChange={changeEventHandler}
                  placeholder="0912345678"
                  type="tel"
                  value={input.phone}
                />
                {errors.phone && (
                  <p
                    className="text-xs text-destructive"
                    id="phone-error"
                    role="alert"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-sm font-semibold text-foreground">
              Bảo mật
            </legend>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-password">
                  Mật khẩu <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    aria-invalid={!!errors.password}
                    autoComplete="new-password"
                    className="pr-10"
                    disabled={loading}
                    id="reg-password"
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
                <p className="text-xs text-muted-foreground">Ít nhất 6 ký tự</p>
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
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-sm font-semibold text-foreground">
              Thông tin bổ sung
            </legend>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cccd">
                  Số CCCD <span className="text-destructive">*</span>
                </Label>
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

              {input.role === "recruiter" && (
                <div className="space-y-2">
                  <Label htmlFor="taxCode">
                    Mã số thuế <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    aria-describedby={
                      errors.taxCode ? "taxCode-error" : undefined
                    }
                    aria-invalid={!!errors.taxCode}
                    autoComplete="off"
                    disabled={loading}
                    id="taxCode"
                    name="taxCode"
                    onChange={changeEventHandler}
                    placeholder="Nhập mã số thuế của bạn"
                    type="text"
                    value={input.taxCode}
                  />
                  {errors.taxCode && (
                    <p
                      className="text-xs text-destructive"
                      id="taxCode-error"
                      role="alert"
                    >
                      {errors.taxCode}
                    </p>
                  )}
                </div>
              )}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">
              Chọn vai trò <span className="text-destructive">*</span>
            </legend>
            <RadioGroup
              className="flex gap-6"
              disabled={loading}
              onValueChange={(value) => setInput({ ...input, role: value })}
              value={input.role}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem id="student-2" value="student" />
                <Label htmlFor="student-2">Sinh viên</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="recruiter-2" value="recruiter" />
                <Label htmlFor="recruiter-2">Nhà tuyển dụng</Label>
              </div>
            </RadioGroup>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-sm font-semibold text-foreground">
              Ảnh đại diện <span className="text-destructive">*</span>
            </legend>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted">
                  {previewUrl ? (
                    <>
                      <img
                        alt="Ảnh đại diện"
                        className="size-full object-cover"
                        src={previewUrl}
                      />
                      <button
                        aria-label="Xóa ảnh"
                        className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm hover:text-foreground"
                        onClick={clearFile}
                        type="button"
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <Camera className="size-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    accept="image/*"
                    aria-describedby={errors.file ? "file-error" : undefined}
                    aria-invalid={!!errors.file}
                    className={cn(
                      "flex h-9 w-full cursor-pointer rounded-4xl border border-input bg-input/30 px-3 py-1 text-sm text-foreground file:me-3 file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground file:cursor-pointer placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
                      errors.file &&
                        "border-destructive ring-[3px] ring-destructive/20",
                    )}
                    disabled={loading}
                    id="profilePhoto"
                    name="file"
                    onChange={fileHandler}
                    ref={fileInputRef}
                    type="file"
                  />
                  {errors.file && (
                    <p
                      className="mt-1 text-xs text-destructive"
                      id="file-error"
                      role="alert"
                    >
                      {errors.file}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Hỗ trợ JPG, PNG, WEBP. Tối đa 5MB.
                  </p>
                </div>
              </div>
              {previewUrl && input.file?.name && (
                <p className="truncate text-xs text-muted-foreground">
                  {input.file.name}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <Button className="mt-6 w-full" disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Vui lòng chờ
            </>
          ) : (
            "Đăng ký"
          )}
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to="/login"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
