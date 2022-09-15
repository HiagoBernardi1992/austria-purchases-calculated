
describe('AppComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contains all fileds', () => {
    cy.get('#rateVAT');
    cy.get('#netPrice');
    cy.get('#grossPrice');
    cy.get('#amountsVAT');
  });

  it('should calculated grossPrice and amountsVAT by netPrice and rateVAT', () => {
    cy.get('#rateVAT')
    .click()
    .get('mat-option')
    .contains('10%')
    .click();
    cy.get('#netPrice').type('100');
    cy.get('#grossPrice').click().wait(500).should('have.value','110.00');
    cy.get('#amountsVAT').should('have.value','10.00');
  });

  it('should calculated netPrice and amountsVAT by grossPrice and rateVAT', () => {
    cy.get('#rateVAT')
    .click()
    .get('mat-option')
    .contains('10%')
    .click();
    cy.get('#grossPrice').type('110');
    cy.get('#netPrice').click().wait(500).should('have.value','100.00');
    cy.get('#amountsVAT').should('have.value','10.00');
  });

  it('should calculated netPrice and grossPrice by amountsVAT and rateVAT', () => {
    cy.get('#rateVAT')
    .click()
    .get('mat-option')
    .contains('10%')
    .click();
    cy.get('#amountsVAT').type('10');
    cy.get('#netPrice').click().wait(500).should('have.value','100.00');
    cy.get('#grossPrice').should('have.value','110.00');
  });

});
