export function validator(number){
    const regex = /^(0|[1-9]\d?\d?)(\.\d{1,3})?$/;
    return regex.test(number);
}