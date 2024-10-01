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
    this.inputTrack = 'input[type="checkbox"]';
    this.pageTitle = 'h3.pull-left'; //lấy lại locator
    this.verifyPageAppear = '.dx-scrollview-content'; // đặt lại tên element

    // Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  verifyAddNewModuleSuccessfully() {
    return this.verifyHasText(this.verifyPageAppear, this.messageCreatedSuccess);
  }

  verifyModulePageVisible() {
    return this.verifyHasText(this.pageTitle, 'Modules');
  }

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

  editModule(module) {
    this.log(`The ${module} module is editing`);

    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-pencil')
      .click();
    return this;
  }

  checkTrackOpeningOfItems() {
    this.log('Track Opening Of Items');

    cy.get(this.toggleAdvance).scrollIntoView().should('be.visible').click();
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .find(this.inputTrack)
      .check({ force: true });
    this.clickElement(this.btnSubmit);
    return this;
  }

  uncheckTrackOpeningOfItems() {
    this.log('Uncheck track Opening Of Items');

    // cy.get(this.toggleAdvance).scrollIntoView().should('be.visible').click();
    cy.get(this.toggleAdvance).should('exist').click();
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .find(this.inputTrack)
      .uncheck({ force: true });
    this.clickElement(this.btnSubmit);
    this.loadPage();
    return this;
  }

  openModulePage(module) {
    return this.selectLeftMenu(module);
  }

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
