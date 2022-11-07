import {handleClickValue} from "./calculator.js.js";
import {$} from "./utils/selector.js";

export const $calculator = $(".calculator");
export const $total = $("#total");

// dom contact
$calculator.addEventListener("click", handleClickValue);
