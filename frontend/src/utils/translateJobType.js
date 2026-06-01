const jobTypeMap = {
  Contract: "Hợp đồng",
  "Full-time": "Toàn thời gian",
  Internship: "Thực tập",
  "Part-time": "Bán thời gian",
  Remote: "Làm việc từ xa",
};

const translateJobType = (type) => {
  return jobTypeMap[type] || type;
};

export default translateJobType;
