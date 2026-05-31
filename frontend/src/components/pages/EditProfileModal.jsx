import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";

const EditProfileModal = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    bio: user?.profile?.bio || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);

      const res = await axios.put(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={submitHandler}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="fullName">
              Họ tên
            </Label>
            <Input
              className="col-span-3"
              id="fullName"
              name="fullName"
              onChange={changeEventHandler}
              value={input.fullName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="email">
              Email
            </Label>
            <Input
              className="col-span-3"
              id="email"
              name="email"
              onChange={changeEventHandler}
              type="email"
              value={input.email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="phoneNumber">
              Số điện thoại
            </Label>
            <Input
              className="col-span-3"
              id="phoneNumber"
              name="phoneNumber"
              onChange={changeEventHandler}
              value={input.phoneNumber}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="bio">
              Tiểu sử
            </Label>
            <Input
              className="col-span-3"
              id="bio"
              name="bio"
              onChange={changeEventHandler}
              value={input.bio}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="skills">
              Kỹ năng
            </Label>
            <Input
              className="col-span-3"
              id="skills"
              name="skills"
              onChange={changeEventHandler}
              placeholder="VD: React, Node.js, Python"
              value={input.skills}
            />
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="bg-black hover:bg-gray-900" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </Button>
            ) : (
              <Button className="bg-black hover:bg-gray-900" type="submit">
                Lưu thay đổi
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
