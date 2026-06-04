import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            to="/"
          >
            <Home className="size-3.5" />
            <span className="hidden sm:inline">Trang chủ</span>
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-1" key={item.href ?? item.label}>
            <ChevronRight className="size-3.5 shrink-0" />
            {item.href ? (
              <Link
                className="hover:text-foreground transition-colors"
                to={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
