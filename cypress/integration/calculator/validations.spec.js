import {MAX_SIZE_OF_DIGITS} from '../../../src/js/utils/math.js';

describe('validations', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        for (let i = 0; i < MAX_SIZE_OF_DIGITS; i += 1) {
            cy.clickDigit(3);
        }

        cy.clickDigit(7)
          .then(() => {
              expect(stub.getCall(0))
                  .to
                  .be
                  .calledWith('숫자는 세 자리까지만 입력 가능합니다!');
          });
    });
});
