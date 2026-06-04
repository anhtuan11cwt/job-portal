import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { clearFilters, setFilter } from "@/redux/jobSlice";

const filterData = [
  {
    key: "location",
    label: "Địa điểm",
    options: [
      "Hà Nội",
      "Hồ Chí Minh",
      "Đà Nẵng",
      "Hải Phòng",
      "Cần Thơ",
      "Biên Hòa",
      "Huế",
      "Nha Trang",
    ],
  },
  {
    key: "industry",
    label: "Ngành nghề",
    options: [
      "Lập trình viên Frontend",
      "Lập trình viên Backend",
      "Lập trình viên Fullstack",
      "Nhà khoa học dữ liệu",
      "Kỹ sư DevOps",
      "Kỹ sư AI/ML",
      "Nhà thiết kế UI/UX",
      "Quản lý sản phẩm",
    ],
  },
  {
    key: "salary",
    label: "Mức lương",
    options: [
      "0 - 50 triệu",
      "50 - 100 triệu",
      "100 - 200 triệu",
      "200 triệu+",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => store.job);

  const changeHandler = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  const clearAll = () => {
    dispatch(clearFilters());
  };

  const hasAnyFilter = filters.location || filters.industry || filters.salary;

  return (
    <div className="w-full bg-card p-4 rounded-2xl border border-border">
      <h2 className="font-bold text-lg">Lọc việc làm</h2>
      <hr className="mt-3 mb-4 border-border" />

      {filterData.map((section) => (
        <div className="mb-5" key={section.key}>
          <h3 className="font-semibold text-base mb-3">{section.label}</h3>
          <RadioGroup
            onValueChange={(value) => changeHandler(section.key, value)}
            value={filters[section.key]}
          >
            {section.options.map((item) => {
              const itemId = `id-${section.key}-${item}`;
              return (
                <div className="flex items-center gap-2 mb-2" key={item}>
                  <RadioGroupItem id={itemId} value={item} />
                  <Label
                    className="text-sm font-normal cursor-pointer"
                    htmlFor={itemId}
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}

      {hasAnyFilter && (
        <Button className="w-full mt-2" onClick={clearAll} variant="outline">
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
};

export default FilterCard;
