const groceryList = JSON.parse(localStorage.getItem('grocery-list')) || [];
const groceryListDiv = document.getElementById('groceryListDiv');
const templateList = document.getElementById('templateIngredientList');

// Log local storage
console.group('Local storage');
console.log(localStorage);
console.log(`Grocery list (localStorage['grocery-list']):`);
console.log(JSON.parse(localStorage.getItem('grocery-list') || '[]'));
console.groupEnd('Local storage');

groceryList.forEach((ingredientList, index) => {
	if (ingredientList.name === '') {
		return;
	}

	const emptyListHeading = document.getElementById('emptyListHeading');
	if (emptyListHeading) {
		emptyListHeading.remove();
	}

	// Clone new list
	const newList = templateList.cloneNode(true);
	newList.removeAttribute('id');
	newList.classList.remove('d-none');

	// Recipe name
	const recipeName = newList.querySelector('.recipe-name');
	recipeName.textContent = ingredientList.name;

	// Recipe link
	const recipeLink = newList.querySelector('.recipe-link');
	recipeLink.href = `/recipe.html?source=user&id=${index}`;

	// Activate remove button.
	const removeBtn = newList.querySelector('.remove-btn');
	removeBtn.addEventListener('click', function () {
		const groceryList = JSON.parse(localStorage.getItem('grocery-list')) || [];
		groceryList[index].name = '';
		groceryList[index].itemListElement = [];

		localStorage.setItem('grocery-list', JSON.stringify(groceryList));

		location.reload();
	});

	// Ingredients
	const templateCheck = newList.querySelector('.template-check');
	ingredientList.itemListElement.forEach((ingredient, itemIndex) => {
		const newCheck = templateCheck.cloneNode(true);
		newCheck.classList.remove('template-check');
		const newInput = newCheck.querySelector('.form-check-input');
		const newLabel = newCheck.querySelector('.ingredient');

		newInput.checked = ingredient.checked;
		newLabel.textContent = ingredient.name;

		newInput.addEventListener('change', function () {
			ingredientList.itemListElement[itemIndex].checked = newInput.checked;

			const groceryList = JSON.parse(localStorage.getItem('grocery-list')) || [];
			groceryList[index] = ingredientList;

			localStorage.setItem('grocery-list', JSON.stringify(groceryList));
		});

		newList.appendChild(newCheck);
	});
	templateCheck.remove();

	groceryListDiv.appendChild(newList);
});