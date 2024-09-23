import AddNewModulePage from "../../support/pages/modules/AddNewModulePage";
import { faker } from '@faker-js/faker';

describe('Verify create new module successfully', () => {
	const newModulePage = new AddNewModulePage()
	beforeEach(() => {
		cy.login()
	})
	it('create a new module successfully', () => {
		newModulePage.navigate(`${Cypress.config().baseUrl}Home/V2#/module/create`)
		newModulePage.enterInternalName(faker.person.firstName())
		newModulePage.enterDisplayName(faker.person.firstName())
		newModulePage.enterDescription(faker.lorem.paragraph())
		newModulePage.submitForm()
	});

})
