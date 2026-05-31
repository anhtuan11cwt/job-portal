import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-gray-200 border-t">
      <div className="mx-auto px-4 py-8 max-w-7xl">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4">
          <div className="md:text-left text-center">
            <h2 className="font-bold text-xl">
              Cổng <span className="text-[#f83002]">việc làm</span>
            </h2>
            <p className="mt-1 text-gray-500 text-sm">
              &copy; 2026 Bảo lưu mọi quyền.
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-600 text-sm">
            <Link
              className="hover:text-[#6A38C2] transition-colors"
              to="/privacy"
            >
              Chính sách bảo mật
            </Link>
            <Link
              className="hover:text-[#6A38C2] transition-colors"
              to="/terms"
            >
              Điều khoản dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
