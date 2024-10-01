export default class GeneralAction {
  /**
   * Navigate to another route
   * @param url
   */
  navigate(url) {
    cy.visit(url);
    return this;
  }

  /**
   * Click on element
   * @param selector - The selector
   * @param isForce
   * @returns {GeneralAction}
   */
  clickElement(selector, isForce = false) {
    cy.get(selector).should('exist').click({force: isForce});
    return this;
  }

  /**
   * Click on an element which contains some text
   * @param selector
   * @param text
   * @param force
   * @returns {GeneralAction}
   */
  clickElementContainsText(selector, text, force = false) {
    cy.get(selector).contains(text).click({force: force});
    return this;
  }


  // Hàm này bị dư
  /**
   * Click on an element which contain some text that has assertion
   * @param selector
   * @param content -Text that should be included
   * @param condition
   * @param force
   */
  clickContainsElementHasAssertion(selector, content, condition, force = false) {
    cy.get(selector).contains(content).should(condition).click({force: force});
    return this;
  }

  /**
   * Click the first element in list
   * @param selector
   */
  clickFirstElement(selector) {
    cy.get(selector).first().click();
    return this;
  }

  /**
   * Input data to field
   * @param selector
   * @param text
   */
  typeInInput(selector, text) {
    cy.get(selector).type(text);
    return this;
  }

  /**
   * Reload page
   */
  loadPage() {
    cy.reload();
    return this;
  }

  /**
   * Console log
   * @param text
   */
  log(text) {
    cy.log(text);
    return this;
  }

  /**
   * Assertion the text is existed
   * @param selector - The element that is selected
   * @param text - Test should be included
   */
  verifyHasText(selector, text) {
    cy.get(selector).should('contain', text);
    return this;
  }

  /**
   * Verify Text of selector with condition
   * @param selector - The selector
   * @param content
   * @param condition
   */
  verifyShouldContains(selector, content, condition) {
    cy.get(selector).contains(content).should(condition);
    return this;
  }

  /**
   * Verify an element
   * @param selector
   * @param condition
   * @returns {GeneralAction}
   */
  verifyShould(selector, condition) {
    cy.get(selector).should(condition);
    return this;
  }
}
