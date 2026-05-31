const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(numericValue);
};

export default formatCurrency;
