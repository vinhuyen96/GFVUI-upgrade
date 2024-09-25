import GeneralAction from './common/GeneralAction';

class BasePage extends GeneralAction {
  constructor() {
    super();
  }

  navigateToToolbarPage(page) {
    this.clickContainsElement('dx-toolbar a.toolbar-label', page);
  }

  /**
   * open left menu
   */
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
    this.clickContainsElement('.dx-treeview-node-container', item);
    this.closeLeftMenu();
  }
}
export default BasePage;
