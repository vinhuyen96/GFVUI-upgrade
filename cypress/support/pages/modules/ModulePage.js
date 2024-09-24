import HomePage from '../home/HomePage';
import {faker} from "@faker-js/faker";

class ModulePage extends HomePage {
  constructor() {
    super();
    this.internalName = 'input[name="name"]';
    this.displayName = '[placeholder="Display Name"]';
    this.description = '[placeholder="Description"';
    this.btnSubmit = 'button[type="submit"]';
    this.createNewModuleSuccessfullyMsg = 'Select Workflow Process';
  }
  enterInternalName(internalName) {
    this.typeInInput(this.internalName, internalName);
  }
  enterDisplayName(displayName) {
    this.typeInInput(this.displayName, displayName);
  }
  enterDescription(des) {
    this.typeInInput(this.description, des);
  }
  submitForm() {
    this.clickElement(this.btnSubmit);
  }
  verifyAddNewModuleSuccessfully() {
    this.verifyTextInBody(this.createNewModuleSuccessfullyMsg);
  }
  createNewModule() {
    this.navigate(`${Cypress.config().baseUrl}Home/V2#/module/create`)
    const module = faker.person.firstName()
    this.enterInternalName(module)
    this.enterDisplayName(faker.person.firstName())
    this.enterDescription(faker.lorem.paragraph())
    this.submitForm()
    this.verifyAddNewModuleSuccessfully()
  }
  editModule(module) {
    cy.log('editModule: ' + module);
    cy.xpath(
      `//a[text()="${module}"]/../..//span[contains(@class,"glyphicon-pencil")]`
    ).click();
  }
  trackOpeningOfItems(module) {
    cy.log('trackOpeningOfItems');
    this.editModule(module);
    cy.get('#advancedToggle').click();
    cy.xpath('//label[contains(.,"Track opening/reading of items")]/input')
      .uncheck({ force: true })
      .check({ force: true })
    cy.get('button[type="submit"]').click();
  }
  untrackOpeningOfItems(module) {
    cy.log('untrackOpeningOfItems')

    this.editModule(module)
    cy.get('#advancedToggle').click()
    cy.xpath('//label[contains(.,"Track opening/reading of items")]/input').check({force: true}).uncheck({force: true})
    cy.get('button[type="submit"]').click()
    cy.reload()
  }
  openModulePage(module) {
    this.selectLeftMenu(module);
  }
}
export default ModulePage;
