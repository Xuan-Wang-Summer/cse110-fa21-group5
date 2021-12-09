/* global luxon */ // Tell ESLint to ignore undefined `luxon`.
// main.recipe.js

import { caloriesNinjasNutritions } from './recipe.api.js';
import { searchForKey, parseISO, createTagList } from './util.js';

// ----- Variables -----
/**
 * Retrieve GET queries for current recipe.
 * /recipe.html?source=placeholder&id=index
 * See https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams
 */
const params = new URL(document.location).searchParams;

/**
 * Either 'user' to specify a user recipe, or an external source
 * like 'delicious.com.au' to specify a preset recipe.
 */
const source = params.get('source');

/** Unique integer identifier & index for the recipe. */
const id = parseInt(params.get('id'));

/** LD-JSON structured data storing recipe data in the document head. */
const recipeJSON = document.createElement('script');
recipeJSON.setAttribute('type', 'application/ld+json');

/** ['prepTime', 'cookTime', 'totalTime'] */
const TIME_FIELDS = ['prepTime', 'cookTime', 'totalTime'];

/**
 * Container with recipe data elements.
 */
const recipeDiv = document.getElementById('recipe');
const cornerBtnsDiv = document.getElementById('cornerBtns');

// ----- Functions -----
/**
 * Replaces recipe content with 404 message if there is no valid specified recipe to load.
 */
function invalidRecipe() {
	recipeDiv.classList.remove('invisible');

	// Replace recipe content
	const errorHeading = document.createElement('h2');
	errorHeading.textContent = '404: The recipe you are looking for does not exist!';
	recipeDiv.replaceChildren(errorHeading);

	// Remove corner action buttons
	cornerBtnsDiv.replaceChildren();
}

/**
 * Deletes specified corner buttons.
 * @param {string[]} btnIds - IDs of buttons to delete. {'bookmarkBtn','addBtn', 'editBtn', 'deleteBtn'}
 */
function deleteCornerBtns(btnIds) {
	btnIds.forEach((btnId) => {
		cornerBtnsDiv.removeChild(document.getElementById(btnId));
	});
}

/**
 * "Bookmark recipe" button logic.
 */
function activateBookmarkBtn() {
	const bookmarkBtn = document.getElementById('bookmarkBtn');

	function styleBookmarkBtn() {
		const userRecipes = JSON.parse(localStorage.getItem('recipes'));
		const recipe = userRecipes[id];

		if (recipe.bookmarked) {
			bookmarkBtn.classList.remove('btn-primary');
			bookmarkBtn.classList.add('btn-outline-primary');

			bookmarkBtn.setAttribute('data-bs-original-title', 'Un-bookmark recipe');
		} else {
			bookmarkBtn.classList.add('btn-primary');
			bookmarkBtn.classList.remove('btn-outline-primary');

			bookmarkBtn.setAttribute('data-bs-original-title', 'Bookmark recipe');
		}
	}

	styleBookmarkBtn();

	bookmarkBtn.addEventListener('click', function () {
		/**
		 * Toggle bookmarked status of recipe in user recipes array.
		 */
		// Retreive recipes array.
		const userRecipes = JSON.parse(localStorage.getItem('recipes'));

		const recipe = userRecipes[id];
		recipe.bookmarked = !recipe.bookmarked;

		localStorage.setItem('recipes', JSON.stringify(userRecipes));
		recipeJSON.textContent = JSON.stringify(recipe);

		styleBookmarkBtn();
	});
}

/**
 * "Add recipe" button logic.
 */
function activateAddBtn() {
	const addBtn = document.getElementById('addBtn');
	addBtn.addEventListener('click', function () {
		/**
		 * Add recipe data to user recipes array.
		 */
		// Retreive recipes array and push new recipe.
		const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
		const recipeData = JSON.parse(recipeJSON.textContent);

		//TODO: Add additional schema fields to fetched data (URL)
		recipeData.tags = createTagList(recipeData).string;
		recipeData.bookmarked = false;

		userRecipes.push(recipeData);

		// Update recipes array in storage.
		localStorage.setItem('recipes', JSON.stringify(userRecipes));

		// Redirect user to their new recipe.
		window.location.href = `/recipe.html?source=user&id=${userRecipes.length - 1}`;
	});
}

