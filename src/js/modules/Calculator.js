export default function Calculator() {
  let attributes = {};
  let nums = [];
  let oper = [];  
  let index = 0;
  let res = 0;

  const operations = {
    '+': '+',
    '-': '-',
    'X': '*',
    '/': '/'    
  };

  const setNums = (val) => {
    nums = val;
  }
  const setOper = (val) => {
    oper = val;
  }
  const setIndex = (val) => {
    index = val;
  }
  const setRes = (val) => {
    res = val;
  }
  const increaseIndex = () => {
    index++;
  }

  const getAttributes = () => {
    const numpads = document.querySelector('.digits');
    const operations = document.querySelector('.operations');
    const display = document.querySelector('#total');
    const acBtn = document.querySelector('.modifier');

    return {
      numpads,
      operations,
      display,
      acBtn
    }
  }

  const calculate = () => {
    if(nums.length - 1 !== oper.length) {
      return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');      
    }

    res = nums.reduce((a,c) => {
      let temp;
      let op1 = Number(a);
      let op2 = Number(c);
      let op = oper.shift();
            
      switch(op) {
        case '+': temp = op1 + op2; break;
        case '-': temp = op1 - op2; break;
        case '/': temp = Math.floor(op1 / op2); break;
        case 'X': temp = op1 * op2; break;
      }
      return temp;
    });
    setRes(res);
    setDisplay(res);
  }

  const putNumber = (val) => {
    let num = nums[index];

    if(index === 0 && val === '0') {
      return;
    }

    if(!num) {
      nums[index] = val;
      appendDisplay(val);
      return;      
    }

    if(`${num}`.length >= 3) {   
      return alert('숫자는 세 자리까지 입력 가능합니다!');
    }

    nums[index] = `${num}${val}`;
    appendDisplay(val);
  };

  const putOperation = (val) => {
    if(nums.length - 1 !== oper.length) {
      return alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');      
    }

    oper.push(val);
    increaseIndex();
    appendDisplay(val);
  }

  const resetDisplay = () => {
    const {display} = attributes;
    display.innerText = 0;
  }

  const appendDisplay = (val) => {    
    const {display} = attributes;
    
    if(display.innerText === '0') {
      display.innerText = '';
    }

    display.innerText = `${display.innerText}${val}`;
  }

  const setDisplay = (val) => {
    const {display} = attributes;
    display.innerText = val;
  }

  const onClick = ({target}) => {      
    const val = target.innerText;
    
    if(!isNaN(Number(val))) {
      putNumber(val);
    } else if(operations[val]) {
      putOperation(val);
    } else if(val === '=') {
      calculate();
    }
  }
  
  const appendEvents = ({ numpads, operations, acBtn }) => {    
    operations.addEventListener('click', (e) => {      
      if(e.target === operations) {
        e.stopPropagation();
        return;
      }
      onClick(e);      
    });

    numpads.addEventListener('click', (e) => {      
      if(e.target === numpads) {
        e.stopPropagation();
        return;
      }
      onClick(e);
    });

    acBtn.addEventListener('click',() => {      
      setNums([]);
      setOper([]);
      setIndex(0);
      setRes(0);
      resetDisplay();
    });
  }

  const init = () => {
    attributes = getAttributes();
    appendEvents(attributes);
  }

  init();
}