# CalorieNinjas

[Click here for the main website](https://calorieninjas.com/api)

## Core features

###  [/v1/nutrition](https://calorieninjas.com/api)
### `HTTP GET`

Get a detailed list of nutrition information for each item from an input text query.

##### Parameters

**`query`**  (required) - a string containing food or drink items. If you wish to calculate a specific quantity, you may prefix a quantity before an item. For example,  `3 tomatoes`  or  `1lb`  beef brisket. If no quantity is specified, the default quantity is  **100 grams**. Queries cannot exceed  **1500 characters**.

##### Headers

**`X-Api-Key`**  (required) - API Key associated with your account.

##### Sample Request URL
`https://api.calorieninjas.com/v1/nutrition?query=10oz onion and a tomato`


##### Code Example
```javascript
const request = require('request');
var query = '3lb carrots and a chicken sandwich';
request.get({
  url: 'https://api.calorieninjas.com/v1/nutrition?query='+query,
  headers: {
    'X-Api-Key': 'YOUR_API_KEY'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});
```

# Spoonacular
[Click here for the main website](https://spoonacular.com/food-api/docs)

## Core features

### [Search Recipes](https://spoonacular.com/food-api/docs#Search-Recipes-Complex)
### `HTTP GET`
Search through hundreds of thousands of recipes using advanced filtering and ranking. NOTE: This method combines searching by query, by ingredients, and by nutrients into one endpoint.

`GET https://api.spoonacular.com/recipes/complexSearch`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`query`** | string | pasta |The (natural language) recipe search query. |
| **`cuisine`** | string | italian |The cuisine(s) of the recipes. One or more, comma separated (will be interpreted as 'OR'). See a full [list of supported cuisines](https://spoonacular.com/food-api/docs#Cuisines). |
| **`diet`** | string | vegetarian |The diet for which the recipes must be suitable. See a full [list of supported diets](https://spoonacular.com/food-api/docs#Diets).|
| **`maxReadyTime`** | number | 20 |The maximum time in minutes it should take to prepare and cook the recipe|
more parameters in the docs

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2`


### [Get Recipe Information](https://spoonacular.com/food-api/docs#Get-Recipe-Information)
### `HTTP GET`
Use a recipe id to get full information about a recipe, such as ingredients, nutrition, diet and allergen information, etc.

`GET https://api.spoonacular.com/recipes/{id}/information`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 716429 |The id of the recipe. |
| **`includeNutrition`** | false | italian |Include nutrition data in the recipe information. Nutrition data is per serving. If you want the nutrition data for the entire recipe, just multiply by the number of servings. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/716429/information?includeNutrition=false`


### [Ingredient Search](https://spoonacular.com/food-api/docs#Ingredient-Search)
### `HTTP GET`
Search for simple whole foods (e.g. fruits, vegetables, nuts, grains, meat, fish, dairy etc.).

`GET https://api.spoonacular.com/food/ingredients/search`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`query`** | string | apple |The partial or full ingredient name. |
| **`intolerances`** | string | egg |A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances. |
| **`sort`** | string | calories	 |The strategy to sort recipes by. See a full list of supported sorting options.|
| **`number`** | number | 20 |The number of expected results (between 1 and 100).
|
more parameters in the docs

##### Sample Request URL
`GET https://api.spoonacular.com/food/ingredients/search?query=banana&number=2&sort=calories&sortDirection=desc`


### [Get Ingredient Information](https://spoonacular.com/food-api/docs#Get-Ingredient-Information)
### `HTTP GET`
Use an ingredient id to get all available information about an ingredient, such as its image and supermarket aisle.

`GET https://api.spoonacular.com/food/ingredients/{id}/information`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 9266 |The ingredient id. |
| **`amount`** | number | 150 |The amount of this ingredient. |
| **`unit`** | string | grams	|	The unit for the given amount.|

##### Sample Request URL
`GET https://api.spoonacular.com/food/ingredients/9266/information?amount=1`


## Add-on features (Should have)

### [Get Similar Recipes](https://spoonacular.com/food-api/docs#Get-Similar-Recipes)
### `HTTP GET`
Find recipes which are similar to the given one.

`GET https://api.spoonacular.com/recipes/{id}/similar`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 715538 |The id of the source recipe for which similar recipes should be found. |
| **`number`** | number | 1 |The number of random recipes to be returned (between 1 and 100). |
| **`limitLicense`** | boolean | true |Whether the recipes should have an open license that allows display with proper attribution.|

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/715538/similar`


### [Get Ingredient Substitutes](https://spoonacular.com/food-api/docs#Get-Ingredient-Substitutes)
### `HTTP GET`
Search for substitutes for a given ingredient.

`GET https://api.spoonacular.com/food/ingredients/substitutes`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`ingredientName`** | string | butter |The name of the ingredient you want to replace. |

##### Sample Request URL
`GET https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=butter`


## Add-on features (Could have)

### [Autocomplete Recipe Search](https://spoonacular.com/food-api/docs#Autocomplete-Recipe-Search)
### `HTTP GET`
Autocomplete a partial input to suggest possible recipe names.

`GET https://api.spoonacular.com/recipes/autocomplete`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`query`** | string | pasta |The query to be autocompleted. |
| **`number`** | number | 10 |The number of results to return (between 1 and 25). |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/autocomplete?number=10&query=chick`


### [Autocomplete Ingredient Search](https://spoonacular.com/food-api/docs#Autocomplete-Ingredient-Search)
### `HTTP GET`
Autocomplete the entry of an ingredient.

`GET https://api.spoonacular.com/food/ingredients/autocomplete`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`query`** | string | apple |The partial or full ingredient name. |
| **`intolerances`** | string | egg |A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances. |
| **`metaInformation`** | boolean | false |Whether to return more meta information about the ingredients.|
| **`number`** | number | 10 |The number of expected results (between 1 and 100).
|

##### Sample Request URL
`GET https://api.spoonacular.com/food/ingredients/autocomplete?query=appl&number=5`
      

### [Search Grocery Products](https://spoonacular.com/food-api/docs#Search-Grocery-Products)
### `HTTP GET`
Search packaged food products, such as frozen pizza or Greek yogurt.

`GET https://api.spoonacular.com/food/products/search`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`query`** | string | greek yogurt |The search query. |
| **`intolerances`** | string | egg |A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances. |
| **`offset`** | number	 | 0 |The number of results to skip (between 0 and 990).|
| **`number`** | number | 20 |The number of expected results (between 1 and 100).
|
more parameters in the docs

##### Sample Request URL
`GET https://api.spoonacular.com/food/products/search?query=pizza&number=2`


### [Get Product Information](https://spoonacular.com/food-api/docs#Get-Product-Information)
### `HTTP GET`
Use a product id to get full information about a product, such as ingredients, nutrition, etc. The nutritional information is per serving.

`GET https://api.spoonacular.com/food/products/{id}`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 22347 |The id of the packaged food. |

##### Sample Request URL
`GET https://api.spoonacular.com/food/products/22347`


### [Classify Cuisine](https://spoonacular.com/food-api/docs#Classify-Cuisine)
### `HTTP POST`
Classify the recipe's cuisine.

`POST https://api.spoonacular.com/recipes/cuisine`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`title`** | string | Pork roast with green beans |The title of the recipe. |
| **`ingredientList`** | string | 3 oz pork shoulder |The ingredient list of the recipe, one ingredient per line (separate lines with \n). |
| **`language`** | string | en |TThe input language, either "en" or "de". |


### [Analyze Recipe](https://spoonacular.com/food-api/docs#Analyze-Recipe)
### `HTTP POST`
This endpoint allows you to send raw recipe information, such as title, servings, and ingredients, to then see what we compute (badges, diets, nutrition, and more). This is useful if you have your own recipe data and want to enrich it with our semantic analysis.

`POST https://api.spoonacular.com/recipes/analyze`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`language`** | string | en |The input language, either "en" or "de". |
| **`includeNutrition	`** | boolean | false |Whether nutrition data should be added to correctly parsed ingredients. |
| **`includeTaste`** | boolean | false |Whether taste data should be added to correctly parsed ingredients. |

##### Example Request and Body
`POST https://api.spoonacular.com/recipes/analyze`


##### Example Request and Response
`GET https://api.spoonacular.com/recipes/analyze`


## Helpful endpoints

### [Ingredients by ID](https://spoonacular.com/food-api/docs#Ingredients-by-ID)
### `HTTP GET`

Get a recipe's ingredient list.

`GET https://api.spoonacular.com/recipes/{id}/ingredientWidget.json`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 1003464 | The recipe id. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/1003464/ingredientWidget.json`

### [Nutrition by ID](https://spoonacular.com/food-api/docs#Nutrition-by-ID)
### `HTTP GET`
Get a recipe's nutrition widget data.

`GET https://api.spoonacular.com/recipes/{id}/nutritionWidget.json`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 1003464 | The recipe id. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/1003464/nutritionWidget.json`

### [Taste by ID](https://spoonacular.com/food-api/docs#Taste-by-ID)
### `HTTP GET`
Get a recipe's taste. The tastes supported are sweet, salty, sour, bitter, savory, and fatty. These tastes are between 0 and 100 while the spiciness value is in scoville on an open scale of 0 and above.

Every ingredient has each of these values and it is weighted by how much they contribute to the recipe. Spiciness is taking the weight of the spicy ingredient and multiplying it with its scoville amount. Of course, taste is also very personal and it depends on how it is prepared so all of the values should only give you an indication of how the dish tastes.

`GET https://api.spoonacular.com/recipes/{id}/tasteWidget.json`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 1003464 | The recipe id. |
| **`normalize`** | boolean | false | Normalize to the strongest taste. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/69095/tasteWidget.json`

### [Get Analyzed Recipe Instructions](https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions)
### `HTTP GET`
Get an analyzed breakdown of a recipe's instructions. Each step is enriched with the ingredients and equipment required.

`GET https://api.spoonacular.com/recipes/{id}/analyzedInstructions`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`id`** | number | 1003464 | The recipe id. |
| **`stepBreakdown`** | boolean | true | Whether to break down the recipe steps even more. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/324694/analyzedInstructions`

### [Extract Recipe from Website](https://spoonacular.com/food-api/docs#Extract-Recipe-from-Website)
### `HTTP GET`
This endpoint lets you extract recipe data such as title, ingredients, and instructions from any properly formatted Website.

`GET https://api.spoonacular.com/recipes/extract`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`url`** | string | https://foodista.com/recipe/ZHK4KPB6/chocolate-crinkle-cookies |The URL of the recipe page. |
| **`forceExtraction`** | boolean | true | If true, the extraction will be triggered whether we already know the recipe or not. Use this only if information is missing as this operation is slower. |
| **`analyze`** | boolean | false | If true, the recipe will be analyzed and classified resolving in more data such as cuisines, dish types, and more. |
| **`includeNutrition`** | boolean | false | Whether nutrition data should be added to correctly parsed ingredients. |
| **`includeTaste`** | boolean | false | Whether taste data should be added to correctly parsed ingredients |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/extract?url=https://foodista.com/recipe/ZHK4KPB6/chocolate-crinkle-cookies`

### [Quick Answer](https://spoonacular.com/food-api/docs#Quick-Answer)
### `HTTP GET`
Answer a nutrition related natural language question.

`GET https://api.spoonacular.com/recipes/quickAnswer`

##### Headers
`Content-Type: application/json`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`q`** | string | How much vitamin c is in 2 apples? | The nutrition related question. |

##### Sample Request URL
`GET https://api.spoonacular.com/recipes/quickAnswer?q=How+much+vitamin+c+is+in+2+apples`

### [Talk to Chatbot](https://spoonacular.com/food-api/docs#Talk-to-Chatbot)
### `HTTP GET`
This endpoint can be used to have a conversation about food with the spoonacular chatbot. Use the "Conversation Suggests" endpoint to show your user what he or she can say.

`GET https://api.spoonacular.com/food/converse`

##### Headers
`Content-Type: application/json`

##### Parameters
| Name |Type  |Example  |Description  |
|--|--|--|--|
| **`text`** | string | donut recipes | The request / question / answer from the user to the chatbot. |
| **`contextId`** | string | 342938 |An arbitrary globally unique id for your conversation. The conversation can contain states so you should pass your context id if you want the bot to be able to remember the conversation.|

##### Sample Request URL
`GET https://api.spoonacular.com/food/converse?text=tell+me+a+joke`