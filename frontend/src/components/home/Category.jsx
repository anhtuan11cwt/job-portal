import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categories = [
  "Lập trình viên Frontend",
  "Lập trình viên Backend",
  "Lập trình viên Fullstack",
  "Nhà khoa học dữ liệu",
  "Kỹ sư DevOps",
  "Kỹ sư Machine Learning",
  "Kỹ sư AI",
  "An ninh mạng",
  "Quản lý sản phẩm",
  "Nhà thiết kế UI/UX",
  "Nhà thiết kế đồ họa",
  "Biên tập video",
];

const Category = () => {
  return (
    <div className="my-12 sm:my-20">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-[#6A38C2]">
        Danh mục
      </h1>
      <p className="text-center text-gray-600 mt-2 mb-6 sm:mb-8 text-sm sm:text-base">
        Khám phá thị trường việc làm đa dạng
      </p>

      <Carousel className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto">
        <CarouselContent className="-ml-2">
          {categories.map((category) => (
            <CarouselItem className="pl-2 basis-auto" key={category}>
              <Button
                className="rounded-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white text-xs sm:text-sm whitespace-nowrap"
                variant="outline"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default Category;