/**
 * "Toggle speech commands" button logic.
 */
function activateSpeechBtn() {
	const initMessage =
		'Hello! Speech recognition service can help you get instructions ' +
		'step by step without touching your device. Use the voice commands in the top right.';

	const voiceCommandsAlert = document.getElementById('voiceCommands');
	const speechBtn = document.getElementById('speechBtn');
	speechBtn.addEventListener('click', function () {
		console.log('Speech recognition activated!');

		// Change corner button style
		speechBtn.classList.remove('btn-secondary');
		speechBtn.classList.add('btn-outline-secondary');

		// Show voice commands
		voiceCommandsAlert.classList.add('show');
		voiceCommandsAlert.classList.remove('hide');

		let OutputMsg = new SpeechSynthesisUtterance();

		// Output voice type setting
		OutputMsg.lang = 'en';
		OutputMsg.pitch = 1; //0-2
		OutputMsg.rate = 0.8; //0.1-10
		OutputMsg.volume = 1; //0-1

		// An introduction for customers.
		OutputMsg.text = initMessage;
		window.speechSynthesis.speak(OutputMsg);

		// Say step 1
		const steps = document.getElementById('steps');
		OutputMsg.text = `Step 1: ${steps.children[0].textContent}`;
		window.speechSynthesis.speak(OutputMsg);

		// Speech Recognition setting
		let Recognition = new window.webkitSpeechRecognition();
		Recognition.lang = 'en';
		Recognition.continuous = false;
		Recognition.interimResults = false;
		Recognition.maxAlternative = 1;

		let currentStep = 0; // it starts from -1 because we need command 'next' to start the first step.
		let continueRecognition = true; //continuously run speech recognition or not
		Recognition.start();

		Recognition.onresult = function (event) {
			var InputMsg = event.results[0][0].transcript;
			console.log(`Received voice command: ${InputMsg}`);

			const steps = document.getElementById('steps');

			if (InputMsg.includes('next')) {
				if (currentStep >= steps.children.length - 1) {
					OutputMsg.text = 'We just went through the final step!';
					// Response when users call 'next' when they already reach the final step.
					window.speechSynthesis.speak(OutputMsg);
				} else {
					currentStep++;
					steps.children[currentStep].click();
					OutputMsg.text = steps.children[currentStep].textContent;
					window.speechSynthesis.speak(OutputMsg);
				}
			} else if (InputMsg.includes('repeat')) {
				window.speechSynthesis.speak(OutputMsg);
			} else if (InputMsg.includes('back')) {
				if (currentStep == 0) {
					OutputMsg.text = 'We just went through the first step!';
					// Response when users call 'back' when they already reach back to the first back.
					window.speechSynthesis.speak(OutputMsg);
				} else {
					currentStep--;
					steps.children[currentStep].click();
					OutputMsg.text = steps.children[currentStep].textContent;
					window.speechSynthesis.speak(OutputMsg);
				}
			} else if (InputMsg.includes('stop')) {
				continueRecognition = false;
			}
		};
		// continuously start recognition
		Recognition.onend = function () {
			if (continueRecognition == true) {
				Recognition.start();
			} else {
				// Thank Users in the End.
				OutputMsg.text = 'Thank you for using speech recognition service!';
				window.speechSynthesis.speak(OutputMsg);

				speechBtn.classList.add('btn-secondary');
				speechBtn.classList.remove('btn-outline-secondary');

				voiceCommandsAlert.classList.add('hide');
				voiceCommandsAlert.classList.remove('show');
			}
		};
	});
}

/**
 * "Delete recipe" button logic.
 */
function activateDeleteBtn() {
	const deleteBtn = document.getElementById('confirmDeleteBtn');
	deleteBtn.addEventListener('click', function () {
		/**
		 * Delete recipe data from user recipes array.
		 */
		// Retreive recipes array and remove recipe.
		const userRecipes = JSON.parse(localStorage.getItem('recipes'));
		userRecipes.splice(id, 1);

		// Update recipes array in storage.
		localStorage.setItem('recipes', JSON.stringify(userRecipes));

		// Redirect user to the recipes page.
		window.location.href = `/index.html`;
	});
}

