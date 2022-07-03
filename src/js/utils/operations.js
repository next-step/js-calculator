export class Operation {
  operate(a, b) {
    throw new Error("Not implemented");
  }
}

export class Sum extends Operation {
  operate(a, b) {
    return a + b;
  }

  toString() {
    return "+";
  }
}
export class Subtract extends Operation {
  operate(a, b) {
    return a - b;
  }

  toString() {
    return "-";
  }
}

export class Multiple extends Operation {
  operate(a, b) {
    return a * b;
  }

  toString() {
    return "X";
  }
}

export class Divide extends Operation {
  operate(a, b) {
    return Math.floor(a / b);
  }

  toString() {
    return "/";
  }
}

const OPERATION_MAP = {
  "/": Divide,
  X: Multiple,
  "-": Subtract,
  "+": Sum,
};

export const getOperations = (operation) => {
  return OPERATION_MAP[operation];
};
