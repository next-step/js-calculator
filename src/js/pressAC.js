import { input_flag, output, calculator } from "./index.js"

export const initPressAC = () =>{ 
        calculator.addEventListener("click", PressAC);
}

const PressAC = ({ target }) => {
    if (!target.classList.contains("modifier"))
        return ;
    input_flag[0] = 0;
    input_flag[1] = 0;
    input_flag[2] = 0;
    output.innerHTML = 0;
}