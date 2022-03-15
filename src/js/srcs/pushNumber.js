import { $total, MAXIMUM_DIGITS_LENGTH, CALCULATOR_REGEX, ALERT_DIGIT_LENGTH } from "../utils/constant.js";

const checkDigitLength = () => {
    const total = $total.textContent;
    const operator = total.match(CALCULATOR_REGEX);
    if(!operator){
        return total.length < MAXIMUM_DIGITS_LENGTH;
    } else if(operator){
        return total.split(operator[0])[1].length < MAXIMUM_DIGITS_LENGTH
    }
}

export const onClickDigit = ({target}) => {
    const digit = target.textContent;
    if(!checkDigitLength()){
        return alert(ALERT_DIGIT_LENGTH);
    }

    if($total.textContent === '0'){
        $total.textContent = digit;
    } else {
        $total.textContent += digit;
    }
}
