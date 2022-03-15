export const ALERT_MESSAGE = {
    EXCEEDED_OPERATION_COUNT: "연산자는 한 번에 하나 씩만 입력하실 수 있어요.",
    NO_OPERATION: "완성되지 않은 수식입니다. 연산자를 입력해 주세요.",
    NO_RIGHT_VALUE: "완성되지 않은 수식입니다. 숫자를 입력해 주세요.",
    EXCEEDED_MAX_DIGIT_COUNT: (maxCount) => `한 번에 ${maxCount} 자리까지만 입력하실 수 있어요.`
  }