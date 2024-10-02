import GeneralAction from '../common/GeneralAction';

class BasePage extends GeneralAction {
  constructor() {
    super();

    // Menu selector
    this.statusOfDrawerMenu = '.dx-drawer-opened';
    this.menuElement = 'dx-toolbar a.toolbar-label';
    this.hamburgerBtn = '.menu-button';
    this.itemOnDrawer = '.dx-treeview-node-container';

    // Loading selector
    this.loadingWrapper = '.dx-loadpanel-content-wrapper';
  }

  /**
   * Navigate to route when click on header
   * @param page
   */
  navigateToPage(page) {
    return this.clickElementContainsText(this.menuElement, page);
  }

  /**
   * Verify detail module is visible
   */
  verifyPageStable() {
    return this
      .verifyShould(this.loadingWrapper, 'be.visible')
      .verifyShould(this.loadingWrapper, 'be.not.visible');
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
