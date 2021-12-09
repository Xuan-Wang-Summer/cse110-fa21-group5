# Meal Planner Array

In storage, the `meal-planner` item is an array where each item is a day of the week (described below).

# Day of the week Object

Days of the week should be stored in JS Objects with the following key-value pairs. These value types are derived from
[schema.org/DayOfWeek](https://schema.org/DayOfWeek). Helpful link in meal planner is [here](https://github.com/schemaorg/schemaorg/issues/1457). Example schema JSON [here](../../source/public/data/day-of-week-schema.json).

-   `day - DayOfWeek`
    -   What day of the week it is.
-   `meals - Array of Event`
    -   Meals on that day.

## Type Details

For the types listed above (seen in the value slot of the key-value pairs), here you'll find more information about the expected structure of each.

-   DayOfWeek: String
    -   See [schema.org](https://schema.org/DayOfWeek)
    -   Enumeration: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
-   Event: Object
    -   See [schema.org](https://schema.org/Event)
    -   Fields
        -   `name: String`
            -   Name of the meal.
        -   `about: String`
            -   When the meal happens (ex: Lunch, Dinner, etc.).
