
const digitArr = document.querySelectorAll(".digit");
const operArr = document.querySelectorAll(".operation");
const modifier = document.querySelector(".modifier");
const total = document.querySelector("#total");

class Calculator{

    constructor({digitArr, operArr, modifier, total}){
        this.total = total;
        this.init();

        digitArr.forEach(digit => digit.addEventListener('click', (e) => {
            const num = e.currentTarget.textContent;
            
            if(this.validDigit()) {
                this.store.setDigitStack(num);
            }

        }));

        operArr.forEach(oper => {
            oper.addEventListener('click', (e)=> {
                const operation = e.currentTarget.textContent;

                if(this.validOperation(operation)) {
                    switch(operation){
                        //division
                        case "/":
                            this.store.setEquationStack("/");
                            break;
                        //multiply
                        case "X":
                            this.store.setEquationStack("X");
                            break;
                        //minus
                        case "-":
                            this.store.setEquationStack("-");
                            break;
                        //plus
                        case "+":
                            this.store.setEquationStack("+");
                            break;
                        //equals
                        case "=":
                            this.calculate();
                            break;
                    }
                }
            });

        });

        modifier.addEventListener('click', (e) => {
            this.store.allClear();
        });
    }

    init(){
        this.store = {
            digitStack : [],
            equationStack : [],
            setDigitStack : digit => {
                this.store.digitStack.push(digit);
                this.display();
            },
            setEquationStack : oper => {
                const num = this.store.digitStack.join('');
                this.store.digitStack = [];
                this.store.equationStack.push(num);
                this.store.equationStack.push(oper);
                this.display();
            },
            allClear : () => {
                this.store.digitStack = [];
                this.store.equationStack = [];
                this.total.textContent = 0;
            },
        };
    }
    calculate(){
        if(this.store.equationStack.length === 2) {
            const prev = Number.parseInt(this.store.equationStack[0]);
            const oper = this.store.equationStack[1];
            const next = Number.parseInt(this.store.digitStack.join(''));
            this.store.allClear();
            switch(oper){
                //division
                case "/":
                    this.display(Math.floor(prev/next));
                    break;
                //multiply
                case "X":
                    this.display(prev*next);
                    break;
                //minus
                case "-":
                    this.display(prev-next);
                    break;
                //plus
                case "+":
                    this.display(prev+next);
                    break;
            }
        }
    }

    validDigit(){
        
        if(this.store.digitStack.length == 3) {
            alert('숫자는 세 자리까지만 입력가능합니다!');
            return false;
        }


        return true;
    };

    validOperation(oper) {
        if((oper === '/' || oper === '+' || oper === '-' || oper === 'X') && this.store.digitStack.length === 0) {
            alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
            return false;
        } else if(this.store.digitStack.length === 0) {
            return false;
        } else if(this.store.equationStack.length === 2 && oper !== '=') {
            return false;
        }

        return true;
    };


    display(result) {

        if(result || result === 0) {
            this.total.textContent = result;
        } else {
            const str = this.store.equationStack.join('') + this.store.digitStack.join('');
            this.total.textContent = str ? str : 0;
        }
        
    };

}


new Calculator({digitArr, operArr, modifier, total});
