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
   * Click on a element which contain some text that has assertion
   * @param selector
   * @param content
   * @param condition
   */
  clickContainsElementHasAssertion(selector, content, condition) {
    cy.get(selector).contains(content).should(condition).click();
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

  assertionContainsShould(selector, content, attribute) {
    cy.get(selector).contains(content).should(attribute);
  }

  assertionShould(selector, attribute) {
    cy.get(selector).should(attribute);
  }
}
