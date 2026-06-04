import { Building2, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    if (searchQuery.trim()) {
      navigate(`/browse?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 my-10 text-center">
      <div className="flex items-center justify-center gap-2">
        <Building2 className="size-5 text-primary" />
        <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-muted text-brand-accent font-medium text-xs sm:text-sm">
          Trang web tìm việc số 1
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        Tìm kiếm, Ứng tuyển & <br className="hidden sm:block" />
        Nhận <span className="text-primary">Công việc mơ ước</span>
      </h2>

      <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
        Bắt đầu hành trình tìm kiếm cơ hội nghề nghiệp thay đổi cuộc sống.{" "}
        <br className="hidden md:block" />
        Tìm công việc mơ ước từ hàng ngàn tin tuyển dụng tại các công ty hàng
        đầu.
      </p>

      <div className="flex items-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-border rounded-full p-2 sm:p-3 gap-2 sm:gap-4 mx-auto">
        <Input
          className="border-none outline-none shadow-none focus-visible:ring-0 text-sm sm:text-base"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm công việc mơ ước"
          type="text"
          value={searchQuery}
        />
        <Button
          aria-label="Tìm kiếm"
          className="rounded-full shrink-0"
          onClick={searchHandler}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
