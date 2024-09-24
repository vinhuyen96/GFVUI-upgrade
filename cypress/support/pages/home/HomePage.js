import BasePage from '../BasePage';

class Homepage extends BasePage {
  constructor() {
    super();
  }
  navigateToToolbarPage(page) {
    cy.get('dx-toolbar a.toolbar-label').contains(page).click();
  }
  openLeftMenu() {
    cy.get('body').then(($body) => {
      if ($body.find('.dx-drawer-opened').length === 0) {
        cy.get('.dx-icon-menu').click();
      }
    });
  }

  closeLeftMenu(action) {
    // If .dx-drawer-opened existing, click hamburger button
    cy.get('body').then(($body) => {
      if ($body.find('.dx-drawer-opened').length !== 0) {
        cy.get('.menu-button').click();
      }
    });
  }
  selectLeftMenu(item) {
    this.openLeftMenu();
    cy.get('.dx-treeview-node-container').contains(item).click();
    this.closeLeftMenu();
  }
}
export default Homepage;
