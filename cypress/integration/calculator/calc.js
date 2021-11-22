export const isDigit = (num) => cy.get(".digit").contains(num);
export const isOperation = (op) => cy.get(".operation").contains(op);
export const isModifier = (ac) => cy.get(".modifier").contains(ac);
export const isTotal = (op) => cy.get("#total").should("have.text", String(op));

//prettier-ignore
export const operating = (...operations) => () => {
    operations.forEach((operation, index) => {
      if (operation === "AC") {
        isModifier(operation).click();
        isTotal(0);
        return;
      }
      if (index === operations.length - 1) {
        isTotal(operation);
        return;
      }
      if (typeof operation === "number") {
        isDigit(String(operation)).click();
        return;
      }
      if (typeof operation === "string") {
        isOperation(operation).click();
        return;
      }
    });
  };

  //prettier-ignore
export const exceptMaxNumOperating = (...operations) => () => {
    operations.forEach((operation, index) => {
      if (index === operations.length - 1) {
        isTotal(operation)
        return;
      }
      if (typeof operation === "number") {
        isDigit(String(operation)).click();
        return;
      }
    });
  };
