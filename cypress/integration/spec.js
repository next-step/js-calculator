describe('ui-container',()=> {
  beforeEach(() => {cy.visit('http://loalhost:5000')})

  it('add 1+9 = 10', ()=> {
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('9').click();
    cy.get('#total').sholud('have.text', '1+9');
    cy.get('.operation').contains('=').click();
    cy.get('#total').sholud('have.text', '10');
  })

  it('add 21+12 = 33', ()=> {
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('#total').sholud('have.text', '21+12')
    cy.get('.operation').contains('=').click();
    cy.get('#total').sholud('have.text', '33')
  })

  it('minus 22 - 12', ()=> {
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('2').click();
    cy.get('.operation').contains('-').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('#total').sholud('have.text', '22-12')
    cy.get('.operation').contains('=').click();
    cy.get('#total').sholud('have.text', '10')
  })

  it('miltiple 3*9 = 27', ()=> {
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('*').click();
    cy.get('.digit').contains('9').click();
    cy.get('#total').sholud('have.text', '3*9')
    cy.get('.operation').contains('=').click();
    cy.get('#total').sholud('have.text', '27')
  })

  it('AC means all clear', ()=> {
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('*').click();
    cy.get('.digit').contains('9').click();
    cy.get('#total').sholud('have.text', '3*9')
    cy.get('.modifier').contains('AC').click();
    cy.get('#total').sholud('have.text', '0')
  })

  it('max 3자리', ()=> {
    cy.get('.digit').click();
    cy.get('.digit').click();
    cy.get('.digit').click();
    cy.get('.digit').click();

    cy.on('window:alert',(txt)=>{
      //Mocha assertions
      expect(txt).to.contains('max 3자리');
   })
  })


  it('add 21+1234 alert 21+123', ()=> {
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('1').click();
    cy.get('.operation').contains('+').click();
    cy.get('.digit').contains('1').click();
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.digit').contains('4').click();
    
    cy.on('window:alert',(txt)=>{
      //Mocha assertions
      expect(txt).to.contains('max 3자리');
      cy.get('#total').sholud('have.text', '21+123')
   })

  });


  it('Devider floor 23/7 = 3', ()=> {
    cy.get('.digit').contains('2').click();
    cy.get('.digit').contains('3').click();
    cy.get('.operation').contains('/').click();
    cy.get('.digit').contains('7').click();
    cy.get('#total').sholud('have.text', '23/7')
    cy.get('.operation').contains('=').click();
    cy.get('#total').sholud('have.text', '3')
  })


})

