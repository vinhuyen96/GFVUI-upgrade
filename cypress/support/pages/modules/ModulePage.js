import BasePage from '../BasePage';

class ModulePage extends BasePage {
  constructor() {
    super();

    // selector
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = '[placeholder="Display Name"]';
    this.btnSubmit = 'button[type="submit"]';
    this.toggleAdvance = '#advancedToggle';
    this.btn = 'button';
    this.inputTrack = 'input[type="checkbox"]';
    this.modulesWrapper = '.ng-scope';
    this.verifyPageAppear = '.dx-scrollview-content';

    // Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  verifyAddNewModuleSuccessfully() {
    return this.verifyHasText(this.verifyPageAppear, this.messageCreatedSuccess);
  }

  verifyNavigatedToModule() {
    return this.verifyHasText(this.modulesWrapper, 'Modules');
  }

  createNewModule(module) {
    return this
      .navigate('/Home/V2#/module/create')
      .typeInInput(this.inputInternalName, module)
      .typeInInput(this.inputDisplayName, module)
      .clickElement(this.btnSubmit, 'be.visible')
      .verifyAddNewModuleSuccessfully()
      .clickElementContains('.navigation-item h4', 'Inventory')
      .clickContainsElementHasAssertion(this.btnSubmit, 'Save', 'be.visible');
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
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find(this.inputTrack)
      .check({ force: true });
    cy.get(this.btnSubmit).scrollIntoView().should('be.visible').click();
    return this;
  }

  uncheckTrackOpeningOfItems() {
    this.log('Uncheck track Opening Of Items');

    cy.get(this.toggleAdvance).scrollIntoView().should('be.visible').click();
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find(this.inputTrack)
      .uncheck({ force: true });
    cy.get(this.btnSubmit).scrollIntoView().should('be.visible').click();
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
    this.clickElementContains(this.btn, 'Delete');
    return this;
  }
}
export default ModulePage;
