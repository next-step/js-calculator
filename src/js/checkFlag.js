import { input_flag } from "./index.js"

export const check_flag = (str) => {
    if (str == "0")
        input_flag[0] = 0;
    else if (str.length > 3)
        input_flag[0] = 3;
    else
        input_flag[0] = str.length;
    input_flag[1] = 0;
    input_flag[2] = 0;
}