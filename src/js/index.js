
const digitArr = document.querySelectorAll(".digit");
const operArr = document.querySelectorAll(".operation");
const modifier = document.querySelector(".modifier");
const total = document.querySelector("#total");

const display = (result) => {

    if(result || result === 0) {
        total.textContent = result;
    } else {
        const str = store.equationStack.join('') + store.digitStack.join('');
        total.textContent = str ? str : 0;
    }
    
};

const store = {
    digitStack : [],
    equationStack : [],
    setDigitStack : digit => {
        store.digitStack.push(digit);
        display();
    },
    setEquationStack : oper => {
        const num = store.digitStack.join('');
        store.digitStack = [];
        store.equationStack.push(num);
        store.equationStack.push(oper);
        display();
    },
    calculate : () => {
        if(store.equationStack.length === 2) {
            const prev = Number.parseInt(store.equationStack[0]);
            const oper = store.equationStack[1];
            const next = Number.parseInt(store.digitStack.join(''));
            store.allClear();
            switch(oper){
                //division
                case "/":
                    display(Math.floor(prev/next));
                    break;
                //multiply
                case "X":
                    display(prev*next);
                    break;
                //minus
                case "-":
                    display(prev-next);
                    break;
                //plus
                case "+":
                    display(prev+next);
                    break;
            }
        }
    },
    allClear : () => {
        store.digitStack = [];
        store.equationStack = [];
        total.textContent = 0;
    },
};

const validDigit = () => {
    
    if(store.digitStack.length == 3) {
        alert('숫자는 세 자리까지만 입력가능합니다!');
        return false;
    }


    return true;
};

const validOperation = oper => {
    if((oper === '/' || oper === '+' || oper === '-' || oper === 'X') && store.digitStack.length === 0) {
        alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
        return false;
    } else if(store.digitStack.length === 0) {
        return false;
    } else if(store.equationStack.length === 2 && oper !== '=') {
        return false;
    }

    return true;
};


digitArr.forEach(digit => digit.addEventListener('click', (e) => {
    const num = e.currentTarget.textContent;
    
    if(validDigit()) {
        store.setDigitStack(num);
    }

}));

operArr.forEach(oper => {
    oper.addEventListener('click', (e)=> {
        const operation = e.currentTarget.textContent;

        if(validOperation(operation)) {
            switch(operation){
                //division
                case "/":
                    store.setEquationStack("/");
                    break;
                //multiply
                case "X":
                    store.setEquationStack("X");
                    break;
                //minus
                case "-":
                    store.setEquationStack("-");
                    break;
                //plus
                case "+":
                    store.setEquationStack("+");
                    break;
                //equals
                case "=":
                    store.calculate();
                    break;
            }
        }
    });

});

modifier.addEventListener('click', (e) => {
    store.allClear();
});