import BasePage from "../BasePage";

class AddNewModulePage extends BasePage {
	constructor() {
		super()
		this.internalName = 'input[name="name"]'
		this.displayName = '[placeholder="Display Name"]'
		this.description = '[placeholder="Description"'
		this.btnSubmit = 'button[type="submit"]'
	}
	enterInternalName(internalName) {
		this.typeInInput(this.internalName, internalName)
	}
	enterDisplayName(displayName) {
		this.typeInInput(this.displayName, displayName)
	}
	enterDescription(des) {
		this.typeInInput(this.description, des)
	}
	submitForm() {
		this.clickElement(this.btnSubmit)
	}
}
export default AddNewModulePage
