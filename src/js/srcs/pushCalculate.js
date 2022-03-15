import { $total, CALCULATOR_REGEX } from "../utils/constant.js"

export const onCalculate = () => {
    const operator = $total.textContent.match(CALCULATOR_REGEX)[0];
    const numOne = Number($total.textContent.split(operator)[0]);
    const numTwo = Number($total.textContent.split(operator)[1]);
    switch (operator) {
        case '-':
            $total.textContent = numOne - numTwo
            break;
        
        case '+':
            $total.textContent = numOne + numTwo
            break;
        
        case 'X':
            $total.textContent = numOne * numTwo
            break;
        
        case '/':
            $total.textContent = Math.floor((numOne) / (numTwo))
            break;
    }
}
