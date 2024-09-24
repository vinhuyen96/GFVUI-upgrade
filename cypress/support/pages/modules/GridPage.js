import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();
  }

  checkIfRequestIsUnread(line) {
    cy.log('Check If Request Is Unread');
    cy.get('.glyphicon.glyphicon-edit').should('be.visible');

    cy.get('tr.dx-data-row')
      .eq(line)
      .find('td')
      .each(($el, index) => {
        if (index > 0) {
          cy.wrap($el).should('have.css', 'font-weight', '900');
        }
      });
  }

  checkIfRequestIsRead(line) {
    cy.log('checkIfRequestIsRead');
    cy.get('.glyphicon.glyphicon-edit').should('be.visible');
    cy.get('tr.dx-data-row')
      .eq(line)
      .then(($row) => {
        cy.wrap($row)
          .find('td')
          .each(($el, index) => {
            if (index > 0) {
              cy.wrap($el).should('have.css', 'font-weight', '400');
            }
          });
      });
  }

  createNewItem() {
    cy.get('dx-button-content .dx-button-text')
      .contains('NEW')
      .should('be.visible')
      .click();
    cy.get('button').contains('Submit').click();
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
