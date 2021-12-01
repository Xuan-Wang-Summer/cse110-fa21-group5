# Phase 1
## Main Components
- Linting via ESLint + style enforcement via Prettier in VSCode
- Code Quality via Code Factor
- Code Quality via Human Review via PR review
- Automated unit tests w/ Jest running on a GitHub action
- Documentation generation w/ JSDoc running on a GitHub action

## Breakdown
Our CI/CD pipeline begins on the dev's end, within VSCode. At this stage, we enforce code style with prettier and linting with ESLint. As outlined in our [developer guidelines](https://GitHub.com/cse110-fa21-group5/cse110-fa21-group5/blob/main/source/README.md), each dev executes prettier + ESLint before committing, with consistent linting and style enforcement across the team ensured via git-tracked `/source/.eslintrc.json` and `/.vscode/settings.json` config files. **In the works (maybe? review this before submitting)** For next steps, we'd like to have our Prettier style enforcement run via a GitHub action, thus removing the reliance on the developer to execute the style-enforcement stage of CI/CD. To do so, we'll need to write an action which executes prettier in such a way that mimics our config outline in `/.vscode/settings.json`.

Once code is committed and pushed to the remote, the next stage of our pipeline begins. On any push which contains changes to a js file nested within `/source/public`, a GitHub action will trigger for Jest tests. This action runs `npm test` to execute all unit tests with Jest, then outputs whether or not these tests succeeded. **In the works (maybe? review this before submitting)** For next steps on this action, we'd like to block merging PRs until all status checks have passed (notably, the jest test GitHub action).

Moving along in our pipeline, we then have another step to maintain code quality via enforcing pull requests to be approved before merging to main. This allows us to protect the main branch by permitting the team to peer review code changes, thereby adding a layer of accountability for devs to follow the enforced code quality practices. To help with this, we have CodeFactor set up on our project so that upon a push, the changes will be evaluated to see if any style mistakes were made. A Netlify staging preview will also be created so that the reviewer can 
see if any breaking changes are present during the usage of the app.

**TBD, based on when JSDocs run**
Next, whenever a PR is opened, a GitHub action is initiated which generates code documentation via JSDocs. This documentation is added to the branch in the folder `/source/docs/jsdocs`, and is viewable via the entry point `/source/docs/jsdocs/index.html`. This method allows all PRs to include up-to-date code documentation.

Once PRs are approved, the code is merged to main, thus concluding (**? maybe codefactor/netlify do something here**) our pipeline.