function fetchNutrition() {
	/** {'CalorieNinjas Name': 'JSON Name'} */
	const CALORIE_NINJAS_MAP = {
		calories: 'calories',
		carbohydrates_total_g: 'carbohydrateContent',
		cholesterol_mg: 'cholesterolContent',
		fiber_g: 'fiberContent',
		fat_total_g: 'fatContent',
		fat_saturated_g: 'saturatedFatContent',
		protein_g: 'proteinContent',
		sodium_mg: 'sodiumContent',
		sugar_g: 'sugarContent'
	};

	let data = JSON.parse(recipeJSON.textContent);

	// Nutrition has not been stored - store it & populate front-end
	// TODO: Make API Call with current ingredients
	const recipeYield = searchForKey(data, 'recipeYield') || 1;
	const ingredientsString = searchForKey(data, 'recipeIngredient').join(', ');
	caloriesNinjasNutritions(ingredientsString).then((response) => {
		const nutritionTotal = response.items.reduce((previousItem, currentItem) => {
			for (const nutritionFact in previousItem) {
				previousItem[nutritionFact] += currentItem[nutritionFact];
			}

			return previousItem;
		});

		for (const nutritionFact in nutritionTotal) {
			const jsonMapping = CALORIE_NINJAS_MAP[nutritionFact];
			if (jsonMapping) {
				const nutritionValue = nutritionTotal[nutritionFact];
				data.nutrition[jsonMapping] = Math.round(nutritionValue / recipeYield);
			}
		}

		console.log('updating nutrition...');
		console.log(data);

		populateRecipe(data);

		/* Edit recipe in local storage */
		if (source == 'user') {
			let userRecipes = JSON.parse(localStorage.getItem('recipes'));
			userRecipes[id] = data;
			localStorage.setItem('recipes', JSON.stringify(userRecipes));
		}
	});
}

/**
 * Populates recipe content with recipe data.
 * @param {Object} data - Recipe data.
 */
function populateRecipe(data) {
	// Log recipe Object.
	// console.group('Recipe data');
	// console.log(data);
	// console.groupEnd('Recipe data');

	/**
	 * Populate LD-JSON in the document head.
	 */
	recipeJSON.textContent = JSON.stringify(data);
	document.head.appendChild(recipeJSON);

	/**
	 * Populate frontend elements.
	 */
	// Title
	const title = document.getElementById('title');
	title.textContent = searchForKey(data, 'name');

	// Source author or organization
	const sourceWriter = document.getElementById('source');
	if (searchForKey(data, 'publisher')) {
		sourceWriter.textContent = searchForKey(data, 'publisher').name || 'Source N/A';
	} else {
		sourceWriter.textContent = searchForKey(data, 'author').name || 'Source N/A';
	}

	// Source link
	const url = document.getElementById('url');
	url.href = data.url || searchForKey(data, '@id') || '#';
	if (url.href === window.location.href + '#') {
		url.textContent = 'Link N/A';
	} else {
		url.textContent = 'Link';
	}

	/* Recipe facts (tags, cook time, difficulty, servings) */
	// Tags
	const tags = document.getElementById('tags');
	tags.textContent = searchForKey(data, 'tags') || createTagList(data).string || 'N/A';

	// Prep time, cook time, and total time
	TIME_FIELDS.forEach((timeField) => {
		const timeElement = document.getElementById(timeField);
		timeElement.textContent = parseISO(searchForKey(data, timeField)) || 'N/A';
	});

	// Difficulty
	const difficulty = document.getElementById('difficulty');
	difficulty.textContent = searchForKey(data, 'difficulty') || 'N/A';

	// Servings
	const servings = document.getElementById('servings');
	servings.textContent = searchForKey(data, 'recipeYield') || 'N/A';

	// TODO: Nutrition (Make API call on ingredients)
	const storedNutrition = searchForKey(data, 'nutrition');
	if (storedNutrition.calories && storedNutrition.fatContent) {
		// Nutrition is already stored - populate front-end
		for (const nutritionFact in storedNutrition) {
			const nutritionElement = document.getElementById(nutritionFact);

			if (nutritionElement) {
				nutritionElement.textContent = storedNutrition[nutritionFact];
			}
		}
	} else {
		fetchNutrition();
	}

	// Description
	const description = document.getElementById('description');
	description.textContent = searchForKey(data, 'description');

	// Image
	const image = document.getElementById('image');
	image.src = searchForKey(data, 'image').url || 'https://via.placeholder.com/350x150?text=No+image+found';
	image.alt = searchForKey(data, 'name');

	// Ingredients - clear old & replace with new
	const ingredients = document.getElementById('ingredients');
	ingredients.replaceChildren();
	searchForKey(data, 'recipeIngredient').forEach((ingredient) => {
		const newIngredient = document.createElement('li');
		newIngredient.textContent = ingredient;

		ingredients.appendChild(newIngredient);
	});
	// TODO: Find way to make numbers bold

	// Steps - clear old & replace with new
	const steps = document.getElementById('steps');
	steps.replaceChildren();
	searchForKey(data, 'recipeInstructions').forEach((step, index) => {
		const newStep = document.createElement('li');
		newStep.textContent = step;

		// TODO: Save index for user's recipe progress
		if (source === 'user' && index === 0) {
			newStep.classList.add('active');
		}

		// Highlight certain step upon clicking it
		newStep.addEventListener('click', function () {
			for (let i = 0; i < steps.children.length; i++) {
				steps.children[i].classList.remove('active');
			}

			newStep.classList.add('active');
		});

		steps.appendChild(newStep);
	});

	// Reveal recipe after population finishes
	recipeDiv.classList.remove('invisible');
	cornerBtnsDiv.classList.remove('invisible');
}

