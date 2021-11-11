import { OPERATION, BUTTON_TYPE } from "./constants.js";

const total = document.getElementById("total");
const buttons = document.querySelectorAll("button");

(() => {
    let isAfterOperationButtonClick = false;
    let previosValue;
    let currentValue;
    let operationKey;

    const setPreviosValue = (text) => {
        previosValue = total.textContent;
        operationKey = text;
        isAfterOperationButtonClick = true;
    };

    const setCalculate = () => {
        currentValue = total.innerText;

        switch (operationKey) {
            case OPERATION.ADD:
                total.innerText = Number(previosValue) + Number(currentValue);
                break;
            case OPERATION.MINUS:
                total.innerText = Number(previosValue) - Number(currentValue);
                break;
            case OPERATION.MULTIPLY:
                total.innerText = Number(previosValue) * Number(currentValue);
                break;
            case OPERATION.DIVIDE:
                total.innerText = Math.floor(Number(previosValue) / Number(currentValue));
                break;
        }
    };

    const onClickOperation = (text) => {
        switch (text) {
            case OPERATION.EQUAL:
                setCalculate();
                break;
            default:
                setPreviosValue(text);
                break;
        }
    };

    const onClickDigit = (text) => {
        if (total.textContent.length > 3) return;

        if (total.textContent === "0" || isAfterOperationButtonClick) {
            total.innerText = text;
            isAfterOperationButtonClick = false;
        } else {
            total.innerText += text;
        }
    };

    const onClickModifier = () => {
        total.innerText = "0";
    };

    const onClickButton = (button) => {
        const buttonType = button.classList.value;
        const buttonText = button.textContent;

        switch (buttonType) {
            case BUTTON_TYPE.OPERARION:
                onClickOperation(buttonText);
                break;
            case BUTTON_TYPE.DIGIT:
                onClickDigit(buttonText);
                break;
            case BUTTON_TYPE.MODIFIER:
                onClickModifier();
                break;
        }
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => onClickButton(button));
    });
})();
