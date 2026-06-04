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
import { cn } from "@/lib/utils";
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
    pending: "bg-muted text-muted-foreground",
    rejected: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    accepted: "Chấp nhận",
    pending: "Đang chờ",
    rejected: "Từ chối",
  };

  return (
    <div className="mx-auto my-6 sm:my-10 px-2 sm:px-4 lg:px-6 max-w-7xl">
      <div className="bg-card p-4 sm:p-6 border border-border rounded-2xl">
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <Avatar className="w-16 sm:w-24 h-16 sm:h-24">
              <AvatarImage
                alt={user?.fullName}
                src={user?.profile?.profilePhoto}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl">
                {user?.fullName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-lg sm:text-xl">{user?.fullName}</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
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
            <Pen className="mr-1 size-4" />
            Chỉnh sửa
          </Button>
        </div>

        <div className="space-y-3 my-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
            <Mail className="size-4 shrink-0" />
            <a
              className="hover:text-primary hover:underline"
              href={`mailto:${user?.email}`}
            >
              {user?.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
            <Phone className="size-4 shrink-0" />
            <a
              className="hover:text-primary hover:underline"
              href={`tel:${user?.phoneNumber}`}
            >
              {user?.phoneNumber || "Chưa cung cấp"}
            </a>
          </div>
        </div>

        <div className="my-5">
          <h2 className="mb-3 font-semibold text-base sm:text-lg">Kỹ năng</h2>
          <div className="flex flex-wrap items-center gap-2">
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
              <span className="text-muted-foreground text-sm">
                Chưa có kỹ năng
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card mt-6 p-4 sm:p-6 border border-border rounded-2xl">
        <h2 className="mb-4 font-bold text-base sm:text-lg">
          Việc làm đã ứng tuyển
        </h2>

        <div className="sm:hidden space-y-3">
          {allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((app) => (
              <div
                className="p-3 border border-border rounded-xl"
                key={app._id}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">
                      {app.job?.title || "N/A"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {app.job?.company?.name || "N/A"}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      statusColors[app.status] || statusColors.pending,
                      "text-xs",
                    )}
                  >
                    {statusLabels[app.status] || app.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground/60 text-xs">
                  {formatDate(app.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-center">
              Chưa ứng tuyển công việc nào
            </p>
          )}
        </div>

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
                        className={cn(
                          statusColors[app.status] || statusColors.pending,
                        )}
                      >
                        {statusLabels[app.status] || app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="text-muted-foreground text-center"
                    colSpan={4}
                  >
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
