import {$, $$, addEvent} from '../utils/index.js';

export default function Calculator({ $app}) {
	const render = () => {
		$app.innerHTML = `
      <div class="calculator">
        <h1 id="total">0</h1>
        <div class="digits flex">
          <button class="digit">9</button>
          <button class="digit">8</button>
          <button class="digit">7</button>
          <button class="digit">6</button>
          <button class="digit">5</button>
          <button class="digit">4</button>
          <button class="digit">3</button>
          <button class="digit">2</button>
          <button class="digit">1</button>
          <button class="digit">0</button>
        </div>
        <div class="modifiers subgrid">
          <button class="modifier">AC</button>
        </div>
        <div class="operations subgrid">
          <button class="operation">/</button>
          <button class="operation">X</button>
          <button class="operation">-</button>
          <button class="operation">+</button>
          <button class="calculateOperator">=</button>
        </div>
      </div>
    </div>
		`
	}
  this.clickedBefore = 'operation';
  this.result = '';

  const calculate = () => {
    return (eval(this.result))
  };

  const isValidClick = (target) => {
    const targetType = target.className;
    if(targetType === 'operation' && this.clickedTypeBefore === 'operation'){
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      target.className !== this.clickedTypeBefore
      return false;
    }
    const digitList = this.result.split(/[^\d]/g);
    const lastDigit = digitList.pop();
    const lastDigitLength = lastDigit.length;
    console.log({digitList,lastDigitLength})

    if(lastDigitLength === 3 && targetType === 'digit') {
      alert("max 3자리"); return false;
    }

    // if(lastDigit[0] === '0') return false;
    
    target.className !== this.clickedTypeBefore
    this.clickedTypeBefore = targetType;
    return true;
  }

  this.handleClick = (e) => {
    const clicked = e.target.textContent;
    if(!isValidClick(e.target)) return;

    if(clicked === '='){
      this.result = calculate();
    } else if(this.result === '0') {
      this.result = clicked;
    } else if(!this.result && ['=','0'].includes(clicked) ){
      return;
    } else if (clicked === '*'){
      this.result += 'X'
    } else if(clicked === 'AC'){
      this.result = '0';
    } else{
      this.result += clicked;
    }
    $('#total').innerHTML = this.result;
  }

	const init = () => {
		render();
    
    addEvent($$('button'), 'click', this.handleClick);
	}

	init();
}