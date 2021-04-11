const OPERATIONS = {
  '+': function (x, y) {
    return x + y;
  },
  '-': function (x, y) {
    return x - y;
  },
  X: function (x, y) {
    return x * y;
  },
  '/': function (x, y) {
    return Math.trunc(x / y);
  },
};

export { OPERATIONS };
