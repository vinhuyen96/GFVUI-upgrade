import BasePage from '../BasePage';

class ModulePage extends BasePage {
  constructor() {
    super();

    // Create new module
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = 'input[name="displayname"]';
    this.btnSubmit = 'button[type="submit"]';

    // Edit module
    this.toggleAdvance = '#advancedToggle';
    this.btnSave = '.btn-danger';
    this.checkbox = 'input[type="checkbox"]';
    this.pageTitle = 'h3.pull-left';
    this.newModuleSection = '.dx-scrollview-content';

    // Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  /**
   * Verify created a module
   * @returns {ModulePage}
   */
  verifyAddNewModuleSuccessfully() {
    return this.verifyTextVisible(this.newModuleSection, this.messageCreatedSuccess);
  }

  /**
   * Verify module page is visible
   * @returns {ModulePage}
   */
  verifyModulePageVisible() {
    return this.verifyTextVisible(this.pageTitle, 'Modules');
  }

  /**
   * Create new module
   * @param module - Module name
   * @returns {ModulePage}
   */
  createNewModule(module) {
    return this
      .navigate('/Home/V2#/module/create')
      .typeInInput(this.inputInternalName, module)
      .typeInInput(this.inputDisplayName, module)
      .clickElement(this.btnSubmit)
      .verifyAddNewModuleSuccessfully()
      .clickElementContainsText('.navigation-item h4', 'Inventory')
      .clickElementContainsText(this.btnSubmit, 'Save');
  }

  /**
   * Edit module
   * @param module - Module name
   * @returns {ModulePage}
   */
  editModule(module) {
    this.log(`The ${module} module is editing`);

    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-pencil')
      .click();
    return this;
  }

  /**
   * Check the Track opening/reading of item
   * @returns {ModulePage}
   */
  checkTrackOpeningOfItems() {
    this.log('Track Opening Of Items');

    cy.get(this.toggleAdvance).scrollIntoView().should('be.visible').click();
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .find(this.checkbox)
      .check({ force: true });
    this.clickElement(this.btnSubmit);
    return this;
  }

  /**
   * Uncheck the Track opening/reading of item
   * @returns {ModulePage}
   */
  uncheckTrackOpeningOfItems() {
    this.log('Uncheck track Opening Of Items');

    cy.get(this.toggleAdvance).should('exist').click();
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .find(this.checkbox)
      .uncheck({ force: true });
    this.clickElement(this.btnSubmit);
    this.loadPage();
    return this;
  }

  /**
   * Go to detailed module
   * @param module - Module name
   * @returns {ModulePage}
   */
  openModulePage(module) {
    return this.selectLeftMenu(module);
  }

  /**
   * Delete module
   * @param module - Module name
   * @returns {ModulePage}
   */
  deleteModule(module) {
    this.log(`Delete: ${module}`);

    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-remove')
      .click();
    this.clickElementContainsText(this.btnSave, 'Delete');
    return this;
  }
}
export default ModulePage;
