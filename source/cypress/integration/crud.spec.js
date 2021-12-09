// Some helpful resources:
// Assertions: https://docs.cypress.io/guides/references/assertions#BDD-Assertions
// The `local_storage.spec.js` file in `cypress/integration/2-advanced-examples`

describe('CRUD Tests', () => {
	it('Create recipe from scratch', () => {
		// Visit home page
		cy.visit('index.html');

		// Clicking create button should:
		// - Create a new recipe in storage
		// - Create an empty ingredient list in the grocery list storage
		// - Not affect the meal planner storage
		cy.get('#createBtn')
			.click()
			.should(() => {
				expect(localStorage.getItem('recipes')).to.not.empty;
				expect(localStorage.getItem('grocery-list')).to.not.empty;
				expect(localStorage.getItem('meal-planner')).to.be.null;
			});

		// Clear local storage
		cy.clearLocalStorage();
	});

	// TODO: Clone preset recipe

	// TODO: Edit recipe

	// TODO: Delete recipe

	// TODO: Clear recipes button
});
