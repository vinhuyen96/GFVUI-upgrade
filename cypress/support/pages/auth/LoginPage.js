import GeneralAction from '../../common/GeneralAction';

class LoginPage extends GeneralAction {
  constructor() {
    super();
    this.inputUserEmail = 'input[name="Email"]';
    this.inputUserPassword = 'input[name="Password"]';
    this.btnLogin = 'input[name="Login"]';
  }

  verifyLoginSuccess() {
    this.verifyTextVisible('header', 'Home');
    this.verifyShould('.dx-loadpanel-content-wrapper', 'be.visible');
    this.verifyShould('.dx-loadpanel-content-wrapper', 'be.not.visible');
  }

  login(email, password) {
    this.navigate('/');
    this.typeInInput(this.inputUserEmail, email);
    this.typeInInput(this.inputUserPassword, password);
    this.clickElement(this.btnLogin);
  }

  // verifyLoginFailure() {
  //   //cy.get('body').should('contain', 'User or Password is not valid')
  // }
}

export default LoginPage;
