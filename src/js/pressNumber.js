import { input_flag, output, calculator } from "./index.js"
import { ERR_MSG, INPUT_LENGTH } from "./utils.js"

export const initPressNumber = () => {
    calculator.addEventListener("click", PressNumber);
}

const PressNumber = ({ target }) => {
    if (!target.classList.contains("digit"))
        return ;
    let num = target.innerHTML;
    if (output.innerHTML == "0")
    {
        input_flag[0]++;
        output.innerHTML = num;
    }
    else if ((input_flag[0] == INPUT_LENGTH && !input_flag[1]) 
                || (input_flag[2] == INPUT_LENGTH && input_flag[1]))
        alert(ERR_MSG.INPUT_SIZE);
    else
    {
        if (!input_flag[1])
            input_flag[0]++;
        else
            input_flag[2]++;
        output.innerHTML += num;
    }
}