import DigitsPanels from './components/digitsPanels.js';
import ModifierPanel from './components/modifierPanel.js';
import OperatorsPanels from './components/operatorsPanels.js';
import TotalDisplay from './components/totalDisplay.js';
import { validators } from './common/validator.js';
import { INITIAL_VALUES } from './common/constants.js';
import { getNewTotal } from './utils/calculate.js';

export default function App() {
  this.state = {
    total: INITIAL_VALUES.INITIAL_TOTAL,
    operator: INITIAL_VALUES.INITIAL_OPERATOR,
    operand: INITIAL_VALUES.INITIAL_OPERAND,
  };

  this.$totalDisplay = new TotalDisplay({
    initState: this.state.total,
  });

  this.$modifierPanels = new ModifierPanel({
    onClick: () => {
      this.setState({
        ...this.state,
        total: INITIAL_VALUES.INITIAL_TOTAL,
        operand: INITIAL_VALUES.INITIAL_OPERAND,
        operator: INITIAL_VALUES.INITIAL_OPERATOR,
      });
    },
  });

  this.$digitsPanels = new DigitsPanels({
    onClick: (keypadNumber) => {
      try {
        validators.operandValidtor.checkOperandSize(this.state.operand);
        validators.operandValidtor.checkImmediateAfterCalulate(this.state);
      } catch (error) {
        alert(error.message);
        return;
      }

      this.setState({
        ...this.state,
        total: this.state.total + keypadNumber,
        operand: this.state.operand + keypadNumber,
        operator: INITIAL_VALUES.INITIAL_OPERATOR,
      });
    },
  });

  this.$operatorsPanels = new OperatorsPanels({
    setOperator: (keypadOperator) => {
      try {
        validators.operatorValidator.checkAbleOperatorUpdate(this.state);
      } catch (error) {
        alert(error.message);
        return;
      }

      this.setState({
        ...this.state,
        total: this.state.total + keypadOperator,
        operand: INITIAL_VALUES.INITIAL_OPERAND,
        operator: keypadOperator,
      });
    },
    calculateExpression: () => {
      if (validators.operatorValidator.isInitState(this.state)) return;

      try {
        validators.operatorValidator.checkAbleCalculate(this.state.operator);
      } catch (error) {
        alert(error.message);
        return;
      }

      const newTotal = getNewTotal(this.state.total);
      this.setState({
        ...this.state,
        total: newTotal,
        operand: INITIAL_VALUES.INITIAL_OPERAND,
        operator: INITIAL_VALUES.INITIAL_OPERATOR,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { total } = this.state;
    this.$totalDisplay.setState(total);
  };
}
