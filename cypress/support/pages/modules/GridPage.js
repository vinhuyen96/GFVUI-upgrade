import GeneralAction from '../../common/GeneralAction';
import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();
  }

  checkTheRequestIsUnread() {
    this.log('Check the envelope is closed');
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    cy.get('.dx-icon.fas.fa-envelope-open').should('exist');
  }

  checkTheRequestIsRead() {
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.log('Check the envelope is opened');
    cy.get('.dx-icon.fas.fa-envelope-open').should('not.exist');
  }

  createNewItem() {
    this.clickContainsElement('.dx-button-content .dx-button-text', 'NEW');
    this.clickContainsElement('button', 'Submit');
  }

  markFirstItemAsUnread() {
    cy.get('table tr .fa-envelope-open').first().click();
    cy.get('table tr .fa-envelope').first().should('be.visible'); //replace for cy.wait
    // cy.wait(2000); // Wait for animation
  }

  markFirstItemAsRead() {
    cy.get('table tr .fa-envelope').first().click();
    cy.get('table tr .fa-envelope-open').first().should('be.visible'); // same as line 34
    // cy.wait(2000); // Wait for animation
  }
}

export default GridPage;
