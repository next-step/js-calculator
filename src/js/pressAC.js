import { input_flag, output, calculator } from "./index.js"

const cal_ac = document.querySelector(".modifiers");

export const initPressAC = () =>{
    cal_ac.addEventListener("click", PressAC);
}

const PressAC = () => {
    input_flag.fill(0);
    output.innerHTML = 0;
}