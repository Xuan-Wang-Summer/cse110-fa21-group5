# Use CalorieNinjas

-   Status: Accepted
-   Date: 2021-11-20

Technical Story: [API Testing: CalorieNinjas #11](https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues/11)

## Context and Problem Statement

How can we implement nutrition information into the recipe manager without requiring it from external recipes or requiring user input from scratch? For our target audience, ease of access is just as important as health.

## Considered Options

-	CalorieNinjas
-	Spoonacular
-	FoodData Central API

## Decision Outcome

Chosen option: "CalorieNinjas", because its endpoint response aligns well with the LD-JSON format NutritionInformation schema that we are using to store recipes. Also, it allows for a reliable 10,000 API calls/month.

### Positive Consequences

-   Simple endpoint request & response
-   Good amount of API calls limited
-   Endpoint response aligns with LD-JSON

### Negative Consequences

-   CalorieNinjas API is restricted only to nutrition

## Links 

-   [CalorieNinjas](https://calorieninjas.com/api)
-   [API Docs](https://github.com/cse110-fa21-group5/cse110-fa21-group5/tree/main/specs/api-docs)

<!-- markdownlint-disable-file MD013 -->
