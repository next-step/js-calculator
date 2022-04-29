import { LIMIT_NUMBER } from '../util/consts.js';

const Validator = {
  digit: {
    isKeyPadInitState(number) {
      return number === '0';
    },
    isMoreThanThousand(number) {
      return number.length >= LIMIT_NUMBER;
    },
  },

  operation: {
    pressInARow(prevOperation) {
      return !prevOperation ? false : true;
    },

    pressEqual(operation) {
      return operation === '=';
    },

    isNotThereOperator(operator, keyPadOperation) {
      return !operator && keyPadOperation === '=';
    },
  },
};

export default Validator;
