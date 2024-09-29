import BasePage from '../BasePage';

class ModulePage extends BasePage {
  constructor() {
    super();

    // Input data
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = '[placeholder="Display Name"]';
    this.btnSubmit = 'button[type="submit"]';
    this.toggleAdvance = '#advancedToggle';
    this.btn = 'button';
    this.inputTrack = 'input[type="checkbox"]';

    // Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  verifyAddNewModuleSuccessfully() {
    return this.verifyHasText('body', this.messageCreatedSuccess);
  }

  createNewModule(module) {
    this.navigate('/Home/V2#/module/create');
    this.typeInInput(this.inputInternalName, module);
    this.typeInInput(this.inputDisplayName, module);
    this.clickElement(this.btnSubmit);
    this.verifyAddNewModuleSuccessfully();
    this.clickElementContains('.navigation-item h4', 'Inventory');
    this.clickContainsElementHasAssertion(this.btnSubmit, 'Save', 'be.visible');
    return this;
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

  checkTrackOpeningOfItems(module) {
    this.log('Track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find(this.inputTrack)
      .check({ force: true });
    this.clickElement(this.btnSubmit);
    return this;
  }

  uncheckTrackOpeningOfItems(module) {
    this.log(' Uncheck track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find(this.inputTrack)
      .uncheck({ force: true });
    this.clickElement(this.btnSubmit);
    this.loadPage();
    return this;
  }

  openModulePage(module) {
    this.selectLeftMenu(module);
    return this;
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
