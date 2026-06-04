import { motion } from "framer-motion";
import { Bookmark, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import formatCurrency from "@/utils/formatCurrency";
import translateJobType from "@/utils/translateJobType";

const JobCard = ({ job, index = 0 }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.button
      animate={{ opacity: 1, x: 0 }}
      className="p-4 sm:p-5 rounded-2xl shadow-sm bg-card border border-border cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left"
      initial={{ opacity: 0, x: 100 }}
      onClick={() => navigate(`/description/${job?._id}`)}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      type="button"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Hôm nay"
            : `${daysAgoFunction(job?.createdAt)} ngày trước`}
        </p>
        <div className="rounded-full size-8 sm:size-9">
          <Bookmark className="size-3 sm:size-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-3 my-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center text-xs sm:text-sm font-bold text-primary">
          {job?.company?.name?.[0] || "C"}
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg">
            {job?.company?.name}
          </h3>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
            <MapPin className="size-3" />
            <span>{job?.location || "Việt Nam"}</span>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-lg sm:text-xl my-2">{job?.title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
        {job?.description}
      </p>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge
          className={cn(
            "font-bold text-xs",
            "bg-primary/10 text-primary hover:bg-primary/20",
          )}
        >
          {job?.position} Vị trí
        </Badge>
        <Badge
          className={cn(
            "font-bold text-xs",
            "bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20",
          )}
        >
          {translateJobType(job?.jobType)}
        </Badge>
        <Badge
          className={cn(
            "font-bold text-xs",
            "bg-[#7209b7]/10 text-[#7209b7] hover:bg-[#7209b7]/20",
          )}
        >
          {formatCurrency(job?.salary)}
        </Badge>
      </div>
    </motion.button>
  );
};

export default JobCard;
