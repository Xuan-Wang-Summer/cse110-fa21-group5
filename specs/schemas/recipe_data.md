# Summary

Recipes should be stored in JSON with the following key-value pairs. These value types are derived from
[schema.org/DataType](https://schema.org/DataType).
- `image: String`
    - An image of the completed dish
    - Required: YES
- `name: String`
    - The name of the dish
    - REQUIRED: YES
- `author: Person`
    - The name of the person who wrote the recipe.
    - REQUIRED: No
- `cookTime: Duration`
    - The time it takes to cook the dish in ISO 8601 format.
    - Always use in combination with `prepTime`
    - REQUIRED: No
- `datePublished: Date`
    - The date the recipe was published in ISO 8601 format.
    - REQUIRED: No
- `description: String`
    - A short summary describing the dish.
    - REQUIRED: No
- `nutrition: NutritionInformation`
    - Nutritional information about the recipe.
    - REQUIRED: No
- `prepTime: Duration`
    - The length it takes to prepare the ingredients and workspace for the dish in ISO 8601 format.
    - REQUIRED: No
- `recipeIngredient: Array of String`
    - Ingredients used in the recipe.
    - REQUIRED: No
- `recipeInstructions: Array of HowToStep`
    - The steps to make the dish.
    - REQUIRED: No
- `recipeYield: String`
    - The quantity produced by the recipe.
    - REQUIRED: No
- `totalTime: Duration`
    - The total time it takes to prepare and cook the dish in ISO 8601 format.
    - REQUIRED: No
- `video: VideoObject`
    - A video depicting the steps to make the dish.
    - REQUIRED: No
- `keywords : CreativeWork`
    - Fields describing the tags used to describe the content
    - REQUIRED: No
- `lastViewed : Date`
    - The last time a recipe was viewed to implement the most recent function
    - see [this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)
        -use valueOf function
    - REQUIRED: No

See [Google's guide on recipe
data](https://developers.google.com/search/docs/advanced/structured-data/recipe#recipe-properties) for more info on
JSON-LD and these types.

# Type Details
For the types listed above (seen in the value slot of the key-value pairs), here you'll find more information about the
expected structure of each.

- Person: Object
    - fields
        - `name: String`
- Duration: String
    - a specially formatted string
    - see [this wikipedia article](https://en.wikipedia.org/wiki/ISO_8601#Durations) for an explanation of an ISO 8601
    Duration string
- NutritionInformation: Object
    - see [this page](https://schema.org/NutritionInformation)
    - fields
        - `calories: Energy`
        - `carbohydrateContent: Mass`
        - `fatContent: Mass`
        - `fiberContent: Mass`
        - `proteinContent: Mass`
        - `saturatedFatContent: Mass`
        - `servingSize: Mass`
        - `sodiumContent: Mass`
        - `sugarContent: Mass`
        - `transFatContent: Mass`
        - `unsaturatedFatContent: Mass`
- HowToStep
    - fields
        - `name: String`
        - `text: String`
        - `image: String`
- VideoObject
    - see [this page](https://schema.org/VideoObject)
    - make sure the object has a url
    - fields
        - `thumbnail: ImageObject`
        - `duration: Duration`
- CreativeWorkObject
    - see [this page](https://schema.org/CreativeWork)
    - fields
        - `keywords: String`


