import { OPERATION_CONST } from '../constant';

const operators = {
 [OPERATION_CONST.PULS]: (prevNumber) => (nextNumber) =>
  prevNumber + nextNumber,
 [OPERATION_CONST.MINUS]: (prevNumber) => (nextNumber) =>
  prevNumber - nextNumber,
 [OPERATION_CONST.DIVIDE]: (prevNumber) => (nextNumber) =>
  prevNumber / nextNumber,
 [OPERATION_CONST.MULTIPLE]: (prevNumber) => (nextNumber) =>
  prevNumber * nextNumber,
};

export default operators;
