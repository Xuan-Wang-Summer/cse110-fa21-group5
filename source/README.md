# Project Source Code

[![CodeFactor](https://www.codefactor.io/repository/github/cse110-fa21-group5/cse110-fa21-group5/badge?s=5332332ef2c647f086442b3584693dbe4a0b2068)](https://www.codefactor.io/repository/github/cse110-fa21-group5/cse110-fa21-group5)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0552da19-8d05-408c-963e-04f9ea60650d/deploy-status)](https://team-ocean-recipes.netlify.app/)

## 🚀 Getting Started

### Git Commit Guidelines

-   Check if you have Git installed on your computer with a minimum version of 2.0.0 by running `git --version` in your terminal.
-   If you do not have Git, install it [here](https://git-scm.com/downloads). (You may have to restart VS Code after installing)

1. Make sure you have the latest version of `main` by running `git pull origin main`
2. Create & checkout a new branch to work on with this command & naming scheme:
    - `git checkout -b [firstname]+[partnername]-[feature-topic]` (example branch name: `adory+hanming-api-testing`)
3. Work on & change ONLY the files that correspond to your feature/topic. If you notice minor discrepancies in unrelated files, create GitHub issues for them.
4. Make sure you use Prettier to reformat style and run `eslint --fix` in `/source` to lint your code before committing. (Discussed in Coding section below)
5. Add & commit your files with VS Code or Git commands. Your commit message should follow this format: `Add/Update/[Verb] [things changed] (#[issue number])"`.
    - Example: `Update style guidelines (#2)`
    - Git commands: `git add .` and `git commit -m "Add/Update/[Verb] __ (#[issue number])"`
6. If you want to update the remote repostiory, push your changes.
7. If you then want to merge your changes with the main branch, create a pull request to your branch
   [here](https://github.com/cse110-fa21-group5/cse110-fa21-group5/pulls).
    - Netlify should

### Coding Environment

1. Install [VS Code](https://code.visualstudio.com/download) as it will be our primary editor with configurations to keep consistent style.
2. Make sure you have these extensions installed:
    1. ESLint
    2. Live Share
    3. Prettier
    4. Visual Studio IntelliCode
    5. Live Server (should already own from early labs)
3. Open the VS Code terminal and `cd` to the `/source` folder.
4. Run `npm install` to install ESLint for linting your JS style. (You need Node.js installed for this, but you should have it from earlier lab instructions)
5. You should now be ready to code! The `.eslintrc.json` file and the `/.vscode/settings.json` file define style configurations that your VS Code
   should use to warn you about when your style is off.
    1. When you write code, use `Alt+Shift+F` or `Option+Shift+F` to have Prettier reformat the entire document, which will fix indents and stuff.
    2. Before committing, run `eslint --fix` from the `/source` directory in your terminal to lint your code.
6. To test the code, the Live Server extension we've been using in the labs should be sufficient.
7. If you are working with a partner, the Live Share extension is useful for collaborative coding.
    1. Open the Live Share tab in VS Code
    2. Start a session & share the link to whoever you want to join you!

## 📁 File Structure

-   `public` will contain all of the files accessible by the client/user.
    -   `.dev`: Exploratory programming
        -   Create any new files for exploring and experimenting in here!
    -   `components`: HTML for repeated components in views (sidebar, drawer, etc.).
    -   `images`: Images for the app.
    -   `scripts`: JavaScript for the app.
        -   `main.js` is the initialization script for every view on the app. It initializes front-end functionality like tooltips.
        -   `template.js` is a file you can use as a reference for your scripts.
        -   `[view-name].js`: Use this naming scheme for scripts specific to an HTML view.
    -   `styles`: CSS styles for the app.
        -   `styles.css` defines global styles to be used across the app.
        -   `[view-name].css`: Use this naming scheme for stylesheets specific to an HTML view.
    -   `index.html` is the home page, which will display recipes.
    -   `template.html` is a file you can use as a reference for your HTML.

## Further Style Instructions

### Front-end

-   Use VS Code's built in [Emmet](https://code.visualstudio.com/docs/editor/emmet) feature to quickly create new tabs
    -   Press Tab after writing a selector to create the element.
        -   Example: Pressing Tab after typing `a#submitBtn.btn.btn-primarry` will create an `<a>` element with the respective id and classes.
    -   Emmet also has a shortcut for creating placeholder text: Press Tab after typing `lorem`.
-   Use absolute paths starting with `/` for internal links in HTML (ex: `/images/favicon.ico`)
-   If an element has an `id`, make sure there is only one, and that the `id` is the first attribute in the opening tag.
-   When using Bootstrap classes, try to put them in this order in the class list: `Component -> Alignment/Structure -> Styling -> Spacing`
    -   Example: `class="btn btn-lg btn-primary position-fixed text-light mb-3"`
        -   Button component classes -> Fixed position -> Light text color -> Bottom margin

### Back-end

-   Make sure to comment & check console logs so that debugging messages are not always on.

## 🗒️ Resources

-   [GitHub Repo Issues](https://github.com/cse110-fa21-group5/cse110-fa21-group5/issues)
-   [GitHub Project Board](https://github.com/orgs/cse110-fa21-group5/projects/1/views/1)
-   [Bootstrap 5.1 Docs (use the search bar!)](https://getbootstrap.com/docs/5.1)
-   [Font Awesome 6.0 Icon Gallery](https://fontawesome.com/v6.0/icons?m=free)
