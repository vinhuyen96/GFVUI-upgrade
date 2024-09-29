import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();
    this.iconEnvelopOpen = '.dx-icon.fas.fa-envelope-open';
  }

  checkTheRequestIsUnread() {
    this.log('Check the envelope is closed');
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.verifyShould(this.iconEnvelopOpen, 'exist');
  }

  checkTheRequestIsRead() {
    cy.get('.dx-datagrid-text-content')
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.log('Check the envelope is opened');
    this.verifyShould(this.iconEnvelopOpen, 'not.exist');
  }

  createNewItem() {
    this.clickElementContains('.dx-button-content .dx-button-text', 'NEW');
    this.clickElementContains('button', 'Submit');
  }

  markFirstItemAsUnread() {
    this.clickFirstElement('table tr .fa-envelope-open');
    // cy.get('table tr .fa-envelope').first().should('exist'); //replace for cy.wait
    // cy.wait(2000); // Wait for animation
  }

  markFirstItemAsRead() {
    this.clickFirstElement('table tr .fa-envelope');
    // cy.get('table tr .fa-envelope-open').first().should('exist'); // same as line 34
    // cy.wait(2000); // Wait for animation
  }
}

export default GridPage;
