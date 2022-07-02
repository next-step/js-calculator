export class Operation {
  operate(a, b) {
    throw new Error("Not implemented");
  }
}

export class Sum extends Operation {
  operate(a, b) {
    return a + b;
  }
}
export class Subtract extends Operation {
  operate(a, b) {
    return a - b;
  }
}

export class Multiple extends Operation {
  operate(a, b) {
    return a * b;
  }
}

export class Divide extends Operation {
  operate(a, b) {
    return Math.floor(a / b);
  }
}
