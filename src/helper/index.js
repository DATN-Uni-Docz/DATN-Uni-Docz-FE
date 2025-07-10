export const getUniqueFileName = (file, id) => {
  const extension = file.name.split(".").pop();
  const fileName = file.name.replace(`.${extension}`, "");
  return `${fileName}_${id}.${extension}`;
};

export const getParams = (params, options) => {
  options.forEach((option) => {
    if (!params[option]) delete params[option];
  });
  return params;
};

export const convertToMoney = (value) => {
  if (isNaN(value)) return;
  const money = Number(value)
    .toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    })
  return money;
};

export const convertUnit = (value) => {
  if(value >= 1000000) return (value / 1000000).toFixed(2) + "tr"
  if(value >= 1000) return (value / 1000).toFixed(1) + "k"
  return value;
}

export const generateAcademicYear = (startYear, endYear) => {
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(`${i}-${i + 1}`);
  }
  return years;
}

export const formatFileSize = (size) => {
  if (!size || size === 0) return '0 Bytes';
  const kb = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.floor(Math.log(size) / Math.log(kb));

  return parseFloat((size / Math.pow(kb, exponent)).toFixed(2)) + ' ' + sizes[exponent];
};