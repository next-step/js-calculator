export class Operation {
  static operator;

  operate(a, b) {
    throw new Error("Not implemented");
  }
}

export class Sum extends Operation {
  static operator = "+";

  operate(a, b) {
    return a + b;
  }

  toString() {
    return Sum.operator;
  }
}
export class Subtract extends Operation {
  static operator = "-";

  operate(a, b) {
    return a - b;
  }

  toString() {
    return Subtract.operator;
  }
}

export class Multiple extends Operation {
  static operator = "X";

  operate(a, b) {
    return a * b;
  }

  toString() {
    return Multiple.operator;
  }
}

export class Divide extends Operation {
  static operator = "/";

  operate(a, b) {
    return Math.floor(a / b);
  }

  toString() {
    return Divide.operator;
  }
}

const OPERATION_MAP = {
  [Sum.operator]: Sum,
  [Subtract.operator]: Subtract,
  [Divide.operator]: Divide,
  [Multiple.operator]: Multiple,
};

export const getOperations = (operation) => {
  return OPERATION_MAP[operation];
};
