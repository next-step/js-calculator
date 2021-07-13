export const autoClick = (arr) => {
  arr.forEach((value) => {
    if (isNaN(value)) {
      cy.get(".operation").contains(value).click()
    } else {
      splitNumber(value).forEach((digit) => {
        cy.get(".digit").contains(digit).click()
      })
    }
  })
}

export const createTwoRandomNumber = () => {
  return [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
}

export const splitNumber = (num) => {
  return num.toString().split("")
}
