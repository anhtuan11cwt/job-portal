import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const CompanyTable = ({ filterByName }) => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(filterByName?.toLowerCase() || ""),
  );

  return (
    <>
      {filteredCompanies.length <= 0 ? (
        <p className="text-center text-muted-foreground mt-10">
          Chưa có công ty nào
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Tên công ty</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="size-10">
                    <AvatarImage alt={company.name} src={company.logo} />
                    <AvatarFallback>
                      {company.name?.[0]?.toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{formatDate(company.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    aria-label={`Chỉnh sửa ${company.name}`}
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CompanyTable;
