import {handleClickValue} from "./calculator.js.js";
import {$} from "./utils/selector.js";

const $calculator = $(".calculator");
$calculator.addEventListener("click", handleClickValue);
