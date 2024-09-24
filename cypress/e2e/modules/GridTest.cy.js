import GridPage from "../../support/pages/modules/GridPage";
import ModulePage from "../../support/pages/modules/ModulePage";
import HomePage from "../../support/pages/home/HomePage";

describe('Should run grid page', () => {
	const gridPage =  new GridPage()
	const modulePage = new ModulePage()
	const homePage = new HomePage()
	beforeEach(() => {
		cy.login()
	})
	const checkBeforeVerify = () => {
		const moduleName = "Module_" + faker.random.number();

		cy.log("Create new module");
		modulePage.createNewModule(moduleName);

		cy.log("Check in checkbox: trackOpeningOfItems");
		homePage.navigateToToolbarPage("Module");
		modulePage.trackOpeningOfItems(moduleName);
		cy.reload();

		cy.log("Verify item is unread");
		cy.visit("/");
		modulePage.openModulePage(moduleName);
		gridPage.createNewItem();
		gridPage.checkIfRequestIsUnread(0);
	}

	it("349. 351. Verify that when feature is enabled/disable, unread items will /will not be highlighted with bold text.", () => {
	  checkBeforeVerify()
		cy.log("Uncheck in checkbox: trackOpeningOfItems");
		homePage.navigateToToolbarPage("Module");
		modulePage.untrackOpeningOfItems(moduleName);
		cy.reload();

		cy.log("Verify item is read");
		cy.visit("/");
		cy.openModulePage(moduleName);
		cy.createNewItem();
		cy.checkIfRequestIsRead(0);
	});

	it("352. 353. Verify that item can be marked as read / unread manually.", () => {

		cy.log("Mark first item as read");
		cy.markFirstItemAsRead();

		cy.log("Verify item is read");
		cy.checkIfRequestIsRead(0);

		cy.log("Mark first item as unread");
		cy.markFirstItemAsUnread();

		cy.log("Verify item is unread");
		cy.checkIfRequestIsUnread(0);
	});
})
