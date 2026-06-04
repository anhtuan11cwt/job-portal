import { Briefcase, GitBranch, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-2 py-10 sm:px-4 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link className="inline-flex items-center gap-2" to="/">
              <Briefcase className="size-6 text-brand-accent" />
              <span className="text-xl font-bold tracking-tight">
                Cổng <span className="text-brand-accent">việc làm</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nền tảng kết nối sinh viên và nhà tuyển dụng hàng đầu Việt Nam.
              Tìm kiếm cơ hội việc làm phù hợp với năng lực của bạn.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Liên kết</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  to="/jobs"
                >
                  Việc làm
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  to="/browse"
                >
                  Tìm kiếm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Hỗ trợ</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  to="/privacy"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  to="/terms"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Liên hệ</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span>support@congvieclam.vn</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="size-4 shrink-0" />
                <span>Bảo mật thông tin</span>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  href="https://github.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitBranch className="size-4" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Cổng việc làm. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
