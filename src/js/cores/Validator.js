export default function Validator() {
  const validateBeforeInputNumber = (numbers, operators) => {
    if (
      numbers.at(-1).toString().length >= 3 &&
      numbers.length !== operators.length
    ) {
      alert('숫자는 세 자리까지만 입력 가능합니다!');

      return false;
    }

    return true;
  };

  const validateBeforeInputOperator = (numbers, operators) => {
    if (
      (numbers.length === 1 && numbers[0] === 0) ||
      numbers.length === operators.length
    ) {
      alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');

      return false;
    }

    return true;
  };

  return { validateBeforeInputNumber, validateBeforeInputOperator };
}
