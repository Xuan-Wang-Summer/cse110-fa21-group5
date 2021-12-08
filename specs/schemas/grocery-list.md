# Grocery List Array

In storage, the `grocery-list` item is an array where each item is an ingredient list (described below). Each index in the grocery list corresponds to the recipe of the same index in the `recipes` array.

# Ingredient List Object

Ingredient lists should be stored as JS Objects with the following key-value pairs. These value types are derived from
[schema.org/DataType](https://schema.org/DataType). Based on the [schema.org ItemList schema](https://schema.org/ItemList). Example schema JSON [here](../../source/public/data/ingredient-list-schema.json).

-   `name: String`
    -   Name of recipe the list is for.
-   `ItemListElement: Array of Thing`
    -   The ingredients in the ingredient list & if they are checked off or not.
    -   Will be empty if there is no ingredient list for this recipe.

## Type Details

For the types listed above (seen in the value slot of the key-value pairs), here you'll find more information about the expected structure of each.

-   Thing: Object
    -   See [schema.org](https://schema.org/Thing)
    -   Fields
        -   `name: String`
        -   `checked: Boolean`
