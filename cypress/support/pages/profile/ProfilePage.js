import BasePage from '../BasePage';

export default class ProfilePage extends BasePage {
  constructor() {
    super();
    this.inputCurrentPassword = '[name="currentPassword"]';
    this.inputNewPassword = '[name="newPassword"]';
    this.inputConfirmPassword = '[name="confirmNewPassword"]';
  }

  clickOnChangePassword() {
    return this.cy.get('a').contains('Change Password').should('be.visible').click();
  }

  changePassword(currentPassword, newPassword) {
    return this
      .clickOnChangePassword()
      .typeInInput(this.inputCurrentPassword, currentPassword)
      .typeInInput(this.inputNewPassword, newPassword)
      .typeInInput(this.inputConfirmPassword, newPassword)
      .clickElementContainsText('a', 'Save');
  }

  addSignature() {
    return this
      .clickElementContainsText('a', 'Add Signature')
      .clickElement('#dropzone-external');
  }
}
