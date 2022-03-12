import Calculator from './components/Calculator.js';

const initialState = {
    total: '0',
    leftOperand: '0',
    rightOperand: null,
    operation: null,
};

new Calculator({ initialState });
