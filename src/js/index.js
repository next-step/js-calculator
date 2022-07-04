import modifierHandeler from './handelers/modifier.js';
import digitHandeler from './handelers/digit.js';
import operationHandler from './handelers/operation.js';

function main() {
  digitHandeler();
  operationHandler();
  modifierHandeler();
}

main();
