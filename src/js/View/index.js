import { selector } from '../util/consts.js';

const View = {
  moniter: selector('#total'),
  digit: {
    changeKeyPadView(number) {
      selector('#total').textContent = number;
    },
  },
};

export default View;
