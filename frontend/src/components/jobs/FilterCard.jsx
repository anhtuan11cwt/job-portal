import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    array: [
      "Hà Nội",
      "Hồ Chí Minh",
      "Đà Nẵng",
      "Hải Phòng",
      "Cần Thơ",
      "Biên Hòa",
      "Huế",
      "Nha Trang",
    ],
    filterType: "Địa điểm",
  },
  {
    array: [
      "Lập trình viên Frontend",
      "Lập trình viên Backend",
      "Lập trình viên Fullstack",
      "Nhà khoa học dữ liệu",
      "Kỹ sư DevOps",
      "Kỹ sư AI/ML",
      "Nhà thiết kế UI/UX",
      "Quản lý sản phẩm",
    ],
    filterType: "Ngành nghề",
  },
  {
    array: ["0 - 50 triệu", "50 - 100 triệu", "100 - 200 triệu", "200 triệu+"],
    filterType: "Mức lương",
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    dispatch(setSearchedQuery(value));
  };

  return (
    <div className="w-full bg-card p-4 rounded-2xl border border-border">
      <h2 className="font-bold text-lg">Lọc việc làm</h2>
      <hr className="mt-3 mb-4 border-border" />

      <RadioGroup onValueChange={changeHandler}>
        {filterData.map((data) => (
          <div className="mb-5" key={data.filterType}>
            <h3 className="font-semibold text-base mb-3">{data.filterType}</h3>
            {data.array.map((item) => {
              const itemId = `id-${data.filterType}-${item}`;
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
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
