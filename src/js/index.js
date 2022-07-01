// import operate from './modules/operator.js'

let number = ''
let operator = ''
let numberList = []
export default function test() {
    alert('a')
}


// function caculator() {
    
//     document.querySelectorAll('.digit').forEach(function(btn) {
//         btn.addEventListener('click', function() {

//             if(operator === '=') {
//                 initialize()
//             }

//             if(number.split('').length <= 2) {
//                 if(!(number === '' && btn.innerText === '0')) {
//                     number = number.concat(btn.innerText)
//                     document.getElementById('total').innerText = number
//                 }
//             }
//         })
//     })

//     document.querySelectorAll('.operation').forEach(function(btn) {
//         btn.addEventListener('click', function() {

//             if(number !== '') {
//                 numberList.push(number)
//                 number = ''
//             }
//             if(numberList.length === 1) {
//                 operator = btn.innerText
//             }
            
//             if(numberList.length === 2) {
//                 let result = operate(numberList, operator) //operator : previous operator to avoid "=" operator
//                 numberList = []
//                 numberList.push(result) //get a result number in numberList index 0
//                 operator = btn.innerText
//             }
//         })
//     })
    
//     document.querySelector('.modifier').addEventListener('click', function(btn) {
//         initialize()
//         document.getElementById('total').innerText = 0
//     })
// }

// function initialize() {
//     operator = ''
//     number = ''
//     numberList = []
// }

// caculator();
