import axios from "axios";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isRecruiter = user?.role === "recruiter";

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng xuất thất bại");
    }
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = isRecruiter
    ? [
        { label: "Công ty", path: "/admin/companies" },
        { label: "Việc làm", path: "/admin/jobs" },
      ]
    : [
        { label: "Trang chủ", path: "/" },
        { label: "Việc làm", path: "/jobs" },
        { label: "Tìm kiếm", path: "/browse" },
      ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="top-0 z-50 sticky bg-background/95 backdrop-blur-sm border-border border-b">
      <div className="flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 h-16">
        <Link className="shrink-0" to="/">
          <h1 className="font-bold text-2xl tracking-tight">
            Cổng <span className="text-brand-accent">việc làm</span>
          </h1>
        </Link>

        <nav
          aria-label="Chính"
          className="hidden md:flex md:items-center md:gap-10"
        >
          <ul className="flex items-center gap-1 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  aria-current={isActive(link.path) ? "page" : undefined}
                  className={cn(
                    "hover:bg-muted px-3 py-2 rounded-4xl text-sm transition-colors",
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground",
                  )}
                  to={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Button asChild size="sm" variant="outline">
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Đăng ký</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  aria-label="Menu tài khoản"
                  className="rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  type="button"
                >
                  <Avatar className="size-9 cursor-pointer">
                    <AvatarImage
                      alt={user?.fullName}
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">
                      {getUserInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage
                      alt={user?.fullName}
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">
                      {getUserInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                      {user?.profile?.bio || user?.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 mt-3 pt-3 border-border border-t">
                  {!isRecruiter && (
                    <Button
                      asChild
                      className="justify-start gap-2 w-full"
                      variant="ghost"
                    >
                      <Link to="/profile">
                        <User2 className="size-4" />
                        Xem hồ sơ
                      </Link>
                    </Button>
                  )}
                  <Button
                    className="justify-start gap-2 w-full text-destructive hover:text-destructive"
                    onClick={logoutHandler}
                    variant="ghost"
                  >
                    <LogOut className="size-4" />
                    Đăng xuất
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
          className="md:hidden hover:bg-muted p-2 rounded-4xl text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-border border-t">
          <nav className="px-6 py-4">
            <ul className="flex flex-col gap-1 font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    aria-current={isActive(link.path) ? "page" : undefined}
                    className={cn(
                      "block hover:bg-muted px-3 py-2 rounded-4xl text-sm transition-colors",
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                    to={link.path}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Button asChild className="w-full" variant="outline">
                    <Link onClick={() => setIsOpen(false)} to="/login">
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link onClick={() => setIsOpen(false)} to="/register">
                      Đăng ký
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-3 border-border border-t">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage
                        alt={user?.fullName}
                        src={user?.profile?.profilePhoto}
                      />
                      <AvatarFallback className="bg-primary/10 font-medium text-primary text-xs">
                        {getUserInitials(user?.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user?.fullName}</p>
                      <p className="text-muted-foreground text-xs">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!isRecruiter && (
                      <Button
                        asChild
                        className="justify-start gap-2"
                        variant="ghost"
                      >
                        <Link onClick={() => setIsOpen(false)} to="/profile">
                          <User2 className="size-4" />
                          Xem hồ sơ
                        </Link>
                      </Button>
                    )}
                    <Button
                      className="justify-start gap-2 text-destructive hover:text-destructive"
                      onClick={logoutHandler}
                      variant="ghost"
                    >
                      <LogOut className="size-4" />
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
