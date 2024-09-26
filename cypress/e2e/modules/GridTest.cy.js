import { faker } from '@faker-js/faker';

import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import BasePage from '../../support/pages/BasePage';
import LoginPage from '../../support/pages/auth/LoginPage';
import GeneralAction from '../../support/pages/common/GeneralAction';

describe('Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();
  const basePage = new BasePage();
  const generalAction = new GeneralAction();

  let moduleName;

  beforeEach(() => {
    cy.fixture('account.json').then((account) => {
      loginPage.login(
        account.exampleAccount.email,
        account.exampleAccount.password,
      );
    });
    loginPage.verifyLoginSuccess();
  });

  afterEach(() => {
    // To ensure that the deleteModule function runs after the tests
    cy.log('Cleanup: Deleting the module');
    it('Should delete a module', () => {
      basePage.navigateToToolbarPage('Module');
      modulePage.deleteModule(moduleName);
    });
  });

  it('Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.', () => {
    const module = 'ModuleTest_' + faker.number.int({ max: 1000000 });
    moduleName = module;
    cy.log('Create new module');
    modulePage.createNewModule(module);
    basePage.navigateToToolbarPage('Module');
    cy.log('test');
    modulePage.editModule(module);
    modulePage.checkTrackOpeningOfItems(module);
    generalAction.loadPage();

    cy.log('Verify item is unread');
    generalAction.navigate('/');
    modulePage.openModulePage(module);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsUnread(0);
    cy.log('Uncheck in checkbox: Check Track Opening Of Items');
    basePage.navigateToToolbarPage('Module');
    modulePage.uncheckTrackOpeningOfItems(module);
    generalAction.loadPage();

    cy.log('Verify item is read');
    generalAction.navigate('/');
    modulePage.openModulePage(module);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsRead(0);
  });

  // it('Verify that item can be marked as read / unread manually.', () => {
  //   basePage.navigateToToolbarPage('Module');
  //   cy.log('Module');
  // modulePage.editModule(moduleName);
  // modulePage.checkTrackOpeningOfItems(moduleName);
  // generalAction.loadPage();
  //
  // cy.log('Verify item is unread');
  // generalAction.navigate('/');
  // modulePage.openModulePage(moduleName);
  // gridPage.createNewItem();
  // gridPage.checkTheRequestIsUnread(0);
  // cy.log('Mark first item as read');
  // gridPage.markFirstItemAsRead();
  //
  // cy.log('Verify item is read');
  // gridPage.checkTheRequestIsRead(0);
  //
  // cy.log('Mark first item as unread');
  // gridPage.markFirstItemAsUnread();
  //
  // cy.log('Verify item is unread');
  // gridPage.checkTheRequestIsUnread(0);
  // });
});
