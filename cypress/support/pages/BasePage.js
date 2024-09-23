class BasePage {

	navigate(url) {
		cy.visit(url)
	}

	clickElement(selector) {
		cy.get(selector).click()
	}

	typeInInput(selector, text) {
		cy.get(selector).type(text)
	}

	verifyTextInBody(text) {
		cy.get('body').should('contain', text)
	}
}

export default BasePage;
