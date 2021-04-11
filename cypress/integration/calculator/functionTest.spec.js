describe('My first test', () => {
    let randomNum;
    before('함수 생성', ()=>{
        randomNum = ()=> {
            return Math.floor(Math.random() * 9);
        }
    })

    beforeEach('매번 index.html에 접속',() => {
        cy.visit('/index.html')
    })

    it('숫자 1개 클릭시 total에 표시하기', () => {
        let number1 = randomNum();
        cy.get('.digit').contains(number1).click();
        cy.get('#total').should('have.text', number1);
    });

    it('숫자 2개 클릭시 total에 표시하기', () => {
        let numbers = [];
        numbers.push('1');
        numbers.push('9');
        numbers.forEach(no => {
            cy.get('.digit').contains(no).click();
        });

        cy.get('#total').should('have.text', '19');
    });

    it('0으로 시작하는 숫자 2개 클릭시 total에 표시하기', () => {
        let numbers = [];
        numbers.push('0');
        numbers.push('3');
        numbers.forEach(no => {
            cy.get('.digit').contains(no).click();
        });

        cy.get('#total').should('have.text', '3');
    });

    it('세자리 이상 클릭시 alert보여주기', () =>{
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('3').click();
        cy.get('.digit').contains('4').click();
        cy.get('.digit').contains('2').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`숫자는 세 자리까지만 입력 가능합니다!`)
          })
    });

    it('0으로 시작하는 세자리 이상 클릭시 alert보여주기', () =>{
        cy.get('.digit').contains('0').click();
        cy.get('.digit').contains('3').click();
        cy.get('.digit').contains('4').click();
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('2').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`숫자는 세 자리까지만 입력 가능합니다!`)
          })
    });

    it('AC 클릭시 숫자 초기화 확인', () =>{
        cy.get('.modifier').click();
        cy.get('#total').should('have.text', '0');
    });
    
    it('2자릿수 2개의 숫자 덧셈', () => {
        let numbers = [];
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('9').click();
        cy.get('.operation').contains('+').click();
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('1').click();
        cy.get('.operation').contains('=').click();

        cy.get('#total').should('have.text', '40');    
    });

    it('2자릿수 2개의 숫자 뺄셈', () => {
        let numbers = [];
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('9').click();
        cy.get('.operation').contains('-').click();
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('2').click();
        cy.get('.operation').contains('=').click();

        cy.get('#total').should('have.text', '17');
    })

    it('2자릿수 2개의 숫자 뺄셈', () => {
        let numbers = [];
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('9').click();
        cy.get('.operation').contains('-').click();
        cy.get('.digit').contains('1').click();
        cy.get('.digit').contains('2').click();
        cy.get('.operation').contains('=').click();

        cy.get('#total').should('have.text', '17');
    })

    it('숫자 + 0', () => {
        let numbers = [];
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('9').click();
        cy.get('.operation').contains('+').click();
        cy.get('.digit').contains('0').click();
        cy.get('.operation').contains('=').click();

        cy.get('#total').should('have.text', '29');
    })

    it('숫자 X 0', () => {
        let numbers = [];
        cy.get('.digit').contains('2').click();
        cy.get('.digit').contains('9').click();
        cy.get('.operation').contains('X').click();
        cy.get('.digit').contains('0').click();
        cy.get('.operation').contains('=').click();

        cy.get('#total').should('have.text', '0');
    })
})