Cypress.Commands.add('login', () => {
	cy.fixture('account.json').then((account) => {
		cy.visit(Cypress.config().baseUrl)
		cy.get('input[name="Email"]').should('be.enabled').clear().type(account.exampleAccount.email)
		cy.get('input[name="Password"]').clear().type(account.exampleAccount.password)
		cy.get('input[name="Login"]').contains('Log in').click()
	});
	cy.contains('Home').should('be.visible');
});

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
	console.log('error', err);
	console.log('runnable', runnable);
	return false;
});
