# Phase 1
## Current Components
- Linting via ESLint + style enforcement via Prettier in VSCode
- Automated unit tests w/ Jest running on a GitHub action
- Code Quality via Code Factor
- Code Quality via Human Review via PR review
  - Required pull request reviewer + approval
  - Netlify staging app preview
- Documentation generation w/ JSDoc running on a GitHub action

## Breakdown
### 1) Development - Code Quality
Our CI/CD pipeline begins on the dev's end, within VSCode. At this stage, we enforce code style with prettier and linting with ESLint. As outlined in our [developer guidelines](https://github.com/cse110-fa21-group5/cse110-fa21-group5/blob/main/source/README.md), each developer executes Prettier + ESLint while coding & before committing. Consistent linting and style enforcement across the team is ensured via git-tracked `/source/.eslintrc.json` and `/.vscode/settings.json` configuration files. To further enforce style, we have included a GitHub workflow that uses GitHub's *super-linter* to lint committed source code to ensure that they are up to the ESLint standards. This workflow (`lint.yml`) runs whenever any changes are made to JavaScript source code files. Additionally, if the workflow detects that a file is not up to ESLint standards, the developer can open the workflow log and see exactly where the styling needs to be edited. 

### 2) Testing
Once code is committed and pushed to the remote, the next stage of our pipeline begins. On any push which contains changes to a JS file nested within `/source/public`, a GitHub action will trigger to run tests using Jest. This action runs `npm test` to execute all unit tests with Jest, then outputs whether or not these tests succeeded. For next steps on this action, we'd like to block merging PRs until all status checks have passed (notably, the Jest test GitHub action). Currently, tests are created for our utility functions for recipe data parsing. We may also explore further unit tests & E2E testing if we have enough time.

### 3) Review & Automation - Code Quality
Moving along in our pipeline, we then have another step to maintain code quality via requiring pull requests to be approved before merging to the main branch. This allows us to protect the main branch by permitting the team to peer review code changes, thereby adding a layer of accountability for devs to follow the enforced code quality practices. In order to make sure that all of the files on the main branch are of good quality, all pull requests must be reviewed by at least one team member before it is merged to main. It is preferred that this reviewer is someone that had not worked on that branch so that they can provide unbiased feedback. To help with the human review process, we have CodeFactor set up on our project so that upon a push, the changes will be evaluated to see if any style mistakes were made. A Netlify staging preview will also be created so that the reviewer can see if any breaking changes are present during the usage of the app. The owner of the pull request can also consider this feedback to additionally inform fixes for potential breaking changes or style mistakes.

### 4) Documentation
Next, whenever a PR is opened, a GitHub action is initiated which generates code documentation via JSDoc. This documentation is added to the branch in the folder `/source/docs/`, and is viewable via the entry point `/source/docs/index.html`. This method allows all PRs to include up-to-date code documentation.

Once PRs are approved, the code is merged to main, thus concluding our pipeline.

