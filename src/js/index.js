let digits = document.querySelectorAll(".digit");
let acBtn = document.querySelector(".modifier");
let operatorBtn = document.querySelectorAll(".operation");
let numberCount = 1;

digits.forEach(function (digitBtn) {
  digitBtn.addEventListener("click", function () {
    let total = document.querySelector("#total");
    if (total.textContent === "0") {
      total.textContent = digitBtn.textContent;
    } else if (numberCount >= 3) {
      alert("숫자는 3자리까지 입력가능합니다.");
    } else {
      total.textContent += digitBtn.textContent;
      numberCount += 1;
    }
  });
});

acBtn.addEventListener("click", function () {
  document.querySelector("#total").textContent = "0";
  numberCount = 0;
});

operatorBtn.forEach(function (operator) {
  if (operator.textContent === "=") {
    operator.addEventListener("click", function () {
      let total = document.querySelector("#total");
      let result = Math.floor(eval(total.textContent.replace("X", "*")));
      document.querySelector("#total").textContent = result;
      numberCount = 0;
    });
  } else {
    operator.addEventListener("click", function () {
      let total = document.querySelector("#total");
      if (total === "0") {
        alert("숫자를 입력 후 눌러주세요");
      } else {
        total.textContent += operator.textContent;
        numberCount = 0;
      }
    });
  }
});
