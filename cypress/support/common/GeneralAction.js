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
   * Click on an element
   * @param selector
   * @param isForce
   */
  clickElement(selector, isForce = false) {
    cy.get(selector).should('exist').click({ force: isForce });
    return this;
  }

  /**
   * Click on an element which contains some text
   * @param selector
   * @param text
   * @param isForce
   */
  clickElementContainsText(selector, text, isForce = false) {
    cy.get(selector).contains(text).click({ force: isForce });
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
  verifyTextVisible(selector, text) {
    cy.get(selector).should('contain', text);
    return this;
  }

  /**
   * Verify Text of selector with condition
   * @param selector - The selector
   * @param text
   * @param condition
   */
  verifyShouldContainsText(selector, text, condition) {
    cy.get(selector).contains(text).should(condition);
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
