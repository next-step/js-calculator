function caculate(numberList, operator) {
    console.log('caculate!!!')
    console.log(numberList)
    console.log(operator)
    let result = 0
    switch(operator) {
        case '+' :
            console.log('plus')
            result = plus(numberList)
            break;
        case '-' :
            console.log('minus')
            minus(numberList)
            break;
        case 'x' :
            console.log('multiply')
            multiply(numberList)
            break;
        case '/' :
            console.log('divide')
            divide(numberList)
            break;

        
    }
    return result
}

function plus(numberList) {
    let result = parseInt(numberList[0]) + parseInt(numberList[1])
    document.getElementById('total').innerText = result

    return result
}

export {caculate};