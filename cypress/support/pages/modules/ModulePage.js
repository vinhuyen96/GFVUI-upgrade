import HomePage from '../home/HomePage';
import BasePage from '../BasePage';

class ModulePage extends BasePage {
  constructor() {
    super();
    //Declare object
    this.homePage = new HomePage();

    //Input data
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = '[placeholder="Display Name"]';
    this.btnSubmit = 'button[type="submit"]';

    //Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  submitForm() {
    this.clickElement(this.btnSubmit);
  }

  verifyAddNewModuleSuccessfully() {
    this.verifyTextInBody(this.messageCreatedSuccess);
  }

  createNewModule(module) {
    this.navigate('/Home/V2#/module/create');
    this.typeInInput(this.inputInternalName, module);
    this.typeInInput(this.inputDisplayName, module);
    this.submitForm();
    this.verifyAddNewModuleSuccessfully();
  }

  editModule(module) {
    cy.log('The' + module + 'module is editing');
    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-pencil')
      .click();
  }

  trackOpeningOfItems(module) {
    cy.log('Track Opening Of Items');
    this.editModule(module);
    cy.get('#advancedToggle').click();
    // cy.get('label')
    //   .contains('Track opening/reading of items')
    //   .uncheck({ force: true })
    //   .check({ force: true });
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find('input[type="checkbox"]')
      .uncheck({ force: true })
      .check({ force: true });
    this.clickElement('button[type="submit"]');
  }

  untrackOpeningOfItems(module) {
    cy.log(' Uncheck track Opening Of Items');

    this.editModule(module);
    cy.get('#advancedToggle').click();
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .check({ force: true })
      .uncheck({ force: true });
    this.clickElement('button[type="submit"]');
    cy.reload();
  }

  openModulePage(module) {
    this.homePage.selectLeftMenu(module);
  }

  deleteModule(module) {
    cy.log('deleteModule: ' + module);
    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-remove')
      .click();
    cy.get('.btn btn-danger').click();
  }
}
export default ModulePage;
