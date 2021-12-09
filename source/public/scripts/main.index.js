// main.index.js

import { createIngredientList, createTagList, searchForKey, parseISO } from './util.js';

// ----- Functions -----
/**
 * Recipe search bar logic.
 */
function activateSearchBar() {
	const searchBar = document.getElementById('recipeSearchBar');
	searchBar.addEventListener('input', function () {
		const searchTxt = searchBar.value; // Get search query
		const currentList = document.querySelector('#recipeTabsContent .tab-pane.active .row');
		const recipeCards = currentList.querySelectorAll('.recipe-card');

		recipeCards.forEach((recipeCard) => {
			const title = recipeCard.querySelector('a.title').textContent;

			const regex = new RegExp(`${searchTxt}`, 'gi');

			if (regex.test(title)) {
				recipeCard.classList.remove('d-none');
			} else {
				recipeCard.classList.add('d-none');
			}
		});
	});
}

/**
 * "Create new recipe" button logic.
 */
function activateCreateBtn() {
	const createBtn = document.getElementById('createBtn');
	createBtn.addEventListener('click', function () {
		/**
		 * Fetch template recipe schema for new recipe.
		 */
		fetch('/data/recipe-schema.json')
			.then((response) => response.json())
			.then((recipeSchema) => {
				/**
				 * Create new recipe.
				 */
				// Retreive recipes array and push new recipe.
				const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
				userRecipes.push(recipeSchema);

				// Update recipes array in storage.
				localStorage.setItem('recipes', JSON.stringify(userRecipes));

				// Redirect user to their new recipe.
				window.location.href = `/recipe.html?source=user&id=${userRecipes.length - 1}#new`;
			})
			.catch((err) => console.error(err));
	});
}

function createCards(recipeArr, source, parent) {
	const templateCard = document.getElementById('templateCard');

	recipeArr.forEach((recipe, index) => {
		if (source === 'bookmark' && !recipe.bookmarked) {
			return;
		}

		// Clone new card
		const newCard = templateCard.cloneNode(true);
		newCard.removeAttribute('id');
		newCard.classList.remove('d-none');

		// Thumbnail
		const thumbnail = newCard.querySelector('.thumbnail');
		thumbnail.src = searchForKey(recipe, 'image').url || 'https://via.placeholder.com/172x288?text=No+image+found';
		thumbnail.alt = searchForKey(recipe, 'name');

		// Rating
		const rating = newCard.querySelector('.rating');
		const ratingValue = parseFloat(searchForKey(recipe, 'ratingValue'));
		if (ratingValue) {
			rating.src = `/images/stars/${Math.round(ratingValue)}-star.svg`;
			rating.alt = `${ratingValue} stars`;
		} else {
			rating.classList.add('d-none');
		}

		// Title
		const title = newCard.querySelector('.title');
		title.textContent = searchForKey(recipe, 'name');
		title.title = title.textContent;
		const params = new URLSearchParams();
		params.append('source', source);
		params.append('id', index);
		title.href = `/recipe.html?${params}`;

		// Tags
		const tags = newCard.querySelector('.tags');
		tags.textContent = searchForKey(recipe, 'tags') || createTagList(recipe).string;

		// Bookmark symbol
		if (recipe.bookmarked) {
			const bookmarkSymbol = document.createElement('i');
			bookmarkSymbol.classList = 'fas fa-xs fa-bookmark text-primary';
			newCard.querySelector('.card-title').append(bookmarkSymbol);
		}

		// Author
		const author = newCard.querySelector('.author');
		author.textContent = searchForKey(recipe, 'author').name;

		// Cook time
		const cookTime = newCard.querySelector('.cook-time');
		cookTime.textContent = parseISO(searchForKey(recipe, 'totalTime'));

		// Description
		const description = newCard.querySelector('.description');
		description.textContent = searchForKey(recipe, 'description');

		// Ingredients
		const ingredients = newCard.querySelector('.ingredients');
		ingredients.textContent = createIngredientList(searchForKey(recipe, 'recipeIngredient'));

		parent.appendChild(newCard);
	});
}

// ----- Page Initialization -----
/**
 * Fetch preset recipes to populate frontend.
 */
fetch('/data/recipe-data.json')
	.then((response) => response.json())
	.then((presetRecipes) => {
		for (const source in presetRecipes) {
			createCards(presetRecipes[source], source, document.getElementById('presetCardGrid'));
		}
	})
	.catch((err) => console.error(err));

/**
 * Fetch user recipes to populate frontend.
 */
const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
createCards(userRecipes, 'user', document.getElementById('userCardGrid'));
createCards(userRecipes, 'bookmark', document.getElementById('bookmarkCardGrid'));

// Activate create button
activateCreateBtn();

// Activate drawer search bar
activateSearchBar();
