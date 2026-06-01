import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";

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

const ActionPopover = ({ appId, statusHandler }) => {
  const [open, setOpen] = useState(false);

  const handleAction = (status) => {
    statusHandler(status, appId);
    setOpen(false);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <button
          className="w-full rounded px-2 py-1 text-left text-sm text-green-600 hover:bg-green-50"
          onClick={() => handleAction("accepted")}
          type="button"
        >
          Chấp nhận
        </button>
        <button
          className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-red-50"
          onClick={() => handleAction("rejected")}
          type="button"
        >
          Từ chối
        </button>
      </PopoverContent>
    </Popover>
  );
};

const ApplicantsTable = ({ applicants, statusHandler }) => {
  if (applicants.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">Chưa có ứng viên nào</p>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {applicants.map((app) => (
          <div className="border rounded-lg p-3" key={app._id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-sm">
                  {app.applicant?.fullName || "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  {app.applicant?.email || "N/A"}
                </p>
              </div>
              <Badge
                className={`${statusColors[app.status] || statusColors.pending} text-xs`}
              >
                {statusLabels[app.status] || app.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-400">
                {formatDate(app.createdAt)}
              </p>
              {app.status === "pending" && (
                <ActionPopover appId={app._id} statusHandler={statusHandler} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Ngày ứng tuyển</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((app) => (
              <TableRow key={app._id}>
                <TableCell className="font-medium">
                  {app.applicant?.fullName || "N/A"}
                </TableCell>
                <TableCell>{app.applicant?.email || "N/A"}</TableCell>
                <TableCell>{app.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>{formatDate(app.createdAt)}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`${statusColors[app.status] || statusColors.pending}`}
                  >
                    {statusLabels[app.status] || app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {app.status === "pending" && (
                    <ActionPopover
                      appId={app._id}
                      statusHandler={statusHandler}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ApplicantsTable;
