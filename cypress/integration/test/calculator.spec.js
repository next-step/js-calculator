describe('test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500/');
    });

    it('5+7', () => {
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-plus]").click();
        cy.get("[data-test=btn-7]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(12);
    });

    it('235+  800 = + 5', () => {
        cy.get("[data-test=btn-2]").click();
        cy.get("[data-test=btn-3]").click();
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-plus]").click();
        cy.get("[data-test=btn-8]").click();
        cy.get("[data-test=btn-0]").click();
        cy.get("[data-test=btn-0]").click();
        cy.get("[data-test=btn-equal]").click();
        cy.get("[data-test=btn-plus]").click();
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(1040);
    });

    it('5+7', () => {
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-plus]").click();
        cy.get("[data-test=btn-7]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(12);
    });

    it('7-5', () => {
        cy.get("[data-test=btn-7]").click();
        cy.get("[data-test=btn-minus]").click();
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(2);
    });

    it('5*7', () => {
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-multi]").click();
        cy.get("[data-test=btn-7]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(35);
    });

    it('15/3', () => {
        cy.get("[data-test=btn-1]").click();
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-div]").click();
        cy.get("[data-test=btn-3]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(5);
    });

    it('15/2', () => {
        cy.get("[data-test=btn-1]").click();
        cy.get("[data-test=btn-5]").click();
        cy.get("[data-test=btn-div]").click();
        cy.get("[data-test=btn-2]").click();
        cy.get("[data-test=btn-equal]").click();
        
        cy.get("[data-test=total]").contains(7);
    });

    it('123 AC', () => {
        cy.get("[data-test=btn-1]").click();
        cy.get("[data-test=btn-2]").click();
        cy.get("[data-test=btn-3]").click();
        cy.get("[data-test=btn-modifier]").click();
        
        cy.get("[data-test=total]").contains(0);
    });
});