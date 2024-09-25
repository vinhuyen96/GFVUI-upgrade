import { faker } from '@faker-js/faker';

import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import BasePage from '../../support/pages/BasePage';
import LoginPage from '../../support/pages/auth/LoginPage';

describe('Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();
  const basePage = new BasePage();

  beforeEach(() => {
    cy.fixture('account.json').then((account) => {
      loginPage.login(
        account.exampleAccount.email,
        account.exampleAccount.password,
      );
    });
    loginPage.verifyLoginSuccess();
  });

  it('Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.', () => {
    const moduleName = 'ModuleTest_' + faker.number.int({ max: 1000000 });
    cy.log('Create new module');
    modulePage.createNewModule(moduleName);

    basePage.navigateToToolbarPage('Module');
    modulePage.editModule(moduleName);
    modulePage.trackOpeningOfItems(moduleName);
    cy.reload();

    cy.log('Verify item is unread');
    cy.visit('/');
    modulePage.openModulePage(moduleName);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsUnread(0);
    cy.log('Uncheck in checkbox: trackOpeningOfItems');
    basePage.navigateToToolbarPage('Module');
    modulePage.untrackOpeningOfItems(moduleName);
    cy.reload();

    cy.log('Verify item is read');
    cy.visit('/');
    modulePage.openModulePage(moduleName);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsRead(0);
    modulePage.deleteModule(moduleName);
  });

  it('Verify that item can be marked as read / unread manually.', () => {
    const moduleName = 'ModuleTest_' + faker.number.int({ max: 1000000 });
    cy.log('Create new module');
    modulePage.createNewModule(moduleName);

    basePage.navigateToToolbarPage('Module');
    modulePage.editModule(moduleName);
    modulePage.trackOpeningOfItems(moduleName);
    cy.reload();

    cy.log('Verify item is unread');
    cy.visit('/');
    modulePage.openModulePage(moduleName);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsUnread(0);
    cy.log('Mark first item as read');
    gridPage.markFirstItemAsRead();

    cy.log('Verify item is read');
    gridPage.checkTheRequestIsRead(0);

    cy.log('Mark first item as unread');
    gridPage.markFirstItemAsUnread();

    cy.log('Verify item is unread');
    gridPage.checkTheRequestIsUnread(0);
  });
  afterEach(() => {
    it('Should delete a module', () => {
      modulePage.deleteModule();
    });
  });
});
