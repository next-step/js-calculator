import {caculate} from "./modules/caculator.js";


let number = ''
let operator = ''
let numberList = []
//result 
// document.getElementById('total').innerText
let app = document.querySelector("#app");

//select each number
document.querySelectorAll('.digit').forEach(function(btn) {
    btn.addEventListener('click', function() {
        //=을 입력하면 바로 초기화되지 않고, 다른 숫자를 이용할때 operator가 =이면 초기화.
        if(operator === '=') {
            operator = ''
            number = ''
        }
        //numbers length is less than 3 and shouldn't be '0' (ignore)
        if(number.split('').length <= 2 && btn.innerText !== '0') {
            number = number.concat(btn.innerText)
            document.getElementById('total').innerText = number
        }
        console.log('numbers is ', number)
    })
})



document.querySelectorAll('.operation').forEach(function(btn) {
    btn.addEventListener('click', function() {
        //when comparator is clicked,
        //push number into numberList array
        //init number variable 
        //numberList가 1개일때
            // operator만 추가 
        //numberList가 2개일때
            // 이전 operator로 계산하고, operator 대입
        //num
        //add number if there is actual number
        if(number !== '') {
            numberList.push(number)
            number = ''
        }

        console.log('numberList.length!!', numberList.length)
        if(numberList.length === 1) {
            console.log('get into numberList.length!!', numberList.length)
            console.log(operator)
            operator = btn.innerText
        }

        
        
        // if(numberList.length > 1) {
        //     numberList.shift()
        //     console.log('numberList after Poping is ', numberList)
        // }
        
        
        console.log('operator is ', operator)
        if(numberList.length === 2) {

            let result = caculate(numberList, operator) //operator : previous operator to avoid "=" operator
            console.log('result is', result)
            numberList = [] // initial
            numberList.push(result)
            console.log('numberList after caculating is', numberList)
            //get a result number in numberList index 0

            //modify operator except when btn.innerText is "="
            operator = btn.innerText
            return
        }

        console.log('numberList is ', numberList)
        console.log('number after initialize is ', number)
        
    })
})

document.querySelector('.modifier').addEventListener('click', function(btn) {
    console.log('AC!!!!')
    numberList = []
    number = ''
    operator = ''
    document.getElementById('total').innerText = 0
    console.log('all initialize !!')
    console.log('numberList is ', numberList)
    console.log('number is ', number)
    console.log('operator is ', operator)
})

