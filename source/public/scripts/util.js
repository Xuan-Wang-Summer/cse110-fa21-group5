/* global luxon */ // Tell ESLint to ignore undefined `luxon`

// util.js

/**
 * Recursively search for a key nested somewhere inside an object
 * @param {Object} object The object with which you'd like to search.
 * @param {string} key The key that you are looking for in the object.
 * @returns {*} The value of the found key.
 */
function searchForKey(object, key) {
	let value;
	Object.keys(object).some(function (k) {
		if (k === key) {
			value = object[k];
			return true;
		}
		if (object[k] && typeof object[k] === 'object') {
			value = searchForKey(object[k], key);
			return value !== undefined;
		}
	});
	return value;
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {string[]} ingredientArr The raw unprocessed array of ingredients from the
 *                              imported data.
 * @return {string} The string comma separate list of ingredients from the array.
 */
function createIngredientList(ingredientArr) {
	let finalIngredientList = '';

	/**
	 * Removes the quantity and measurement from an ingredient string.
	 * This isn't perfect, it makes the assumption that there will always be a quantity
	 * (sometimes there isn't, so this would fail on something like '2 apples' or 'Some olive oil').
	 * For the purposes of this lab you don't have to worry about those cases.
	 * @param {string} ingredient The raw ingredient string you'd like to process
	 * @return {string} The ingredient without the measurement & quantity
	 * (e.g. '1 cup flour' returns 'flour')
	 */
	function _removeQtyAndMeasurement(ingredient) {
		return ingredient.split(' ').splice(2).join(' ');
	}

	ingredientArr.forEach((ingredient) => {
		ingredient = _removeQtyAndMeasurement(ingredient);
		ingredient = ingredient.replace(/[0-9]|[()]|ml|/g, '');
		ingredient = ingredient.replace(/g /g, '');
		ingredient = ingredient.trim();

		if (ingredient !== '') {
			finalIngredientList += `${ingredient}, `;
		}
	});

	// Capitalize first letter
	finalIngredientList = finalIngredientList.charAt(0).toUpperCase() + finalIngredientList.slice(1);

	// The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
	return finalIngredientList.slice(0, -2);
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {Object} data The recipe data object to search through.
 * @return {Object} tagList - An object storing the tags in array and string format.
 * @return {Array} tagList.array - Array of tags
 * @return {string} tagList.string - String of tags
 */
function createTagList(data) {
	let tagArr = [];
	const fieldsToCheck = ['recipeCuisines', 'recipeCategory'];

	fieldsToCheck.forEach((field) => {
		const fieldValue = searchForKey(data, field);
		if (typeof fieldValue === 'string') {
			/* CASE: Value is one tag or a string of tags */

			if (fieldValue.includes(',')) {
				// CASE: Value is a string of tags
				fieldValue.split(',').forEach((tag) => {
					tagArr.push(tag.trim());
				});
			} else {
				// CASE: Value is one tag
				tagArr.push(fieldValue);
			}
		} else if (Array.isArray(fieldValue)) {
			/* CASE: Value is an array of tags */
			tagArr = tagArr.concat(fieldValue);
		}
	});

	// Capitalize first letter of every tag
	tagArr = tagArr.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1));

	// The .slice(0,-2) here gets ride of the extra ', ' added to the last ingredient
	return { array: tagArr, string: tagArr.join(', ') };
}

/**
 * Takes in a list of ingredients raw from imported data and returns a neatly
 * formatted comma separated list.
 * @param {string} isoString The ISO 8601 string to be parsed.
 * @return {string} The duration in a human-readable format (# hr # min).
 */
function parseISO(isoString) {
	const duration = luxon.Duration.fromISO(isoString).shiftTo('hours', 'minutes').toObject();
	let timeString = '';
	timeString += duration.hours ? `${duration.hours} hr ` : '';
	timeString += duration.minutes ? `${duration.minutes} min` : '';

	return timeString;
}

export { searchForKey, createIngredientList, createTagList, parseISO };
