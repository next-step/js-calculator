(() => {
    const $app = document.getElementById("app");
    const $total = document.getElementById("total");

    $app.setAttribute("data-stored-digit", 0);
    $app.setAttribute("data-current-digit", 0);
    $app.setAttribute("data-stored-operation", "");

    $app.addEventListener("click", (e) => {
        const value = e.target.innerHTML;
        switch (e.target.className) {
            case "digit":
                digitHandler(Number(value));
                break;
            case "operation":
                operationHandler(value);
                break;
            case "modifier":
                modifierHandler();
                break;
            default:
                break;
        }
    })

    function digitHandler(digit) {
        const currentDigit = Number($app.getAttribute("data-current-digit"));
        if(currentDigit < 100) {
            const value = currentDigit === 0 ? digit : Number(`${currentDigit}${digit}`);
            $app.setAttribute("data-current-digit", value);
            $total.innerHTML = value;
        }
    }

    function operationHandler(operation) {
        const storedDigit = Number($app.getAttribute("data-stored-digit"));
        const currentDigit = Number($app.getAttribute("data-current-digit"));
        const storedOperation = $app.getAttribute("data-stored-operation");
        if(operation === "=") {
            switch (storedOperation) {
                case "/":
                    setResult(storedDigit / currentDigit);
                    break;
                case "X":
                    setResult(storedDigit * currentDigit);
                    break;
                case "-":
                    setResult(storedDigit - currentDigit);
                    break;
                case "+":
                    setResult(storedDigit + currentDigit);
                    break;
                default:
                    break;
            }
        } else {
            $app.setAttribute("data-stored-digit", currentDigit);
            $app.setAttribute("data-current-digit", 0);
            $app.setAttribute("data-stored-operation", operation);
        }
    }

    function modifierHandler() {
        $app.setAttribute("data-stored-digit", 0);
        $app.setAttribute("data-current-digit", 0);
        $app.setAttribute("data-stored-operation", "");
        $total.innerHTML = 0;
    }

    function setResult(number) {
        $app.setAttribute("data-stored-digit", number);
        $app.setAttribute("data-current-digit", 0);
        $app.setAttribute("data-stored-operation", "");
        $total.innerHTML = Math.floor(number);
    }
})()