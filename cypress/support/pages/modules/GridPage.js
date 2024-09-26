import GeneralAction from '../common/GeneralAction';

class GridPage extends GeneralAction {
  constructor() {
    super();
  }

  checkTheRequestIsUnread() {
    cy.log('Check the envelope is closed');
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    cy.get('.dx-icon.fas.fa-envelope-open').should('be.visible');
  }

  checkTheRequestIsRead() {
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    cy.log('Check the envelope is opened');
    cy.get('.dx-icon.fas.fa-envelope-open').should('not.be.visible');
  }

  createNewItem() {
    cy.get('.dx-button-content .dx-button-text').contains('NEW').click();
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
