import LoginPage from '../../support/pages/auth/LoginPage';

describe('Login Functionality', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.navigate(Cypress.config().baseUrl); // Navigate to the login page before each test
  });

  it('should log in with valid credentials', () => {
    cy.fixture('account.json').then((account) => {
      loginPage.login(
        account.exampleAccount.email,
        account.exampleAccount.password,
      );
    });
    loginPage.verifyLoginSuccess();
  });
});
