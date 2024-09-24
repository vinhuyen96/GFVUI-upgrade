import ModulePage from "../../support/pages/modules/ModulePage";

describe('Verify create new module successfully', () => {
	const newModulePage = new ModulePage()
	beforeEach(() => {
		cy.login()
	})
	it('create a new module successfully', () => {
		newModulePage.createNewModule()
	});

})
