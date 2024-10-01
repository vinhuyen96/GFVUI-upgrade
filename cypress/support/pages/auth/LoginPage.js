import GeneralAction from '../../common/GeneralAction';

class LoginPage extends GeneralAction {
  constructor() {
    super();
    this.inputUserEmail = 'input[name="Email"]';
    this.inputUserPassword = 'input[name="Password"]';
    this.btnLogin = 'input[name="Login"]';
  }

  verifyLoginSuccess() {
    return this.verifyHasText('header', 'Home');
  }

  login(email, password) {
    return this
      .navigate('/')
      .typeInInput(this.inputUserEmail, email)
      .typeInInput(this.inputUserPassword, password)
      .clickElement(this.btnLogin);
  }

  // verifyLoginFailure() {
  //   //cy.get('body').should('contain', 'User or Password is not valid')
  // }
}

export default LoginPage;
