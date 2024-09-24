import BasePage from '../BasePage';

class Homepage extends BasePage {
  constructor() {
    super();
  }

  navigateToToolbarPage(page) {
    cy.get('dx-toolbar a.toolbar-label').contains(page).click();
  }

  openLeftMenu() {
    // Confirm that the drawer is not open before clicking the menu icon
    cy.get('body')
      .find('.dx-drawer-opened')
      .should('have.length', 0)
      .then(() => {
        cy.get('.dx-icon-menu').click();
      });
  }

  closeLeftMenu(action) {
    // Make sure drawer is present before executing the click action.
    cy.get('body')
      .find('.dx-drawer-opened')
      .should('exist')
      .then(() => {
        cy.get('.menu-button').click();
      });
  }

  selectLeftMenu(item) {
    this.openLeftMenu();
    cy.get('.dx-treeview-node-container').contains(item).click();
    this.closeLeftMenu();
  }
}
export default Homepage;
