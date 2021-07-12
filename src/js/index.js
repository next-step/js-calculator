const buttons = document.querySelectorAll('button');
const display = document.getElementById('total')

let operCheck = false;
let equalsCheck = true;
let res = "";
let count = 0

function displayNumber(number) {
  operCheck = true
  const current = display.value
  // 숫자가 들어왔을 때
  count += 1
  if (count > 3) {
    alert('숫자는 최대 3개 입력가능합니다.')
  }
  else {
    if (equalsCheck) {
      display.value = current === '0' ? number : display.value + number
      res += number;
    } else {
      equalsCheck = true;
      res = number;
      display.value  = res;
    }
   
  }
  
}

function operator(oper) {
  if (oper == '=') {
    calc()
  } else if (operCheck) {
    if (count >= 3) {
      alert("숫자는 최대 3개 입력 가능합니다.")
    } else {
      operCheck = false;
      res += oper;
      display.value += oper
      res = display.value
    }

  }
}
function calc() {
  if (display.value === '0' ) {
    clear()
  } else {
    if (!operCheck) {
      alert("다시 확인하기")
    } else {
      if (equalsCheck) {
        const final = eval(res.replace('X','*').replace('/','/')) 
        display.value = Math.floor(final);
        count = 0
        res = ''
        equalsCheck = false
      } else {
        clear()
      }
    }
  }
}
function clear() {
  res = ""
  display.value = "0"
  operCheck = false;
  equalsCheck = true;

}
function init() {
  buttons.forEach((button) => {
    button.addEventListener('click', function buttonClick() {
      switch (button.className) {
        case "modifier":
          clear();
          break
        case "operation":
          const oper = button.innerText;
          operator(oper);
          break;
        default:
          const number = button.innerText;
          displayNumber(number)
          break;
  
      }
    })
  })
}
init()