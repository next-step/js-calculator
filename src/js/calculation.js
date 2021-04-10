export const calculation = (arr) => {
    let res = 0;
    let left = parseInt(arr[0]);
    let right = parseInt(arr[1]);

    if (arr[0] == Infinity || arr[0] == -Infinity)
    {
        if (arr[1] == 0 && arr[2] == "X")
            return NaN;
        else if (arr[0] == Infinity)
            return Infinity;
        else if (arr[0] == -Infinity)
            return -Infinity;
    }

    if (arr[0].match(/\+/) != null && arr[0].match(/\+/).index >= 0)
        left = parseFloat(arr[0]);
    if (isNaN(right))
        right = 0;
        console.log(left, right);
    if (arr[2] == "+")
        res = left + right;
    else if(arr[2] == "-")
        res = left - right;
    else if(arr[2] == "X")
        res = left * right;
    else if(arr[2] == "/")
        res = left / right;
    
    res = Math.floor(res);
    if (res != Infinity && res > Number.MAX_VALUE)
    {
        console.log(res);
        alert("Number 범위를 벗어난 결과값입니다!");
        return 0;
    }
    return res;
}