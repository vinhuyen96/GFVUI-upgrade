import HomePage from '../BasePage';
import GeneralAction from '../common/GeneralAction';

class ModulePage extends GeneralAction {
  constructor() {
    super();
    //Declare object
    this.homePage = new HomePage();

    //Input data
    this.inputInternalName = 'input[name="name"]';
    this.inputDisplayName = '[placeholder="Display Name"]';
    this.btnSubmit = 'button[type="submit"]';
    this.toggleAdvance = '#advancedToggle';

    //Message verify
    this.messageCreatedSuccess = 'Select Workflow Process';
  }

  verifyAddNewModuleSuccessfully() {
    this.verifyHasText(this.messageCreatedSuccess);
  }

  createNewModule(module) {
    this.navigate('/Home/V2#/module/create');
    this.typeInInput(this.inputInternalName, module);
    this.typeInInput(this.inputDisplayName, module);
    this.clickElement(this.btnSubmit);
    this.verifyAddNewModuleSuccessfully();
  }

  editModule(module) {
    cy.log(`The ${module} module is editing`);
    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-pencil')
      .click();
  }

  trackOpeningOfItems(module) {
    cy.log('Track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label:contains("Track opening/reading of items")')
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true });
    this.clickElement(this.btnSubmit);
  }

  untrackOpeningOfItems(module) {
    cy.log(' Uncheck track Opening Of Items');

    this.editModule(module);
    this.clickElement(this.toggleAdvance);
    cy.get('label')
      .contains('Track opening/reading of items')
      .parent()
      .uncheck({ force: true });
    this.clickElement(this.btnSubmit);
    cy.reload();
  }

  openModulePage(module) {
    this.homePage.selectLeftMenu(module);
  }

  deleteModule(module) {
    cy.log(`deleteModule: ${module}`);

    cy.get('td.vertical-table-centering a')
      .contains(module)
      .parents('tr')
      .find('.glyphicon-remove')
      .click();
    this.clickContainsElement('button', 'Delete');
  }
}
export default ModulePage;
