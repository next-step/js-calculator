import { arithmeticExpression } from '../js/functions/logic/index.js';

const mokupDigitTextArray = [123, 456, 789, 123, 456];
const mokupOperationTextArray = ['+', '-', 'X', '/'];

arithmeticExpression(mokupDigitTextArray, mokupOperationTextArray);

console.log(parseInt(mokupDigitTextArray[0]));
