import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();
  }

  createNewItem() {
    cy.get('.dx-button-content .dx-button-text')
      .contains('NEW')
      .should('be.visible')
      .click();
    cy.log('abc');
    cy.get('button').contains('Submit').click();
  }
}

export default GridPage;
