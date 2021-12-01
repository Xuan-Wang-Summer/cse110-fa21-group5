// main.index.js

import { createIngredientList, createTagList, searchForKey, parseISO } from './util.js';

// ----- Functions -----
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
	const templateCard = document.querySelector('.recipe-card');

	recipeArr.forEach((recipe, index) => {
		// Clone new card
		const newCard = templateCard.cloneNode(true);
		newCard.classList.remove('d-none');

		// Thumbnail
		const thumbnail = newCard.querySelector('.thumbnail');
		thumbnail.src = searchForKey(recipe, 'image').url;
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

// Activate create button
activateCreateBtn();
