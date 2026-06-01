import axios from "axios";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Cổng <span className="text-[#f83002]">việc làm</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6">
            {isRecruiter ? (
              <>
                <li>
                  <Link to="/admin/companies">Công ty</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Việc làm</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/jobs">Việc làm</Link>
                </li>
                <li>
                  <Link to="/browse">Tìm kiếm</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    alt={user?.fullName}
                    src={user?.profile?.profilePhoto}
                  />
                  <AvatarFallback>
                    {getUserInitials(user?.fullName)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      alt={user?.fullName}
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback>
                      {getUserInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mt-4 text-gray-600">
                  {!isRecruiter && (
                    <Link to="/profile">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">Xem hồ sơ</Button>
                      </div>
                    </Link>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
          <ul className="flex flex-col font-medium gap-4 mb-4">
            {isRecruiter ? (
              <>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/admin/companies">
                    Công ty
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/admin/jobs">
                    Việc làm
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/jobs">
                    Việc làm
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setIsOpen(false)} to="/browse">
                    Tìm kiếm
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link onClick={() => setIsOpen(false)} to="/login">
                <Button className="w-full" variant="outline">
                  Đăng nhập
                </Button>
              </Link>
              <Link onClick={() => setIsOpen(false)} to="/register">
                <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border-t pt-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage
                    alt={user?.fullName}
                    src={user?.profile?.profilePhoto}
                  />
                  <AvatarFallback>
                    {getUserInitials(user?.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user?.fullName}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-gray-600">
                {!isRecruiter && (
                  <Link onClick={() => setIsOpen(false)} to="/profile">
                    <Button className="justify-start px-0" variant="link">
                      Xem hồ sơ
                    </Button>
                  </Link>
                )}
                <Button
                  className="justify-start px-0 text-red-500"
                  onClick={logoutHandler}
                  variant="link"
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
