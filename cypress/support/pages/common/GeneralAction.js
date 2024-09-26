export default class GeneralAction {
  navigate(url) {
    cy.visit(url);
  }

  clickElement(selector) {
    cy.get(selector).click();
  }

  clickContainsElement(selector, content) {
    cy.get(selector).contains(content).click();
  }

  typeInInput(selector, text) {
    cy.get(selector).type(text);
  }

  verifyHasText(text) {
    cy.get('body').should('contain', text);
  }

  loadPage() {
    cy.reload();
  }
}
