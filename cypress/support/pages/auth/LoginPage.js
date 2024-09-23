import BasePage from '../BasePage';

class LoginPage extends BasePage {
	constructor() {
		super();
		this.userEmail = 'input[name="Email"]'
		this.userPassword = 'input[name="Password"]'
		this.loginButton = 'input[name="Login"]'
	}

	enterUserEmail(email) {
		this.typeInInput(this.userEmail, email)
	}

	enterUserPassword(password) {
		this.typeInInput(this.userPassword, password)
	}

	clickLogin() {
		this.clickElement(this.loginButton)
	}

	verifyLoginSuccess() {
		this.verifyTextInBody('Home')
	}

	verifyLoginFailure() {
		//cy.get('body').should('contain', 'User or Password is not valid')
	}
}

export default LoginPage
