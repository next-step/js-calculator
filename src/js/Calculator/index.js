import Calculator from './model';
import calcutorController from './controller';

const module = () => {
  const calculator = new Calculator();
  calcutorController(calculator);
};

export default module;
