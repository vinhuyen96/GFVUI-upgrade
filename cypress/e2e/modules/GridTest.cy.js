import GridPage from '../../support/pages/modules/GridPage';
import ModulePage from '../../support/pages/modules/ModulePage';
import LoginPage from '../../support/pages/auth/LoginPage';

describe('T001. Should run grid page', () => {
  const loginPage = new LoginPage();
  const gridPage = new GridPage();
  const modulePage = new ModulePage();

  const day = new Date();
  const moduleName = `ModuleTestT001_${day.getDate()}${day.getFullYear()}${day.getMonth()}${day.getHours()}${day.getMinutes()}${day.getSeconds()}`;
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
      .verifyModulePageVisible()

      .log('Mark before edit module')
      .editModule(moduleName)

      .log('Check at track opening of items')
      .checkTrackOpeningOfItems()

      .log('Verify item is unread')
      .navigate('/')
      .openModulePage(moduleName)
      .verifyPageStable();

    gridPage
      .log('Create new item 1')
      .createNewItem()
      .checkTheRequestIsUnread();

    modulePage
      .log('Uncheck in checkbox: Check Track Opening Of Items')
      .navigateToPage('Module')
      .verifyModulePageVisible()

      .log('Edit module')
      .editModule(moduleName)

      .log('Uncheck at track opening of items')
      .uncheckTrackOpeningOfItems();

    modulePage
      .log('Verify item is read')
      .navigate('/')
      .openModulePage(moduleName)
      .verifyPageStable();

    gridPage
      .log('Create new item 2')
      .createNewItem()
      .checkTheRequestIsRead();
  });

  // it('Verify that item can be marked as read / unread manually.', () => {
  //   const module= `ModuleTest_${faker.number.int({ max: 1000000 })}`;
  //   moduleName = module;
  //   modulePage
  //     .log('Navigate to module page')
  //     .navigateToPage('Module')
  //
  //     .log('Edit module')
  //     .editModule(moduleName)
  //
  //     .log('Check at track opening of items')
  //     .checkTrackOpeningOfItems()
  //     .loadPage()
  //
  //     .log('Verify item is unread')
  //     .openModulePage(moduleName);
  //
  //   gridPage
  //     // .log('Creat new item 3')
  //     // .createNewItem()
  //
  //     .log('Verify item is read')
  //     .checkTheRequestIsRead()
  //
  //     .log('Mark first item as unread')
  //     .markFirstItemAsUnread()
  //
  //     .log('Check the request is unread')
  //     .checkTheRequestIsUnread()
  //
  //     .log('Mark first item as read')
  //     .markFirstItemAsRead()
  //
  //     .log('Verify item is unread')
  //     .checkTheRequestIsUnread();
  // });
});
