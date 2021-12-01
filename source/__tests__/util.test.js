/* global expect, test */ // Tell ESLint to ignore undefined `expect`.
import { createIngredientList, createTagList, searchForKey, parseISO } from '../public/scripts/util.js';

test('Should return the value of the key in object', () => {
	const object1 = {
		name: 'Royce',
		age: 22,
		homeCity: 'La Jolla'
	};
	const object2 = {
		name: 'Andy',
		age: 21,
		roommate: object1
	};
	const object3 = {
		name: 'James',
		major: 'CS',
		classmate: object2
	};
	const object4 = {
		name: 'Dylan',
		bestFriend: object1
	};

	expect(searchForKey(object1, 'name')).toBe('Royce');
	expect(searchForKey(object1, 'email')).toBe(undefined);
	expect(searchForKey(object1, 'age')).toBe(22);
	expect(searchForKey(object1, 'roommate')).toBe(undefined);

	expect(searchForKey(object2, 'roommate')).toBe(object1);
	expect(searchForKey(object2, 'age')).toBe(21);
	expect(searchForKey(object2, 'homeCity')).toBe('La Jolla');
	expect(searchForKey(object2, 'email')).toBe(undefined);

	expect(searchForKey(object3, 'homeCity')).toBe('La Jolla');
	expect(searchForKey(object3, 'age')).toBe(21);

	expect(searchForKey(object4, 'name')).toBe('Dylan');
	expect(searchForKey(object4, 'homeCity')).toBe('La Jolla');
});

test('Should return a formatted list of ingredients', () => {
	const ingList1 = ['2 large eggs', '6 oz bacon', '1 cup gritz', '5 oz sausage'];
	const ingList2 = ['1 oz cheddar cheese'];
	const ingList3 = [];
	const ingList4 = ['1 lb chicken', '1 g paprika', '1 cup milk', '1 box pasta', '3'];

	expect(createIngredientList(ingList1)).toBe('Eggs, bacon, gritz, sausage');
	expect(createIngredientList(ingList2)).toBe('Cheddar cheese');
	expect(createIngredientList(ingList3)).toBe('');
	expect(createIngredientList(ingList4)).toBe('Chicken, paprika, milk, pasta');
});

test('Should return an object of formatted tags', () => {
	const recipeData1 = { recipeCuisines: 'Mexican' };
	const recipeData2 = { recipeCuisines: 'Mexican, American' };
	const recipeData3 = { recipeCuisines: ['Mexican', 'American'] };
	const recipeData4 = { recipeCategory: 'Dinner' };
	const recipeData5 = {};
	const recipeData6 = { recipeCuisines: ['Mexican', 'American'], recipeCategory: ['Lunch', 'Dinner'] };

	expect(createTagList(recipeData1).string).toBe('Mexican');
	expect(createTagList(recipeData2).string).toBe('Mexican, American');
	expect(createTagList(recipeData3).string).toBe('Mexican, American');
	expect(createTagList(recipeData3).array).toEqual(['Mexican', 'American']);
	expect(createTagList(recipeData4).string).toBe('Dinner');
	expect(createTagList(recipeData5).string).toBe('');
	expect(createTagList(recipeData6).string).toBe('Mexican, American, Lunch, Dinner');
});

test('Should return the parsed ISO string', () => {
	const isoString1 = 'PT0M';
	const isoString2 = 'PT30M';
	const isoString3 = 'PT90M';
	const isoString4 = 'PT1H30M';
	const isoString5 = '';

	expect(parseISO(isoString1)).toBe('');
	expect(parseISO(isoString2)).toBe('30 min');
	expect(parseISO(isoString3)).toBe('1 hr 30 min');
	expect(parseISO(isoString4)).toBe('1 hr 30 min');
	expect(parseISO(isoString5)).toBe('');
});
