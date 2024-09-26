import BasePage from '../BasePage';

class ModulePage extends BasePage {
  constructor() {
    super();

    // Input data
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = '[placeholder="Display Name"]';
    this.btnSubmit = 'button[type="submit"]';
    this.toggleAdvance = '#advancedToggle';

    // Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  verifyAddNewModuleSuccessfully() {
    return this.verifyHasText(this.messageCreatedSuccess);
  }

  createNewModule(module) {
    this.navigate('/Home/V2#/module/create');
    this.typeInInput(this.inputInternalName, module);
    this.typeInInput(this.inputDisplayName, module);
    this.clickElement(this.btnSubmit);
    this.verifyAddNewModuleSuccessfully();
    this.clickContainsElement('.navigation-item h4', 'Inventory');
    cy.get(this.btnSubmit).contains('Save').should('be.visible').click();
    return this;
  }

  editModule(module) {
    cy.log(`The ${module} module is editing`);
    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-pencil')
      .click();
    return this;
  }

  checkTrackOpeningOfItems(module) {
    cy.log('Track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    this.clickElement(this.btnSubmit);
    return this;
  }

  uncheckTrackOpeningOfItems(module) {
    cy.log(' Uncheck track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find('input[type="checkbox"]')
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
    cy.log(`Delete: ${module}`);

    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-remove')
      .click();
    this.clickContainsElement('button', 'Delete');
    return this;
  }
}
export default ModulePage;
