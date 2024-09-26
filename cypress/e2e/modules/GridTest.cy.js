import { faker } from '@faker-js/faker';

import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import LoginPage from '../../support/pages/auth/LoginPage';

describe('Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();

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
    gridPage.log('Cleanup: Deleting the module');
    it('Should delete a module', () => {
      modulePage.navigateToToolbarPage('Module');
      modulePage.deleteModule(moduleName);
    });
  });

  it('Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.', () => {
    const module = 'ModuleTest_' + faker.number.int({ max: 1000000 });
    moduleName = module;

    modulePage.log('Create new module');
    modulePage.createNewModule(module);
    modulePage.navigateToToolbarPage('Module');

    modulePage.log('Mark before edit module');
    modulePage.editModule(module);
    modulePage.checkTrackOpeningOfItems(module);
    modulePage.loadPage();

    modulePage.log('Verify item is unread');
    modulePage.navigate('/');
    modulePage.openModulePage(module);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsUnread(0);

    modulePage.log('Uncheck in checkbox: Check Track Opening Of Items');
    modulePage.navigateToToolbarPage('Module');
    modulePage.uncheckTrackOpeningOfItems(module);
    modulePage.loadPage();

    modulePage.log('Verify item is read');
    modulePage.navigate('/');
    modulePage.openModulePage(module);
    gridPage.createNewItem();
    gridPage.checkTheRequestIsRead(0);
  });

  it('Verify that item can be marked as read / unread manually.', () => {
    const module = 'ModuleTest_' + faker.number.int({ max: 1000000 });
    moduleName = module;

    modulePage.log('Create new module');
    modulePage.createNewModule(module);
    modulePage.navigateToToolbarPage('Module');

    modulePage.log('Edit module');
    modulePage.editModule(moduleName);
    modulePage.checkTrackOpeningOfItems(moduleName);
    modulePage.loadPage();

    modulePage.log('Verify item is unread');
    modulePage.navigate('/');
    modulePage.openModulePage(moduleName);

    gridPage.createNewItem();
    gridPage.checkTheRequestIsUnread(0);
    gridPage.log('Mark first item as read');
    gridPage.markFirstItemAsRead();

    gridPage.log('Verify item is read');
    gridPage.checkTheRequestIsRead(0);

    gridPage.log('Mark first item as unread');
    gridPage.markFirstItemAsUnread();

    gridPage.log('Verify item is unread');
    gridPage.checkTheRequestIsUnread(0);
  });
});
