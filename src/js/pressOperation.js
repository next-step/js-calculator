import { input_flag, output, calculator } from "./index.js"
import { calculation } from "./calculation.js"
import { check_flag } from "./checkFlag.js"
import { ERR_MSG } from "./utils.js"

export const initPressOperation = () => {
        calculator.addEventListener("click", PressOperation);
}

const PressOperation = ({ target }) =>{
    if (!target.classList.contains("operation"))
        return ;
    let operator = target.innerHTML
    let str = output.innerHTML;

    if (!input_flag[0])
        alert(ERR_MSG.OP_INPUT_ORDER);
    else if(operator != "=" && input_flag[0] && !input_flag[1])
    {
        output.innerHTML += operator;
        input_flag[1] = 1;
    }
    else if(operator != "=" && input_flag[1] && !input_flag[2])
    {
        str = str.substr(0, str.length - 1) + operator;
        output.innerHTML = str;
    }
    else if (operator == "=")
        PressEqual(str);
    else
        alert(ERR_MSG.INPUT_ONLYTWO);
}

const PressEqual = (str) => {
    let arr = [];
    let op_cnt;
    let minus = "";
    let matchres

    if (!input_flag[1])
    {
        output.innerHTML = str;
        return ;
    }

    if (str[0] == '-')
    {
        minus = "-";
        str = str.substring(1);
    }

    op_cnt = str.match(/[\+\-X\/]/g);
    if (op_cnt.length == 1)
        matchres = str.lastIndexOf(op_cnt[0]);
    else if (op_cnt.length == 2)
        matchres = str.lastIndexOf(op_cnt[1]);

    arr.push(minus + str.substring(0, matchres));
    arr.push(str.substring(matchres + 1));
    arr.push(str[matchres]);
    output.innerHTML = calculation(arr);

    check_flag(output.innerHTML);
}