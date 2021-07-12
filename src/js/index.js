const numberCount = 0;
const total = document.getElementById('total');
const operatorCheck = true;


function add(char) {
    if (isNaN(char)) {
        if (this.numberCount == 0 && this.total.innerText == '0') {
            alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
        } else if (this.operatorCheck) {
            this.total.innerText += char;
            this.operatorCheck = false;
            this.numberCount = 0;
        } else {
            alert('연산자는 하나만 입력할 수 있습니다.');
        }

    } else if (this.total.innerText == '0') {
        console.log('0일때')
        this.total.innerText = char;
        this.numberCount = 1;
        this.operatorCheck = true;
    } else if (this.numberCount < 3) {
        console.log('3미만')
        this.total.innerText += char;
        this.numberCount += 1;
    } else if (this.numberCount >= 3) {
        alert('숫자는 세 자리까지만 입력 가능합니다!');
    }
}

function reset() {
    this.total.innerText = '0';
    this.numberCount = 0;
    this.operatorCheck = true;
}

function calculator() {
    const result = this.total.innerText.replace('X', '*');
    this.total.innerText = Math.floor(eval(result));
    this.numberCount = 0;
    this.operatorCheck = true;
}