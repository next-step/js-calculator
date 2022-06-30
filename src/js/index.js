const $total = document.getElementById("total");
const $digits = document.getElementsByClassName("digits");
const $operations = document.getElementsByClassName("operations");
const $allClear = documen.getElementsByClassName("modifiers");

$digits.addEventListener("click", clickDigit);
$operations.addEventListener("click", clickOperation);
$allClear.addEventListener("click", clickAllClear);
