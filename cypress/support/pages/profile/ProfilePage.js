import BasePage from '../BasePage';

export default class ProfilePage extends BasePage {
  constructor() {
    super();
    this.inputCurrentPassword = '[name="currentPassword"]';
    this.inputNewPassword = '[name="newPassword"]';
    this.inputConfirmPassword = '[name="confirmNewPassword"]';
  }

  clickOnChangePassword() {
    cy.get('a').contains('Change Password').should('be.visible').click();
  }

  changePassword(currentPassword, newPassword) {
    this.clickOnChangePassword();
    this.typeInInput(this.inputCurrentPassword, currentPassword);
    this.typeInInput(this.inputNewPassword, newPassword);
    this.typeInInput(this.inputConfirmPassword, newPassword);
    this.clickElementContains('a', 'Save');
  }

  addSignature() {
    this.clickElementContains('a', 'Add Signature');
    this.clickElement('#dropzone-external');
  }
}
