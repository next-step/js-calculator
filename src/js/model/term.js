export class Term {
  _value = undefined;

  get value() {
    return this._value === undefined ? undefined : Number(this._value);
  }

  append(digit) {
    const nextValue = this._value === undefined ? `${digit}` : this._value + `${digit}`;
    if (nextValue.length > 3) {
      throw new Error("3자리 수 이상은 입력할 수 없습니다.");
    } else {
      this._value = nextValue;
    }
  }

  set value(num) {
    if (typeof num !== "number") {
      this._value = Number(num);
    } else {
      this._value = num;
    }
  }

  clear() {
    this._value = undefined;
  }
}
