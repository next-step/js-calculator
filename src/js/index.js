import Expression from "./Expression.js"


const selectElements = (query) => {
    return document.querySelectorAll(query);
}

const selectElement = (query) => {
    return document.querySelector(query);
}

const setClickEvts = (elements, callback) => {
    elements.forEach(element => {
        element.addEventListener('click', callback())
    });
}

window.onload = ()=>{
    const expression = new Expression();

    const total = selectElement('#total');
    const setTotal = (text) =>{
        total.innerText=text;
    }

    const getOperand = () =>{
        return (event) => {
            expression.getOperand(event.target.innerText);
            setTotal()
        }
    }

    const getOperator = () => {
        return (event) => {
            expression.getOperator(event.target.innerText);
            const result = expression.getResult();
            if (result !== null) {
                document.querySelector('#total').innerHTML = result;
                setTotal(result)
                return;
            }

            setTotal(expression.getExpression())
        }
    }

    const digitBtns = selectElements('.digit');
    const operatorBtns = selectElements('.operator');
    const clearBtns = selectElements('.modifier');

    setClickEvts(digitBtns, getOperand)
    setClickEvts(operatorBtns, getOperator)
    setClickEvts(clearBtns, ()=> expression.clear())
}

