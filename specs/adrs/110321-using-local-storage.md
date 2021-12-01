# Use local storage for storing recipes

-   Status: accepted
-   Date: 2021-11-03

## Context and Problem Statement

We need a way to store the recipe data and populate recipe view with the stored recipe data.

## Considered Options

-   local storage
-   database

## Decision Outcome

Chosen option: "local storage"

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

-   {local storage schemas} {(https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues/30)}
-   {recipe edits} {https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues/29}
-   {delete function} {https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues/29}

<!-- markdownlint-disable-file MD013 -->