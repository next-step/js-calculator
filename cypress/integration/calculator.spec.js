describe('ui-calculator', () => {
  beforeEach(() => {
    // run live server
    cy.visit('http://localhost:5500/');
  });

  it('숫자를 클릭 시, 디스플레이에 표기됩니다.', () => {
    const nums = [0,1,2,3,4,5,6,7,8,9];
    nums.forEach((num) => {
      cy.get('button').contains(`AC`).click(); 
      cy.get('button').contains(`${num}`).click();
      cy.get('#total').should('have.text', `${num}`);
    });
  });

  it('숫자는 세 자리까지 입력 가능합니다.', () => {
    const errorMsg = '숫자는 세 자리까지 입력 가능합니다!';

    cy.get('button').contains(`1`).click();
    cy.get('button').contains(`1`).click();
    cy.get('button').contains(`1`).click();
    
    const stub = cy.stub();
    cy.on ('window:alert', stub);
    cy.get('button').contains('1').click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith(errorMsg);      
    });
  });

  it('숫자 입력 후에 연산자를 입력 가능합니다.', () => {
    const errorMsg = '숫자를 먼저 입력한 후 연산자를 입력해주세요!';
    const operations = ['+' , '-', '/', 'X' ,'='];

    operations.forEach((oper) => {
      const stub = cy.stub();
      cy.on ('window:alert', stub);
      cy.get('button').contains(oper).click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(errorMsg);      
      });
    });
  });

  // it('숫자를 10~99 까지 고를 수 있습니다.', () => {
  //   let count = 100;
  //   while(count-- > 10) {
  //     cy.get('.modifier').contains(`AC`).click(); 
  //     let nums = String(count).split('');
  //     cy.get('.digit').contains(`${nums[0]}`).click();
  //     cy.get('.digit').contains(`${nums[1]}`).click();              
  //     cy.get('#total').should('have.text', `${count}`);
  //   }
  // });

  // it('숫자를 100~999 까지 고를 수 있습니다.', () => {
  //   let count = 1000;
  //   while(count-- > 100) {
  //     cy.get('.modifier').contains(`AC`).click(); 
  //     let nums = String(count).split('');
  //     cy.get('.digit').contains(`${nums[0]}`).click();
  //     cy.get('.digit').contains(`${nums[1]}`).click();
  //     cy.get('.digit').contains(`${nums[2]}`).click();              
  //     cy.get('#total').should('have.text', `${count}`);
  //   }
  // });

  it('최대 3자리 수 2개를 더합니다.', () => {
    
  });

  it('최대 3자리 수 2개를 곱합니다.', () => {

  });

  it('최대 3자리 수 2개를 뺍니다.', () => {

  });

  it('최대 3자리 수 2개를 나눕니다.', () => {

  });

})