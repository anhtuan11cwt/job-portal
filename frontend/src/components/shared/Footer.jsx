import { Briefcase, GitBranch, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-border border-t">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link className="inline-flex items-center gap-2" to="/">
              <Briefcase className="size-6 text-brand-accent" />
              <span className="font-bold text-xl tracking-tight">
                Cổng <span className="text-brand-accent">việc làm</span>
              </span>
            </Link>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Nền tảng kết nối sinh viên và nhà tuyển dụng hàng đầu Việt Nam.
              Tìm kiếm cơ hội việc làm phù hợp với năng lực của bạn.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Liên kết</h3>
            <ul className="space-y-3 mt-4">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  to="/"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  to="/jobs"
                >
                  Việc làm
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  to="/browse"
                >
                  Tìm kiếm
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Hỗ trợ</h3>
            <ul className="space-y-3 mt-4">
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  to="/privacy"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  to="/terms"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm">Liên hệ</h3>
            <ul className="space-y-3 mt-4">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="size-4 shrink-0" />
                <span>support@congvieclam.vn</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="size-4 shrink-0" />
                <span>Bảo mật thông tin</span>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
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

        <div className="mt-10 pt-6 border-border border-t text-muted-foreground text-sm text-center">
          <p>&copy; {currentYear} Cổng việc làm. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
