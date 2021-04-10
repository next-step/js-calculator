import { input_flag, output, calculator } from "./index.js"

const cal_nums = document.querySelector(".digits");

export const initPressNumber = () => {
    cal_nums.addEventListener("click", PressNumber);
}

const PressNumber = (e) => {
    let num = e.target.innerHTML;
    if (output.innerHTML == "0")
    {
        input_flag[0]++;
        output.innerHTML = num;
    }
    else if ((input_flag[0] == 3 && !input_flag[1]) 
                || (input_flag[2] == 3 && input_flag[1]))
        alert("숫자는 세 자리까지만 입력 가능합니다!");
    else
    {
        if (!input_flag[1])
            input_flag[0]++;
        else
            input_flag[2]++;
        output.innerHTML += num;
    }
}