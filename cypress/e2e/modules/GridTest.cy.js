import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import HomePage from '../../support/pages/home/HomePage';
import LoginPage from '../../support/pages/auth/LoginPage';

import { faker } from '@faker-js/faker';

describe('Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();
  const homePage = new HomePage();

  const moduleName = 'ModuleTest_' + faker.number.int({ max: 1000000 });

  beforeEach(() => {
    loginPage.login();
    loginPage.verifyLoginSuccess();
  });

  const checkBeforeVerify = () => {
    cy.log('Create new module');
    modulePage.createNewModule(moduleName);

    homePage.navigateToToolbarPage('Module');
    modulePage.editModule(moduleName);
    modulePage.trackOpeningOfItems(moduleName);
    cy.reload();

    cy.log('Verify item is unread');
    cy.visit('/');
    modulePage.openModulePage(moduleName);
    gridPage.createNewItem();
    gridPage.checkIfRequestIsUnread(0);
  };

  it('Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.', () => {
    checkBeforeVerify();
    cy.log('Uncheck in checkbox: trackOpeningOfItems');
    homePage.navigateToToolbarPage('Module');
    modulePage.untrackOpeningOfItems(moduleName);
    cy.reload();

    cy.log('Verify item is read');
    cy.visit('/');
    modulePage.openModulePage(moduleName);
    gridPage.createNewItem();
    gridPage.checkIfRequestIsRead(0);
  });

  it('Verify that item can be marked as read / unread manually.', () => {
    cy.log('Mark first item as read');
    gridPage.markFirstItemAsRead();

    cy.log('Verify item is read');
    gridPage.checkIfRequestIsRead(0);

    cy.log('Mark first item as unread');
    gridPage.markFirstItemAsUnread();

    cy.log('Verify item is unread');
    gridPage.checkIfRequestIsUnread(0);
  });
});
