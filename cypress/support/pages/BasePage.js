import GeneralAction from './common/GeneralAction';

class BasePage extends GeneralAction {
  constructor() {
    super();
    this.statusOfDrawerMenu = '.dx-drawer-opened';
  }

  navigateToToolbarPage(page) {
    this.clickContainsElement('dx-toolbar a.toolbar-label', page);
  }

  /**
   * open left menu
   */
  openLeftMenu() {
    cy.get('body').then(($body) => {
      if ($body.find(this.statusOfDrawerMenu).length === 0) {
        this.clickElement('.dx-icon-menu');
      }
    });
  }

  /**
   * Close left menu
   */
  closeLeftMenu() {
    // Make sure drawer is present before executing the click action.
    cy.get('body').then(($body) => {
      if ($body.find(this.statusOfDrawerMenu).length !== 0) {
        this.clickElement('.menu-button');
      }
    });
  }

  selectLeftMenu(item) {
    this.openLeftMenu();
    this.clickContainsElement('.dx-treeview-node-container', item);
    this.closeLeftMenu();
  }
}
export default BasePage;
