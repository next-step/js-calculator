import { input_flag, output, calculator } from "./index.js"
import { calculation } from "./calculation.js"
import { check_flag } from "./checkFlag.js"

const cal_op = document.querySelector(".operations");

export const initPressOperation = () => {
    cal_op.addEventListener("click", PressOperation);
}

const PressOperation = (e) =>{
    
    let operator = e.target.innerHTML
    let str = output.innerHTML;

    if (!input_flag[0])
        alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
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
    {
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
    else
        alert("이 계산기는 두 개의 수에 대한 계산만 가능합니다!");
}