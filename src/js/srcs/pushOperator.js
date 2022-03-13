import { $total, ALERT_OPERATOR, CALCULATOR_REGEX, ALERT_OPERATOR_EXCESS } from "../utils/constant.js"
import { onCalculate } from "./pushCalculate.js"

export const onClickOperation = ({target}) => {
    const operator = target.textContent;
    const operatorCheck = CALCULATOR_REGEX.test($total.textContent);

    if(operator === '='){
        return onCalculate();
     }

    if($total.textContent === '0'){
        return alert(ALERT_OPERATOR);
    }

    if(operatorCheck){
        return alert(ALERT_OPERATOR_EXCESS);
    }

    $total.textContent += operator;
}
