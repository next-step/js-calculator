function randomVal(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomOp() {
  const ops = ['+', '-', 'X', '/'];
  return ops[randomVal(0, 4)];
}

function clickLog(displayName, value) {
  Cypress.log({
    name: '무엇을 눌렀을까요~?!',
    displayName,
    message: `${value}`,
    consoleProps: () => {
      return {
        '눌려진 값은....!!!': value,
      };
    },
  });
}

export { randomVal, randomOp, clickLog };
