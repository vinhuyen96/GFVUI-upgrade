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
  clickElementContains(selector, content) {
    cy.get(selector).contains(content).click();
  }

  /**
   * Click on a element which contain some text that has assertion
   * @param selector
   * @param content -Text that should be included
   * @param condition
   */
  clickContainsElementHasAssertion(selector, content, condition) {
    cy.get(selector).contains(content).should(condition).click();
  }

  /**
   * Click the first element in list
   * @param selector
   */
  clickFirstElement(selector) {
    cy.get(selector).first().click();
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

  /**
   * Assertion the text is existed
   * @param selector - The element that is selected
   * @param text - Test should be included
   */
  verifyHasText(selector, text) {
    cy.get(selector).should('contain', text);
  }

  /**
   * Verify Text of selector with condition
   * @param selector - The selector
   * @param content
   * @param condition
   */
  verifyShouldContains(selector, content, condition) {
    cy.get(selector).contains(content).should(condition);
  }

  verifyShould(selector, condition) {
    cy.get(selector).should(condition);
  }
}
