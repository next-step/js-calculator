import { $total, ALERT_OPERATOR, CALCULATOR_REGEX } from "../utils/constant.js"
import { onCalculate } from "./pushCalculate.js"

export const onClickOperation = ({target}) => {
    const operator = target.textContent;
    const operatorCheck = CALCULATOR_REGEX.test($total.textContent);

    if(operator === '='){
        return onCalculate();
     }

    if($total.textContent === '0' || operatorCheck){
        return alert(ALERT_OPERATOR);
    }

    $total.textContent += operator;
}
