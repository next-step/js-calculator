export const validateNumber = (value, digit) => {
  if (value.length === 0 && digit === "0") {
    return "0";
  }

  // 세 자리 이상일 떄
  if (value.length > 2) {
    return value;
  }

  return value + digit;
};
