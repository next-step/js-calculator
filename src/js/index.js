import { initPressNumber } from "./pressNumber.js"
import { initPressOperation } from "./pressOperation.js"
import { initPressAC } from "./pressAC.js"

export const calculator = document.querySelector(".calculator");
export let output = document.querySelector("#total");
export var input_flag = [0, 0, 0];

const init = () => {
    initPressOperation();
    initPressAC();
    initPressNumber();
}

init();