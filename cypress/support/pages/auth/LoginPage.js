import BasePage from '../BasePage';

class LoginPage extends BasePage {
  constructor() {
    super();
    this.inputUserEmail = 'input[name="Email"]';
    this.inputUserPassword = 'input[name="Password"]';
    this.btnLogin = 'input[name="Login"]';
  }

  verifyLoginSuccess() {
    this.verifyTextInBody('Home');
  }

  login(email, password) {
    this.typeInInput(this.inputUserEmail, email);
    this.typeInInput(this.inputUserPassword, password);
    this.clickElement(this.btnLogin);
  }

  verifyLoginFailure() {
    //cy.get('body').should('contain', 'User or Password is not valid')
  }
}

export default LoginPage;
