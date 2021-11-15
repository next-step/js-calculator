export const ALERT_MESSAGE = {
  INVALID_EXPRESSION: {
    EXCEEDED_OPERATION_COUNT: "연산자는 한 번에 하나씩만 입력할 수 있습니다.",
    NO_OPERATION: "완성되지 않은 수식입니다. 연산자를 입력해주세요.",
    NO_RIGHT_VALUE: "완성되지 않은 수식입니다. 숫자를 입력해주세요.",
  },
  EXCEEDED_MAX_DIGIT_COUNT: (maxCount) => `한 번에 ${maxCount}자리까지 입력할 수 있습니다.`,
};
