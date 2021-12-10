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

	it('Clone a preset recipe', () => {
		cy.visit('index.html');

		// Clicking 'Add Recipe' button should:
		// - Clone the recipe and populate within the 'Your Recipes' page
		// - Not affect the meal planner storage
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon'")
			.click();
		cy.get('#addBtn')
			.click()
			.should(() => {
				expect(localStorage.getItem('recipes')).to.not.empty;
				expect(localStorage.getItem('meal-planner')).to.be.null;
			});
	});

	it('Edit a recipe', () => {
		cy.visit('index.html');

		// Add a preset recipe
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon'")
			.click();
		cy.get('#addBtn')
			.click();
		// Nav back to recipes page
		cy.get("[data-bs-original-title='Recipes'")
			.click();
		// Nav to recipe which was just added
		cy.get('#navUserTab')
			.click();
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon']")
			.eq(1)
			.click();
		// Click edit button and replace recipe source with 'My Name Here'
		cy.get('#editBtn')
			.click();
		cy.get('#sourceInput')
			.type('{selectAll}')
			.type('{backspace}')
			.type('My Name Here');
		// Now recipe's author has been edited, so extract it from local storage and confirm the value is as expected
		cy.should(() => {
			// Local storage returns a string, so must necessary to parse it first
			expect(JSON.parse(localStorage.getItem('recipes'))[0].author.name).to.equal('My Name Here');
		});
		
	});

	it('Delete a recipe', () => {
		cy.visit('index.html');

		// Add a preset recipe
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon'")
			.click();
		cy.get('#addBtn')
			.click();
		// Nav back to recipes page
		cy.get("[data-bs-original-title='Recipes'")
			.click();
		// Nav to recipe which was just added
		cy.get('#navUserTab')
			.click();
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon']")
			.eq(1)
			.click();
		// Select delete on the recipe just added
		cy.get('#deleteBtn')
			.click();
		cy.get('#confirmDeleteBtn')
			.click()
			.should(() => {
				// No recipes should exist
				expect(JSON.parse(localStorage.getItem('recipes'))).to.be.empty;
			});
	})

	it('Delete all recipes', () => {
		// Add a preset recipe
		cy.get("[title='Green tea noodles with sticky sweet chilli salmon'")
			.click();
		cy.get('#addBtn')
			.click();
		// Nav back to recipes page
		cy.get("[data-bs-original-title='Recipes'")
			.click();
		// Clear all recipes
		cy.get('#clearBtn')
			.click();
		cy.get('#confirmClearBtn')
			.click()
			.should(() => {
				// No recipes should exist (including the array)
				expect(JSON.parse(localStorage.getItem('recipes'))).to.be.null;
			})
	})
});
