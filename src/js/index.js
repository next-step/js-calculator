import {$} from './utils/index.js';
import Calculator from './modules/Calculator.js'

export default function App () {
  new Calculator({ $app : $('#app')});
}

App();