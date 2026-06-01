import { Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";

const AdminJobTable = ({ filterByTitle }) => {
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);

  const filteredJobs = allAdminJobs.filter((job) =>
    job.title?.toLowerCase().includes(filterByTitle?.toLowerCase() || ""),
  );

  return (
    <>
      {filteredJobs.length <= 0 ? (
        <p className="text-center text-gray-500 mt-10">Chưa có công việc nào</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên công ty</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Ngày đăng</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">
                  {job.company?.name || "N/A"}
                </TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      size="sm"
                      variant="outline"
                    >
                      <Eye className="size-4 mr-1" />
                      Ứng viên
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AdminJobTable;
