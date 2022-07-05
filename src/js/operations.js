import { NotImplementedError } from "./utils/error";

export class Operation {
  static operator;
  static instance;

  static getInstance() {
    throw new NotImplementedError();
  }

  operate(a, b) {
    throw new NotImplementedError();
  }
}

class Sum extends Operation {
  static operator = "+";

  static getInstance() {
    if (!Sum.instance) {
      Sum.instance = new Sum();
    }

    return Sum.instance;
  }

  operate(a, b) {
    return a + b;
  }

  toString() {
    return Sum.operator;
  }
}

class Subtract extends Operation {
  static operator = "-";

  static getInstance() {
    if (!Subtract.instance) {
      Subtract.instance = new Subtract();
    }

    return Subtract.instance;
  }

  operate(a, b) {
    return a - b;
  }

  toString() {
    return Subtract.operator;
  }
}

class Multiple extends Operation {
  static operator = "X";

  static getInstance() {
    if (!Multiple.instance) {
      Multiple.instance = new Multiple();
    }

    return Multiple.instance;
  }

  operate(a, b) {
    return a * b;
  }

  toString() {
    return Multiple.operator;
  }
}

class Divide extends Operation {
  static operator = "/";

  static getInstance() {
    if (!Divide.instance) {
      Divide.instance = new Divide();
    }

    return Divide.instance;
  }

  operate(a, b) {
    return Math.floor(a / b);
  }

  toString() {
    return Divide.operator;
  }
}

export const OPERATION_MAP = {
  [Sum.operator]: Sum.getInstance(),
  [Subtract.operator]: Subtract.getInstance(),
  [Divide.operator]: Divide.getInstance(),
  [Multiple.operator]: Multiple.getInstance(),
};

export const getOperations = (operation) => {
  return OPERATION_MAP[operation];
};
