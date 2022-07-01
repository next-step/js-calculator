export default function operate(numberList, operator) {
    console.log('caculate!!!')
    console.log(numberList)
    console.log(operator)
    let result = ''
    switch(operator) {
        case '+' :
            console.log('plus')
            result = plus(numberList)
            break;
        case '-' :
            console.log('minus')
            result = minus(numberList)
            break;
        case 'X' :
            console.log('multiply')
            result = multiply(numberList)
            break;
        case '/' :
            console.log('divide')
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