/**
 * Populates the editing drawer with recipe data.
 */
function populateDrawer() {
	const data = JSON.parse(recipeJSON.textContent);

	/**
	 * Populate input elements in the drawer.
	 */
	// Title
	const title = document.getElementById('titleInput');
	title.value = searchForKey(data, 'name');

	/* Recipe facts (tags, cook time, difficulty, servings) */
	// Tags
	const tags = document.getElementById('tagsInput');
	tags.value = searchForKey(data, 'tags') || createTagList(data).string;

	// Prep time, cook time, and total time
	TIME_FIELDS.forEach((timeField) => {
		const timeElement = document.getElementById(`${timeField}Input`);
		timeElement.value = luxon.Duration.fromISO(searchForKey(data, timeField)).shiftTo('minutes').get('minutes');
	});

	// Difficulty
	const difficulty = document.getElementById('difficultyInput');
	difficulty.value = searchForKey(data, 'difficulty') || '';

	// Servings
	const servings = document.getElementById('servingsInput');
	servings.value = searchForKey(data, 'recipeYield');

	// Ingredients
	const ingredients = document.getElementById('ingredientsInput');
	ingredients.value = searchForKey(data, 'recipeIngredient').join('\n');

	// Steps
	const steps = document.getElementById('stepsInput');
	steps.value = searchForKey(data, 'recipeInstructions').join('\n\n');

	// Image link
	const imageInput = document.getElementById('imageInput');
	imageInput.value = searchForKey(data, 'image').url || '';

	// Description
	const description = document.getElementById('descriptionInput');
	description.value = searchForKey(data, 'description');

	// Source author or organization
	const sourceInput = document.getElementById('sourceInput');
	sourceInput.value = searchForKey(data, 'author').name;

	// Source link
	const urlInput = document.getElementById('urlInput');
	urlInput.value = data.url || '';
}

/**
 * Activate editing functionality in the drawer.
 */
