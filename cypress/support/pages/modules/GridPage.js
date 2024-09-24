import BasePage from "../BasePage";

class GridPage extends BasePage{
	constructor() {
		super()

	}
	checkIfRequestIsUnread(line) {
		cy.log('checkIfRequestIsUnread')
		cy.get('.glyphicon.glyphicon-edit').should('be.visible')
		cy.get('tr.dx-data-row').eq(line).then($row => {
			cy.wrap($row).find('td').each(($el, index) => {
				if (index > 0) {
					cy.wrap($el).should('have.css', 'font-weight', '900')
				}
			})
		})
	}

	checkIfRequestIsRead(line) {
		cy.log('checkIfRequestIsRead')
		cy.get('.glyphicon.glyphicon-edit').should('be.visible')
		cy.get('tr.dx-data-row').eq(line).then($row => {
			cy.wrap($row).find('td').each(($el, index) => {
				if (index > 0) {
					cy.wrap($el).should('have.css', 'font-weight', '400')
				}
			})
		})
	}

	waitGridFinishLoading() {
		cy.get('dx-loadindicator-icon').should('not.exist')
	}

	createNewItem() {
		cy.xpath("//dx-button//span[text()='NEW']").should('be.visible').click()
		cy.get('button').contains('Submit').click()
	}

	selectDropdown(item) {
		cy.get('.viewSelectBox').click()
		cy.get('.dx-list-item').contains(item).click()
	}

	markFirstItemAsUnread() {
		cy.get('table tr .fa-envelope-open').first().click()
		cy.wait(2000) // Wait for animation
	}

	markFirstItemAsRead() {
		cy.get('table tr .fa-envelope').first().click()
		cy.wait(2000) // Wait for animation
	}

	createNewTestPlanItem(projectName) {
		cy.xpath("//dx-button//span[text()='NEW']").should('be.visible').click()
		cy.get('input#ID_ProjectName').type(projectName)
		cy.get('button').contains('Submit').click()
	}

	openCreateNewTestPlanItemForm() {
		cy.xpath("//dx-button//span[text()='NEW']").should('be.visible').click();
	}

	editTestPlanItem(projectName) {
		cy.wait(2000); // Avoid element detach from DOM
		cy.xpath(`//tr//td[text()="${projectName}"]/..//i[contains(@class,"glyphicon-pencil")]`).click();
	}

	refreshGrid() {
		cy.get('.dx-icon-refresh').click();
		cy.get('.dx-state-invisible .dx-loadpanel-indicator').should('exist')
	}

	createNewSubTask(crop, customer, dealer, division, state, fieldContact, date) {
		cy.get('a[ng-click="addNewSubtask()"]').click()
		cy.get('#ID_Crop').select(crop)
		cy.get('#ID_Customer').select(customer)
		cy.get('#ID_Dealer').select(dealer)
		cy.get('#ID_Division').select(division)
		cy.get('#ID_StateCountry').select(state)
		cy.get('#ID_FieldContact').select(fieldContact)
		cy.get('.datetimetable input').first().type(date, {force: true})
		cy.xpath('(//button[text()="Save"])[1]').click()
	}

	verifySubTaskInfoInGrid(crop, customer, dealer, division, state, fieldContact) {
		cy.get('.ui-grid-canvas').contains(crop).should('exist')
		cy.get('.ui-grid-canvas').contains(customer).should('exist')
		cy.get('.ui-grid-canvas').contains(dealer).should('exist')
		cy.get('.ui-grid-canvas').contains(division).should('exist')
		cy.get('.ui-grid-canvas').contains(state).should('exist')
		cy.get('.ui-grid-canvas').contains(fieldContact).should('exist')
	}
}

export default GridPage
