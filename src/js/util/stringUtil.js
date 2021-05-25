import { Message } from "./Message.js";

const OVER_NUMBER = /(\d+){3,}/;

export function validOverNumber(input) {
  if (input.match(OVER_NUMBER) !== null) {
    alert(Message.ILLEGAL_OVER_OPERAND);
    return false;
  }
  return true;
}

export function validNoNumber(input) {
  if (input === '0') {
    return true;
  }
  return false;
}

export function deleteLastOperator(input) {
  return input.replace(/(\d+)[-+\/X]/, "");
}

export function matchOperation(input) {
  return input.match(/([0-9]+)([-+\/X])([0-9]+)/);
}