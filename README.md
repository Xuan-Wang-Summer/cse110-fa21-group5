# 🌊 Team Ocean's Recipe Manager

[![CodeFactor][codefactor-shield]](https://www.codefactor.io/repository/github/cse110-fa21-group5/cse110-fa21-group5)
[![Netlify Status][netlify-shield]](https://team-ocean-recipes.netlify.app/)
![Run Unit Tests](https://github.com/cse110-fa21-group5/cse110-fa21-group5/actions/workflows/run-unit-tests.yml/badge.svg)

## 📘 Our single source of truth!

-   Visit our [team page](admin/team.md) for more details about our team!

## 📁 File Structure

-   `/.github/workflows`: GitHub Actions workflows
-   `/.vscode/settings.json`: Project-wide configurations for VS Code
-   `/admin`: Administrative material
    -   `/admin/branding`: Branding materials (logos, color schemes, etc.)
    -   `/admin/cipipeline`: Pipeline artifacts (breakdown, diagram, video)
    -   `/admin/meetings`: Meeting minutes (notes)
    -   `/admin/misc`: Miscellaneous material like team rules
    -   `/admin/videos`: Videos (team intro, team status, etc.)
-   `/source`: Source code
    -   `/source/__tests__`: Unit tests
    -   `/source/docs`: Generated JSDoc for source code
    -   `/source/public`: Client side code that will be accessible by the public
-   `/specs`: Project specs
    -   `/specs/adrs`: Architectural Decision Records
    -   `/specs/api-docs`: External API documentation and research
    -   `/specs/brainstorm`: Brainstorming artifacts
    -   `/specs/pitch`: Pitch deck & other artifacts
    -   `/specs/schemas`: Schemas for back-end storage structures

## 💡 Summary/Abstract

**We aim to create a recipe manager that provides
personalization and organization to keep cooking
efficient and productive for newer cooks & active
and health-conscious individuals.** The recipe
manager is designed to help users on their mission to
improve their long-term diet in favor of homemade
meals rather than takeout & junk food through the
week. In addition, the recipe manager addresses
important micro-level concerns like following a recipe’s
ingredients & steps while cooking, tracking necessary
ingredients for recipes in a grocery list, and easily
performing CRUD operations on recipes.

## 📝 Documentation

-   [Source code guidelines](/source/README.md)
-   [JSDoc](https://cse110-fa21-group5.github.io/cse110-fa21-group5/source/docs/)
-   [Wiki](https://github.com/cse110-fa21-group5/cse110-fa21-group5/wiki)

### 💻 Tech Stack

-   Static HTML
-   CSS
    -   Bootstrap
    -   Font Awesome Icons
-   JS
    -   ESLint
    -   Web APIs
        -   Web Storage API
        -   Fetch API
    -   External APIs
        -   Spoonacular
        -   CalorieNinjas

[codefactor-shield]: https://img.shields.io/codefactor/grade/github/cse110-fa21-group5/cse110-fa21-group5/main
[netlify-shield]: https://img.shields.io/netlify/0552da19-8d05-408c-963e-04f9ea60650d?color=blue