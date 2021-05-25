const $ = (target) => document.querySelector(target);

const app = (target) => {
  let _operator = "";
  let _prevDigits = "";
  let _curDigits = "";
  let dividedBy0 = false;

  const calculate = (prev, cur, operator) => {
    const currentNum = cur ? parseInt(cur) : 0;
    const previousNum = parseInt(prev);
    switch (operator) {
      case "+":
        return previousNum + currentNum;
      case "-":
        return previousNum - currentNum;
      case "X":
        return previousNum * currentNum;
      case "/":
        if (currentNum === 0) {
          dividedBy0 = true;
        }
        return previousNum / currentNum;
    }
    return 0;
  };

  const render = () => {
    if (_prevDigits) {
      target.innerHTML = `${_prevDigits}${_operator}${_curDigits}`;
      return;
    }
    if (_curDigits) {
      target.innerHTML = `${_curDigits}${_operator}`;
      return;
    }
    target.innerHTML = "0";
  };

  const onClickDigit = (e) => {
    if (e.target.classList.contains("digit")) {
      if (_curDigits.length >= 3 || dividedBy0) {
        alert("숫자는 세 자리까지만 입력 가능합니다!");
        return;
      }
      const digit = e.target.innerHTML;
      if (_curDigits === "0") {
        _curDigits = "";
      }
      _curDigits += digit;
      render();
    }
  };

  const onClickOperator = (e) => {
    if (e.target.classList.contains("operation")) {
      const target = e.target.innerHTML;
      if (target === "=") {
        const result = parseInt(
          calculate(_prevDigits, _curDigits, _operator),
          10
        );
        _prevDigits = "";
        _operator = "";
        _curDigits = result + "";
        render();
        return;
      }
      if (!_curDigits || dividedBy0) {
        alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
        return;
      }
      _operator = target;
      _prevDigits = _curDigits;
      _curDigits = "";
      render();
    }
  };

  const onClickAC = (e) => {
    if (e.target.classList.contains("modifier")) {
      _prevDigits = "";
      _curDigits = "";
      _operator = "";
      dividedBy0 = false;
    }
    render();
  };
  return { onClickDigit, onClickOperator, onClickAC };
};

const init = () => {
  const renderTarget = $("#total");
  const { onClickDigit, onClickOperator, onClickAC } = app(renderTarget);
  $(".digits").addEventListener("click", onClickDigit);
  $(".operations").addEventListener("click", onClickOperator);
  $(".modifiers").addEventListener("click", onClickAC);
};
document.addEventListener("DOMContentLoaded", init);
