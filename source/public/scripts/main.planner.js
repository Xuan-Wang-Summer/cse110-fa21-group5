// main.planner.js

import { searchForKey } from './util.js';

const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Log local storage
console.group('Local storage');
console.log(localStorage);
console.log(`Grocery list (localStorage['meal-planner']):`);
console.log(JSON.parse(localStorage.getItem('meal-planner') || '[]'));
console.groupEnd('Local storage');

// ----- Functions -----
function createCards(recipeArr, source, parent) {
	const templateCard = document.querySelector('.recipe-card');
	recipeArr.forEach((recipe, index) => {
		// Clone new card
		const newCard = templateCard.cloneNode(true);
		newCard.classList.remove('d-none');

		// Thumbnail
		const thumbnail = newCard.querySelector('.thumbnail');
		thumbnail.src = searchForKey(recipe, 'image').url || 'https://via.placeholder.com/288x144?text=No+image+found';
		thumbnail.alt = searchForKey(recipe, 'name');

		// Title
		const title = newCard.querySelector('.title');
		title.textContent = searchForKey(recipe, 'name');
		title.title = title.textContent;
		const params = new URLSearchParams();
		params.append('source', source);
		params.append('id', index);
		title.href = `/recipe.html?${params}`;

		// Add Button
		const addBtn = newCard.querySelector('.add-btn');
		addBtn.addEventListener('click', function () {
			const mealNameInput = document.getElementById('mealName');
			mealNameInput.value = title.textContent;
		});

		parent.appendChild(newCard);
	});
}

// ----- Page Initialization -----
/**
 * Fetch user recipes to populate frontend.
 */
const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
createCards(userRecipes, 'user', document.getElementById('userCardGrid'));

let mealPlanner = JSON.parse(localStorage.getItem('meal-planner'));
if (!mealPlanner) {
	const newPlanner = [];
	DAYS_OF_THE_WEEK.forEach((day) => {
		newPlanner.push({
			day: day,
			meals: []
		});
	});
	mealPlanner = newPlanner;
	localStorage.setItem('meal-planner', JSON.stringify(newPlanner));
}

const plannerTableBody = document.getElementById('plannerTableBody');
const emptyRow = document.getElementById('emptyRow');
mealPlanner.forEach((day, index) => {
	day.meals.forEach((meal, mealIndex) => {
		const newRow = emptyRow.cloneNode(true);
		newRow.removeAttribute('id');
		const currentRow = plannerTableBody.children[mealIndex] || plannerTableBody.appendChild(newRow);

		const nameHeading = document.createElement('h5');
		nameHeading.textContent = meal.name;
		currentRow.children[index].appendChild(nameHeading);

		const aboutHeading = document.createElement('h6');
		aboutHeading.classList = 'text-muted';
		aboutHeading.textContent = meal.about;
		currentRow.children[index].appendChild(aboutHeading);

		const deleteBtn = document.createElement('button');
		deleteBtn.classList = 'btn btn-warning';
		const removeSymbol = document.createElement('i');
		removeSymbol.classList = 'fas fa-calendar-minus me-2';
		deleteBtn.appendChild(removeSymbol);
		deleteBtn.append('Remove');
		deleteBtn.addEventListener('click', function () {
			const mealPlanner = JSON.parse(localStorage.getItem('meal-planner'));
			mealPlanner[index].meals.splice(mealIndex, 1);

			localStorage.setItem('meal-planner', JSON.stringify(mealPlanner));

			location.reload();
		});
		currentRow.children[index].appendChild(deleteBtn);
	});
});

const recipeForm = document.getElementById('recipeForm');
recipeForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const formData = new FormData(recipeForm);
	const newMeal = {
		'@type': 'Event',
		name: formData.get('name'),
		about: formData.get('about')
	};

	const mealPlanner = JSON.parse(localStorage.getItem('meal-planner'));
	const dayIndex = parseInt(formData.get('day'));
	mealPlanner[dayIndex].meals.push(newMeal);

	localStorage.setItem('meal-planner', JSON.stringify(mealPlanner));

	location.reload();
});

const clearBtn = document.getElementById('confirmClearBtn');
clearBtn.addEventListener('click', function () {
	localStorage.removeItem('meal-planner');
	location.reload();
});
