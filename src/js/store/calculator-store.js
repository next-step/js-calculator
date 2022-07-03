import { calculatorReducer, INITIAL_CALCULAOTR_STATE } from '../reducer/calculator-reducer.js';
import { Store } from './createStore.js';
export const store = new Store(INITIAL_CALCULAOTR_STATE, calculatorReducer);
