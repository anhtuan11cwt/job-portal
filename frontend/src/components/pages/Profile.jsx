import { FileText, Mail, Pen, Phone } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [isResume] = useState(true);

  const skills = user?.profile?.skills || [];

  const appliedJobs = [
    {
      company: "Microsoft",
      date: "23-12-2024",
      status: "Đã chọn",
      title: "Kỹ sư phần mềm",
    },
    {
      company: "Google",
      date: "20-12-2024",
      status: "Đang chờ",
      title: "Lập trình viên Frontend",
    },
    {
      company: "Amazon",
      date: "15-12-2024",
      status: "Từ chối",
      title: "Lập trình viên Backend",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã chọn":
        return "bg-green-100 text-green-700";
      case "Đang chờ":
        return "bg-yellow-100 text-yellow-700";
      case "Từ chối":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            <span className="truncate">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <Phone className="size-4 shrink-0" />
            <span>{user?.phoneNumber || "Chưa cung cấp"}</span>
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

        {/* Resume */}
        <div className="my-5">
          <h2 className="font-semibold mb-3 text-base sm:text-lg">CV</h2>
          {isResume ? (
            <Link
              className="flex items-center gap-2 text-[#6A38C2] hover:underline text-sm sm:text-base"
              target="_blank"
              to={user?.profile?.resume || "#"}
            >
              <FileText className="size-4 shrink-0" />
              <span className="truncate">
                {user?.profile?.resumeOriginalName || "Tải CV"}
              </span>
            </Link>
          ) : (
            <span className="text-gray-500 text-sm">Không tìm thấy CV</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Table */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6 p-4 sm:p-6">
        <h2 className="font-bold text-base sm:text-lg mb-4">
          Việc làm đã ứng tuyển
        </h2>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {appliedJobs.map((job) => (
            <div
              className="border rounded-lg p-3"
              key={`${job.date}-${job.company}-${job.title}-${job.status}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.company}</p>
                </div>
                <Badge className={`${getStatusColor(job.status)} text-xs`}>
                  {job.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{job.date}</p>
            </div>
          ))}
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
              {appliedJobs.map((job) => (
                <TableRow
                  key={`${job.date}-${job.company}-${job.title}-${job.status}`}
                >
                  <TableCell>{job.date}</TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
