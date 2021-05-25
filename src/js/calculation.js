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

    res = Math.floor(change_cal[arr[2]]?.(left, right));
    
    return res;
}

const change_cal = {
    ["+"]: (left, right) => left + right,
    ["-"]: (left, right) => left - right,
    ["X"]: (left, right) => left * right,
    ["/"]: (left, right) => left / right,
  };