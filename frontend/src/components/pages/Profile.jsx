import { Mail, Pen, Phone } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { formatDate } from "@/utils/formatDate";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job);
  const [open, setOpen] = useState(false);

  const skills = user?.profile?.skills || [];

  const statusColors = {
    accepted: "bg-green-100 text-green-700",
    pending: "bg-gray-100 text-gray-700",
    rejected: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    accepted: "Chấp nhận",
    pending: "Đang chờ",
    rejected: "Từ chối",
  };

  return (
    <div className="max-w-4xl mx-auto my-6 sm:my-10 px-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
              <AvatarImage
                alt={user?.fullName}
                src={user?.profile?.profilePhoto}
              />
              <AvatarFallback className="text-xl sm:text-2xl bg-[#6A38C2] text-white">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">{user?.fullName}</h1>
              <p className="text-sm sm:text-base text-gray-600">
                {user?.profile?.bio || "Chưa có giới thiệu"}
              </p>
            </div>
          </div>
          <Button
            className="self-start sm:self-center"
            onClick={() => setOpen(true)}
            size="sm"
            variant="outline"
          >
            <Pen className="size-4 mr-1" />
            Chỉnh sửa
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <Mail className="size-4 shrink-0" />
            <a
              className="hover:text-[#6A38C2] hover:underline"
              href={`mailto:${user?.email}`}
            >
              {user?.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <Phone className="size-4 shrink-0" />
            <a
              className="hover:text-[#6A38C2] hover:underline"
              href={`tel:${user?.phoneNumber}`}
            >
              {user?.phoneNumber || "Chưa cung cấp"}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h2 className="font-semibold mb-3 text-base sm:text-lg">Kỹ năng</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <Badge
                  className="text-xs sm:text-sm"
                  key={skill}
                  variant="secondary"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Chưa có kỹ năng</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6 p-4 sm:p-6">
        <h2 className="font-bold text-base sm:text-lg mb-4">
          Việc làm đã ứng tuyển
        </h2>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((app) => (
              <div className="border rounded-lg p-3" key={app._id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">
                      {app.job?.title || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {app.job?.company?.name || "N/A"}
                    </p>
                  </div>
                  <Badge
                    className={`${statusColors[app.status] || statusColors.pending} text-xs`}
                  >
                    {statusLabels[app.status] || app.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400">
                  {formatDate(app.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              Chưa ứng tuyển công việc nào
            </p>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Table>
            <TableCaption>Các việc làm đã ứng tuyển gần đây</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Tên công việc</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.length > 0 ? (
                allAppliedJobs.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                    <TableCell className="font-medium">
                      {app.job?.title || "N/A"}
                    </TableCell>
                    <TableCell>{app.job?.company?.name || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          statusColors[app.status] || statusColors.pending
                        }
                      >
                        {statusLabels[app.status] || app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center text-gray-500" colSpan={4}>
                    Chưa ứng tuyển công việc nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
