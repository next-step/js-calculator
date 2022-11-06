import ERROR_MESSAGE from "../const/ERROR_MESSAGE";

function isValidParams(func){
    
    function isTwoParam(a,b){
        if(a == null || a == 'undefined' || b == null || b == 'undefined') return false;
        return true ;
    }

    function wrapper(...args){
        const data = args;
        if(!isTwoParam(...data)) throw new Error(ERROR_MESSAGE.PARAM_MISSING);
        return func.apply(this, args);
    }
    return wrapper;
}

export default function Calculator(){

    this.sum =  (a, b) => {
        return a + b;
    }

    this.sum = isValidParams(this.sum);

    this.abstract = (a,b) => {
        return a-b;
    }
    this.abstract = isValidParams(this.abstract);

    this.multiply = (a,b) =>{
        return a*b; 
    }
    this.multiply = isValidParams(this.multiply);

    this.divide = (a,b) => {
       return Math.floor(a/b);
    }
    this.divide = isValidParams(this.divide);

}

