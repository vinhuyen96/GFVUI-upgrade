import BasePage from '../BasePage';

class GridPage extends BasePage {
  constructor() {
    super();
    this.iconEnvelopOpen = '.dx-icon.fas.fa-envelope-open';
    this.actionField = '.dx-datagrid-drag-action';
    this.btnAddNewItem = '.dx-button-content .dx-button-text';
    this.btnSubmit = 'button';
    this.iconEnvelopOpened = 'table tr .fa-envelope-open';
    this.iconEnvelopClosed = 'table tr .fa-envelope';
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
    cy.get(this.actionField)
      .contains('Actions')
      .invoke('css', 'width', '500px')
      .trigger('change');
    this.log('Check the envelope is opened');
    this.verifyShould(this.iconEnvelopOpen, 'not.exist');
    return this;
  }

  createNewItem() {
    return this
      .clickElementContains(this.btnAddNewItem, 'NEW')
      .clickElementContains(this.btnSubmit, 'Submit');
  }

  markFirstItemAsUnread() {
    return this
      .clickFirstElement(this.iconEnvelopOpened);
  }

  markFirstItemAsRead() {
    return this.clickFirstElement(this.iconEnvelopClosed);
  }
}

export default GridPage;
