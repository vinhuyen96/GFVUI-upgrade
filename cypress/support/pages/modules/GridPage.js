import GeneralAction from '../common/GeneralAction';

class GridPage extends GeneralAction {
  constructor() {
    super();
  }

  checkTheRequestIsUnread(record) {
    cy.log('Check the envelope is closed');
    cy.get('.dx-icon.fas.fa-envelope-open').should('exist');
  }

  checkTheRequestIsRead(record) {
    cy.log('Check the envelope is opend');
    cy.get('.dx-icon.fas.fa-envelope-open').should('not.exist');
  }

  createNewItem() {
    cy.get('.dx-button-content .dx-button-text')
      .contains('NEW')
      .should('be.visible')
      .click();
    this.clickContainsElement('button', 'Submit');
  }

  markFirstItemAsUnread() {
    cy.get('table tr .fa-envelope-open').first().click();
    cy.wait(2000); // Wait for animation
  }

  markFirstItemAsRead() {
    cy.get('table tr .fa-envelope').first().click();
    cy.wait(2000); // Wait for animation
  }
}

export default GridPage;
