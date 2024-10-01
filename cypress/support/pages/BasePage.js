import GeneralAction from '../common/GeneralAction';

class BasePage extends GeneralAction {
  constructor() {
    super();
    this.statusOfDrawerMenu = '.dx-drawer-opened';
    this.menuElement = 'dx-toolbar a.toolbar-label';
    this.hamburgerBtn = '.menu-button';
    this.itemOnDrawer = '.dx-treeview-node-container';
  }

  /**
   * Navigate to route when click on header
   * @param pageName
   */
  navigateToPage(pageName) {
    return this.clickElementContainsText(this.menuElement, pageName);
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
    return this;
  }

  /**
   * Close left menu
   */
  closeLeftMenu() {
    // Make sure drawer is present before executing the click action.
    cy.get('body').then(($body) => {
      if ($body.find(this.statusOfDrawerMenu).length !== 0) {
        this.clickElement(this.hamburgerBtn);
      }
    });
    return this;
  }

  /**
   * Click on element on Drawer
   * @param item
   */
  selectLeftMenu(item) {
    this.openLeftMenu();
    this.clickElementContainsText(this.itemOnDrawer, item);
    this.closeLeftMenu();
    return this;
  }

  verifyHomePageIsOpen() {
    this.log('verify V2 HomePage Is Open');
    cy.get(this.hamburgerBtn).should('be.visible');
    return this;
  }
}
export default BasePage;
