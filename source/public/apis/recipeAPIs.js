import axios from 'axios';

/**
 * Key for Steven to use for debug purpose, please create your own api
 * keys from the respective website due to the limited api calls
 */
const caloriesKeysSteven = '5GBHQsGWEdmha62FEClqHA==dsca062CLoWKcGKd';
const spoonKeysSteven = '68dc1ad99018418687b7c1c160f799fa';

const spoonKeysXuan = '5bd98417a6494312893bbfdcc8e5d60c';

/**
 * Get a detailed list of nutrition information for each item from an input text query.
 *
 * @param {string} query the text query that contains recipe information
 * @return {Array} An array of items given by the queries with the detailed nurtitions
 */
export async function caloriesNinjasNutritions(query) {
	try {
		const resp = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
			headers: { 'X-Api-Key': caloriesKeysSteven },
		});
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Search through hundreds of thousands of recipes using advanced filtering and ranking. NOTE: This method combines searching by query, by ingredients, and by nutrients into one endpoint.
 *
 * @param {Object} params A JavaScript object that contains different types of params given in https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 * @return {Object} A JavaScript object that contains all the results in an array
 */
export async function searchRecipe(params) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonKeysSteven}?query=${params.query}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Use a recipe id to get full information about a recipe, such as ingredients, nutrition, diet and allergen information, etc.
 *
 * @param {number} id A JavaScript object that contains different types of params given in https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 * @return {Object} A JavaScript object that contains all the information of the given recipe
 */
export async function getRecipeInformation(id) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonKeysSteven}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Search for simple whole foods (e.g. fruits, vegetables, nuts, grains, meat, fish, dairy etc.).
 *
 * @param {string} query The partial or full ingredient name.
 * @return {Object} A JavaScript object that contains all the information of the query
 */
export async function ingredientsSearch(query) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/food/ingredients/search?apiKey=${spoonKeysSteven}?query=${query}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Use an ingredient id to get all available information about an ingredient, such as its image and supermarket aisle.
 *
 * @param {number} id The ingredient id.
 * @return {Object} A JavaScript object that contains all the information of the given ingredient
 */
export async function getIngredientInfo(id) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${spoonKeysSteven}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Find recipes which are similar to the given one.
 *
 * @param {number} id The recipe id.
 * @return {Object} A JavaScript object that contains all the results in an array
 */
 export async function getSimilarRecipe(id) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${spoonKeysXuan}?number=5`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}

/**
 * Search for substitutes for a given ingredient.
 *
 * @param {string} name The ingredient id.
 * @return {Object} A JavaScript object that contains all the substitutes for a given ingredient.
 */
 export async function getIngredientSubstitutes(name) {
	try {
		const resp = await axios.get(
			`https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${spoonKeysXuan}?ingredientName=${name}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(resp.data);
	} catch (error) {
		console.error(error);
	}
}
