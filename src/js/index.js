import { $get, checkOnlyNum } from './utils.js'

window.addEventListener('DOMContentLoaded', init)

function init() {
	new Calculator()
}

class Calculator {
	constructor() {
		this.setElements()
		this.setEvents()
	}

	setElements() {
		this.$modifier = $get('.modifier')
		this.$total = $get('#total')
		this.$digits = $get('.digits')
		this.$operations = $get('.operations')
	}

	setEvents() {
		this.$digits.addEventListener('click', (e) => {
			this.clickDigit(e)
		})

		this.$operations.addEventListener('click', (e) => {
			this.clickOperation(e)
		})

		this.$modifier.addEventListener('click', (e) => {
			console.log(e)
			this.$total.innerText = "0"
		})
	}

	clickDigit(e) {
		const digit = e.target.closest('.digit').innerText

		if (this.$total.innerText === '0') {
			this.$total.innerText = digit
			return
		}

		this.$total.innerText += digit
	
	}

	handleOnInput() {
		if(this.$total.length > 3)  {
		  alert("입력숫자는 최대 3자리수까지만 가능합니다.")
		}
	  }


	clickOperation(e) {
		const operation = e.target.closest('.operation').innerText

		if (operation === '=') {
			this.calculate()
			return
		}

		if (!checkOnlyNum(this.$total.innerText)) return
		this.$total.innerText += operation
	}

	calculate() {
		this.$total.innerText = eval(this.$total.innerText)
	}

}
// $(function() {
//     $(".digit").on("click", function(char){
//         add(char);
//     })
// })


// $(function() {
//     $(".a2").on("click", function(){
//         reset();
//     })
// })

// $(function() {
//     $(".a3").on("click", function(){
//         add('/');
//     })
// })

// //식이아닌 문자열입력방지장치 : 이전눌렀던 값이 숫자이면 true, 아니면 false;
// var numberClicked = false; //전역변수

// function add(char) {

//       //숫자나 연산자 버튼을 누르면, add함수가 호출되고, 사용자가 누른값이 char에 들어감
//   if (numberClicked == false) {
//     if(isNaN(char) ==true) {

//     } else { //연산자가 아니라면
//       document.getElementById('display').value += char;
//   }
//   //숫자,연산자 태그에 onclick 속성을 부여해 식을 입력받아보자
//   //"="를 누르면 id가 display인 <input>태그에서 식을 받아서 계산을 하고, id가 result인 <input>에 그 값을 출력합니다.

// } else {
//   document.getElementById('display').value += char;
// }
// }

// function calculate() {
//   var display = document.getElementById('display');
//   var result = eval(display.value);
//   document.getElementById('display').value = result;

// }

// //초기화 함수명은 clear를 사용할수없다 js내장함수명중 clear 존재하기때문.
// function reset() {
//   document.getElementById('display').value = "";
//   document.getElementById('result').value = "";
// }