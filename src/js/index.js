window.onload = function(){
    const digitArr = document.querySelectorAll(".digit");
    const operArr = document.querySelectorAll(".operation");

    digitArr.forEach(digit => digit.addEventListener('click', (e) => {
        const num = e.currentTarget.textContent;
    }));

    operArr.forEach(oper => {
        oper.addEventListener('click', (e)=> {
            const operation = e.currentTarget.textContent;
            switch(operation){
                //division
                case "/":
                    break;
                //multiply
                case "X":
                    break;
                //minus
                case "-":
                    break;
                //plus
                case "+":
                    break;
                //equals
                case "=":
                    break;
            }
        });
    });
};