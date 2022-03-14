import { $, SELECTORS } from '../utils/selector.js';
import { OPERATORS } from '../common/constants.js';

export default function OperatorsPanels({ setOperator, calculateExpression }) {
  this.$operationsPanels = $(SELECTORS.CLASS.OPERATIONS);

  this.setState = () => {};
  this.render = () => {};

  this.setOperatorHandler = (operator) => {
    setOperator(operator);
  };

  this.calculateExpressionHandler = () => {
    calculateExpression();
  };

  this.operationsPanelHandler = (event) => {
    const { target } = event;
    if (!target.classList.contains('operation')) return;

    const keypadOperator = target.textContent;

    if (keypadOperator !== OPERATORS.EQUAL) {
      this.setOperatorHandler(keypadOperator);
    }

    if (keypadOperator === OPERATORS.EQUAL) {
      this.calculateExpressionHandler();
    }
  };

  this.$operationsPanels.addEventListener('click', this.operationsPanelHandler);
}
