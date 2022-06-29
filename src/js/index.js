import {caculate} from "./modules/caculator.js"

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
        //수정 예정!! -> 무조건 초기화가 아니라 =일때 이전 operator * 마지막 number가 되도록 작업 수정
        //operator가 =일때 숫자를 입력하면 초기화
        //  연산자를 입력하면 추가 계산
        if(operator === '=') {
            initialize()
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
            // 이전 operator로 계산하고, operator 대입 -> operator
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
        
        console.log('operator is ', operator)
        if(numberList.length === 2) {
            let result = caculate(numberList, operator) //operator : previous operator to avoid "=" operator
            console.log('result is', result)
            numberList = [] // initial
            numberList.push(result) //get a result number in numberList index 0
            console.log('numberList after caculating is', numberList)
        
            operator = btn.innerText
        }

        console.log('numberList is ', numberList)
        console.log('number after initialize is ', number)
        
    })
})

document.querySelector('.modifier').addEventListener('click', function(btn) {
    console.log('AC!!!!')
    initialize()
    document.getElementById('total').innerText = 0
    console.log('all initialize !!')
    console.log('numberList is ', numberList)
    console.log('number is ', number)
    console.log('operator is ', operator)
})

function initialize() {
    operator = ''
    number = ''
    numberList = []
}