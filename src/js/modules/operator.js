export default function operate(numberList, operator) {
    let result = ''
    switch(operator) {
        case '+' :
            result = plus(numberList)
            break;
        case '-' :
            result = minus(numberList)
            break;
        case 'X' :
            result = multiply(numberList)
            break;
        case '/' :
            result = divide(numberList)
            break;        
    }
    return result
}

function plus(numberList) {
    let result = String(parseInt(numberList[0]) + parseInt(numberList[1]))
    document.getElementById('total').innerText = result

    return result
}
function minus(numberList) {
    let result = String(parseInt(numberList[0]) - parseInt(numberList[1]))
    document.getElementById('total').innerText = result

    return result
}
function multiply(numberList) {
    let result = String(parseInt(numberList[0]) * parseInt(numberList[1]))
    document.getElementById('total').innerText = result

    return result
}
function divide(numberList) {
    let result = String(Math.floor(parseInt(numberList[0]) / parseInt(numberList[1])))
    document.getElementById('total').innerText = result

    return result
}
