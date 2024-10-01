import { faker } from '@faker-js/faker';

import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import LoginPage from '../../support/pages/auth/LoginPage';

describe('Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();

  let moduleName = `ModuleTest_${faker.number.int({ max: 1000000 })}`;

  beforeEach(() => {
    cy.fixture('account.json').then((account) => {
      loginPage.login(
        account.exampleAccount.email,
        account.exampleAccount.password,
      );
    });
    loginPage.verifyLoginSuccess();
  });

  after(() => {
    // To ensure that the deleteModule function runs after the tests
    modulePage
      .log(`Cleanup: Deleting the module${modulePage}`)
      .navigateToPage('Module')
      .verifyModulePageVisible()
      .deleteModule(moduleName);
  });

  it('Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.', () => {
    modulePage
      .log('Create new module')
      .createNewModule(moduleName)

      .log('Go to module page')
      .navigateToPage('Module')

      .log('Mark before edit module')
      .editModule(moduleName)

      .log('Check at track opening of items')
      .checkTrackOpeningOfItems()
      .loadPage()

      .log('Verify item is unread')
      .openModulePage(moduleName);

    gridPage
      .log('Create new item 1')
      .createNewItem()
      .checkTheRequestIsUnread();

    modulePage
      .log('Uncheck in checkbox: Check Track Opening Of Items')
      .navigateToPage('Module')

      .log('Edit module')
      .editModule(moduleName)

      .log('Uncheck at track opening of items')
      .uncheckTrackOpeningOfItems()
      .loadPage();

    modulePage
      .log('Verify item is read')
      .openModulePage(moduleName)
      .log('went to module');

    gridPage
      .log('Create new item 2')
      .createNewItem()
      .checkTheRequestIsRead();
  });

  it('Verify that item can be marked as read / unread manually.', () => {
    modulePage
      .log('Navigate to module page')
      .navigateToPage('Module')

      .log('Edit module')
      .editModule(moduleName)

      .log('Check at track opening of items')
      .checkTrackOpeningOfItems()
      .loadPage()

      .log('Verify item is unread')
      .openModulePage(moduleName);

    gridPage
      // .log('Creat new item')
      // .createNewItem()
      .log('Check the request is unread ')
      .checkTheRequestIsUnread()

      .log('Mark first item as unread')
      .markFirstItemAsUnread()

      .log('Verify item is read')
      .checkTheRequestIsRead()

      .log('Mark first item as read')
      .markFirstItemAsRead()

      .log('Verify item is unread')
      .checkTheRequestIsUnread();
  });
});
