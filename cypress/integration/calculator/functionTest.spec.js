import { Message } from '../../../src/js/constant.js'

describe('My first test', () => {
	let randomNum;
	before('난수 생성', ()=>{
		randomNum = ()=> {
			return Math.floor(Math.random() * 9);
		}
	})

	beforeEach('매번 index.html에 접속',() => {
		cy.visit('/index.html')
	})

	it('숫자 1개 클릭시 total에 1개 숫자가 표시되어야 한다.', () => {
		let number1 = randomNum();
		cy.get('.digit').contains(number1).click();
		cy.get('#total').should('have.text', number1);
	});

	it('숫자 2개 클릭시 total에 2자리 숫자가 표시되어야 한다.', () => {
		[1,9].forEach(no => {
				cy.get('.digit').contains(no).click();
		});
		cy.get('#total').should('have.text', '19');
	});

	it('0으로 시작하는 숫자 2개 클릭시 total에 한자리 숫자만 표시되야 한다.', () => {
		[0,3].forEach(no => {
				cy.get('.digit').contains(no).click();
		});
		cy.get('#total').should('have.text', '3');
	});

	it('[요구사항]2개의 숫자에 대해 덧셈이 가능하다.', () => {
		testExcute([1,9], '+', [2,1]);
		cy.get('#total').should('have.text', '40');    
	});

	it('[요구사항]2개의 숫자에 대해 뺄셈이 가능하다.', () => {
		testExcute([2,9], '-', [1,2]);
		cy.get('#total').should('have.text', '17');
	})

	it('[요구사항]2개의 숫자에 대해 곱셈이 가능하다.', () => {
		testExcute([2,9], 'X', [1,0]);
		cy.get('#total').should('have.text', '290');
	});


	it('[요구사항] 2개의 숫자에 대해 나눗셈이 가능하다.', () => {
		testExcute([2,8], '/', [2]);
		cy.get('#total').should('have.text', '14');
	})

	it('[요구사항]AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () =>{
		cy.get('.modifier').click();
		cy.get('#total').should('have.text', Message.INITAIL_VALUE);
	});
	
	it('[요구사항]숫자는 한번에 최대 3자리 수까지 입력 가능하다. alert 보여주기', () =>{
		clickNum([2,3,4,2]);
		cy.on('window:alert', (str) => {
			expect(str).to.equal(Message.ALERT_MSG_OVER_THREE_NUMBER)
		})
	});

	it('[요구사항]계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
		testExcute([2,9], '/', [2]);
		cy.get('#total').should('have.text', '14');
	});

	it('0으로 시작해 숫자 5개 클릭시 alert를 보여줘야 한다.', () =>{
		clickNum([0,3,4,2,2]);
		cy.on('window:alert', (str) => {
			expect(str).to.equal(Message.ALERT_MSG_OVER_THREE_NUMBER)
		})
	});

	it('숫자에 0을 더하면 첫번째 숫자가 나와야 한다.', () => {
		testExcute([2,9], '+', [0]);
		cy.get('#total').should('have.text', '29');
	})

	it('숫자에 0을 곱하변 0이 나와야 한다.', () => {
		testExcute([2,9], 'X', [0]);
		cy.get('#total').should('have.text', '0');
	});
})

const testExcute = (first, operator1, second, operator2='=') => {
	clickNum(first);
	cy.get('.operation').contains(operator1).click();
	clickNum(second);
	cy.get('.operation').contains(operator2).click();
}

const clickNum = (arr) => {
	arr.forEach(no=>{
		cy.get('.digit').contains(no).click();
	})
}