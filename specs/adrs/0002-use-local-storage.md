# Use local storage for storing recipes

-   Status: Accepted
-   Date: 2021-11-03

## Context and Problem Statement

We need a way to store the recipe data and populate recipe view with the stored recipe data.

## Considered Options

-   Local storage
-   Database

## Decision Outcome

Chosen option: "local storage", because it is less complex but offers the main functionality to users still.

### Positive Consequences

-   We can save preference information about our users (setting, prefered recipe, edited recipe).
-   It is way easier to build local storage.
-   Local storage does not depend on network.
-   Data can be accessed easily and quickly

### Negative Consequences

-   We don't have permanent storage for the data, which also means there is no backup.
-   If users' server dies, the data will die with it.
-   Users cannot access their data virtually.

## Links

-   [Local storage schemas](https://github.com/cse110-fa21-group5/cse110-fa21-group5/tree/main/specs/schemas)
-   [Issue implementing recipe edits](https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues/29)
-   [First CRUD functionality commit (#26, #30, #31, #36)](https://github.com/cse110-fa21-group5/cse110-fa21-group5/commit/8099ba6bc0540973a334002dbd7093343feabf29)

<!-- markdownlint-disable-file MD013 -->