function activateDrawerEditing() {
	// TODO: Populate edit drawer
	let data = JSON.parse(recipeJSON.textContent);

	const elementIds = [
		'title',
		'tags',
		'prepTime',
		'cookTime',
		'totalTime',
		'difficulty',
		'servings',
		'ingredients',
		'steps',
		'image',
		'description',
		'source',
		'url'
	];

	/** Mappings of element id to json field name */
	const jsonMappings = {
		title: 'name',
		servings: 'recipeYield',
		image: ['image.url'],
		ingredients: 'recipeIngredient',
		steps: 'recipeInstructions',
		source: ['author.name', 'publisher.name']
	};

	elementIds.forEach((elementId) => {
		const elementInput = document.getElementById(`${elementId}Input`);

		elementInput.addEventListener('input', function (event) {
			const newValue = event.target.value;

			const jsonMapping = jsonMappings[elementId];
			if (!jsonMapping) {
				// CASE: element id is same as json field, so there is no custom mapping
				if (TIME_FIELDS.includes(elementId)) {
					// CASE: Time field
					data[elementId] = `PT${newValue}M`;
				} else {
					// CASE: Normal field like `description`
					data[elementId] = newValue;
				}
			} else {
				// CASE: element id is different than json field, so there is a custom mapping
				if (Array.isArray(jsonMapping)) {
					// CASE: Multiple target fields OR nested field
					jsonMapping.forEach((field) => {
						if (field.includes('.')) {
							// CASE: Nested field
							const fieldArr = field.split('.'); // [parent, child]

							data[fieldArr[0]][fieldArr[1]] = newValue;
						} else {
							// CASE: Single field
							data[jsonMapping] = newValue;
						}
					});
				} else {
					// CASE: Normal field with a mapping like `ingredients`
					if (elementId === 'tags') {
						data[jsonMapping] = newValue.split(',').map((tag) => tag.trim());
					} else if (elementId === 'ingredients') {
						data[jsonMapping] = newValue.split('\n');
					} else if (elementId === 'steps') {
						data[jsonMapping] = newValue.split('\n\n');
					} else {
						data[jsonMapping] = newValue;
					}
				}
			}

			// Log updated data
			console.log(data);

			// Update front-end preview
			populateRecipe(data);

			/* Edit recipe in local storage */
			let userRecipes = JSON.parse(localStorage.getItem('recipes'));
			userRecipes[id] = data;

			localStorage.setItem('recipes', JSON.stringify(userRecipes));
		});
	});

	// Update nutrition upon committing an ingredients change.
	const ingredientsInput = document.getElementById('ingredientsInput');
	ingredientsInput.addEventListener('change', function () {
		fetchNutrition();
	});
}

// ----- Page Initialization -----
/**
 * Recipe query logic.
 * Determining if recipe is from user recipes or preset recipes.
 */
// Log query info
console.log(`Source: ${source}`);
console.log(`ID: ${id}`);

// Log local storage
console.group('Local storage');
console.log(localStorage);
console.log('User recipes (localStorage.recipes):');
console.log(JSON.parse(localStorage.recipes || '[]'));
console.groupEnd('Local storage');

// Validate recipe source and id
if (!source || isNaN(id)) {
	invalidRecipe();
} else if (source !== 'user' && source !== 'bookmark') {
	/* CASE: Preset Recipe Source */

	// Delete edit & delete corner buttons
	deleteCornerBtns(['bookmarkBtn', 'speechBtn', 'editBtn', 'deleteBtn']);

	// Activate add button
	activateAddBtn();

	/**
	 * Fetch preset recipe to populate frontend.
	 */
	fetch('/data/recipe-data.json')
		.then((response) => response.json())
		.then((presetRecipes) => {
			// The external recipe source must be in the JSON
			if (!presetRecipes.hasOwnProperty(source) || !presetRecipes[source][id]) {
				return invalidRecipe();
			}

			const recipeData = presetRecipes[source][id];

			console.group('Recipe data');
			console.log(recipeData);
			console.groupEnd('Recipe data');

			populateRecipe(recipeData);
			populateDrawer();
			activateDrawerEditing();
		})
		.catch((err) => console.error(err));
} else if (source === 'user' || source == 'bookmark') {
	/* CASE: User Recipe Source */

	// Delete add corner button
	deleteCornerBtns(['addBtn']);

	// Activate speech butotn
	activateSpeechBtn();

	// Activate delete button
	activateDeleteBtn();

	activateBookmarkBtn();

	// Show edit drawer upon showing a completely new recipe
	if (location.hash === '#new') {
		const drawer = document.getElementById('drawer');
		drawer.classList.add('show');
	}

	/**
	 * Access local storage to retrieve recipe data.
	 */
	const userRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
	const recipeData = userRecipes[id];

	console.group('Recipe data');
	console.log(recipeData);
	console.groupEnd('Recipe data');

	// If recipe exists, populate frontend with recipe data.
	if (!recipeData) {
		invalidRecipe();
	} else {
		populateRecipe(recipeData);
		populateDrawer();
		activateDrawerEditing();
	}
} else {
	invalidRecipe();
}
