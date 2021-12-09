# Recipes Array

In storage, the `recipes` item is an array where each item is a recipe object (described below). Recipes are loaded from storage by specifying the index of the recipe as an id in URL search parameters.

# Recipe Object

Recipes should be stored as JS Objects with the following key-value pairs. These value types are derived from
[schema.org/DataType](https://schema.org/DataType). Example schema JSON [here](../../source/public/data/recipe-schema.json).

-   `name: String`
    -   The name of the dish.
-   `description: String`
    -   A short summary describing the dish.
-   `url: String`
    -   URL to the external link for this recipe.
-   `bookmarked: Boolean`
    -   Whether or not the recipe is bookmarked.
-   `tags: String`
    -   URL to the external link for this recipe.
-   `author: Person`
    -   The person who wrote the recipe.
-   `publisher: Organization`
    -   The organization who published the recipe.
-   `dateCreated: Date`
    -   Unix time of the date created.
-   `datePublished: Date`
    -   The date the recipe was published.
-   `dateModified: Date`
    -   Unix time of the date modified.
-   `lastViewed : Number`
    -   The last time a recipe was viewed to implement sorting recipes by last viewed
    -   In Unix time (milliseconds)
        -   See [Date.valueOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)
-   `prepTime: Duration`
    -   The time it takes to prepare the ingredients and workspace for the dish.
-   `cookTime: Duration`
    -   The time it takes to cook the dish.
    -   Always use in combination with `prepTime`
-   `totalTime: Duration`
    -   The total time it takes to prepare and cook the dish.
-   `recipeYield: String`
    -   The quantity produced by the recipe.
-   `recipeIngredient: Array of String`
    -   Ingredients used in the recipe.
-   `recipeInstructions: Array of String`
    -   The steps to make the dish.
-   `nutrition: NutritionInformation`
    -   Nutritional information about the recipe.
-   `aggregateRating: AggregateRating`
    -   The dish's rating.
-   `image: ImageObject`
    -   An image of the completed dish.

See [Google's guide on recipe
data](https://developers.google.com/search/docs/advanced/structured-data/recipe#recipe-properties) for more info on
JSON-LD and these types.

## Type Details

For the types listed above (seen in the value slot of the key-value pairs), here you'll find more information about the expected structure of each.

-   AggregateRating: Object
    -   See [schema.org](https://schema.org/AggregateRating)
    -   Fields
        -   `ratingValue: String`
        -   `ratingCount: String`
-   Duration: String
    -   A specially formatted string for durations
    -   See [schema.org](https://schema.org/Duration)
    -   See [this wikipedia article](https://en.wikipedia.org/wiki/ISO_8601#Durations) for an explanation of an ISO 8601 Duration string
-   ImageObject: Object
    -   See [schema.org](https://schema.org/ImageObject)
    -   Fields
        -   `url: String`
        -   `width: Number`
        -   `height: Number`
-   NutritionInformation: Object
    -   See [schema.org](https://schema.org/NutritionInformation)
    -   Fields
        -   `calories: String`
        -   `carbohydrateContent: String`
        -   `cholesterolContent: String`
        -   `fiberContent: String`
        -   `fatContent: String`
        -   `unsaturatedFatContent: String`
        -   `saturatedFatContent: String`
        -   `proteinContent: String`
        -   `sodiumContent: String`
        -   `sugarContent: String`
-   Organization: Object
    -   See [schema.org](https://schema.org/Organization)
    -   Fields
        -   `name: String`
-   Person: Object
    -   See [schema.org](https://schema.org/Person)
    -   Fields
        -   `name: String`
