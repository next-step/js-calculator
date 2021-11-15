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
    };

    const setOperation = (text) => {
        operationKey = text;
        isAfterOperationButtonClick = true;
    };

    const setCalculate = () => {
        currentValue = total.textContent;

        switch (operationKey) {
            case OPERATION.ADD:
                total.textContent = Number(previosValue) + Number(currentValue);
                break;
            case OPERATION.MINUS:
                total.textContent = Number(previosValue) - Number(currentValue);
                break;
            case OPERATION.MULTIPLY:
                total.textContent = Number(previosValue) * Number(currentValue);
                break;
            case OPERATION.DIVIDE:
                total.textContent = Math.floor(Number(previosValue) / Number(currentValue));
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
                setOperation(text);
                break;
        }
    };

    const onClickDigit = (text) => {
        if (total.textContent.length > 3) return;

        const splitedDigit = text.toString().split("");

        if (total.textContent === "0" || isAfterOperationButtonClick) {
            total.textContent = splitedDigit;
            isAfterOperationButtonClick = false;
        } else {
            total.textContent += splitedDigit;
        }
    };

    const onClickModifier = () => {
        total.textContent = "0";
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
