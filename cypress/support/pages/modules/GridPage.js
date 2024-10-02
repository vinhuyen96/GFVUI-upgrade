import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();

    // Grid action selector
    this.actionField = '.dx-datagrid-drag-action';
    this.btnAddNewItem = '.dx-button-content .dx-button-text';
    this.btnSubmit = 'button.btn-primary';

    // Icon selector
    this.iconEnvelopOpened = 'table tr .fa-envelope-open';
    this.iconEnvelopClosed = 'table tr .fa-envelope';
    this.iconEnvelopOpen = '.dx-icon.fas.fa-envelope-open';
  }

  /**
   * Check the request is unread
   * @returns {GridPage}
   */
  checkTheRequestIsUnread() {
    this.log('Check the envelope is closed');
    cy.get(this.actionField)
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.verifyShould(this.iconEnvelopOpen, 'exist');
    return this;
  }

  checkTheRequestIsRead() {
    this.log('Check the envelope is opened');
    cy.get(this.actionField)
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.verifyShould(this.iconEnvelopOpen, 'not.exist');
    return this;
  }

  createNewItem() {
    return this
      .clickElementContainsText(this.btnAddNewItem, 'NEW')
      .clickElementContainsText(this.btnSubmit, 'Submit');
  }

  markFirstItemAsUnread() {
    return this
      .clickFirstElement(this.iconEnvelopClosed);
  }

  markFirstItemAsRead() {
    return this
      .clickFirstElement(this.iconEnvelopClosed);
  }
}

export default GridPage;
