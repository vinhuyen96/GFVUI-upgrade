import { faker } from '@faker-js/faker';

import LoginPage from '../../support/pages/auth/LoginPage';
import ProfilePage from '../../support/pages/profile/ProfilePage';

describe('Profile Test', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();

  let currentPassword;
  let newPassword = faker.internet.password();

  beforeEach(() => {
    cy.fixture('account').then((account) => {
      profilePage.navigate('/');

      loginPage.login(
        account.exampleAccount.email,
        account.exampleAccount.password,
      );

      profilePage.navigate('/Home/V2#/profile');
      profilePage.verifyHomePageIsOpen();
      profilePage.closeLeftMenu(); // Because element is hiding when left menu is open. So we need to close it
    });
  });

  it('Change Password', () => {
    profilePage.changePassword(currentPassword, newPassword);

    profilePage.assertionContainsShould(
      'div',
      'Password changed successfully',
      'be.visible',
    );

    // Change pwd back
    profilePage.changePassword(newPassword, currentPassword);
  });

  it('Remove Signature', () => {
    profilePage.addSignature();
    profilePage.assertionShould('#dropzone-image', 'exist');
    profilePage.clickContainsElement('a', 'Cancel');
    // think the way to wait page load
    profilePage.assertionShould('#dropzone-image', 'not.exist');
  });
});
