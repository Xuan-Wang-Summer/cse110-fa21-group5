// main.planner.js

import { createIngredientList, createTagList, searchForKey, parseISO } from './util.js';

// ----- Functions -----

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

		// Title
		const title = newCard.querySelector('.title');
		title.textContent = searchForKey(recipe, 'name');
		title.title = title.textContent;
		const params = new URLSearchParams();
		params.append('source', source);
		params.append('id', index);
		title.href = `/recipe.html?${params}`;

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

