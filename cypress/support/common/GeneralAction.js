export default class GeneralAction {
  /**
   * Navigate to another route
   * @param url
   */
  navigate(url) {
    cy.visit(url);
  }

  /**
   * Click on a element
   * @param selector
   */
  clickElement(selector) {
    cy.get(selector).click();
  }

  /**
   * Click on a element which contains some text
   * @param selector
   * @param content
   */
  clickContainsElement(selector, content) {
    cy.get(selector).contains(content).click();
  }

  /**
   * Input data to field
   * @param selector
   * @param text
   */
  typeInInput(selector, text) {
    cy.get(selector).type(text);
  }

  /**
   * Assertion the text is existed
   * @param text
   */
  verifyHasText(text) {
    cy.get('body').should('contain', text);
  }

  /**
   * Reload page
   */
  loadPage() {
    cy.reload();
  }

  /**
   * Console log
   * @param text
   */
  log(text) {
    cy.log(text);
  }
}
