# Contributing to Gulp Static Seed

As a contributor, here are the guidelines we would like you to follow:

 - [Commit Message Guidelines](#commit)
 - [Branch Naming Conventions](#branch-naming)

## <a name="commit"></a> Commit Message Guidelines

We have used `semantic git commits` through out the application and would like to keep them consistent. Please follow the following specified rules when committing your code.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a reference to a bug(issue) if any.

Samples:

```
docs(readme): update readme
```
```
build: add watch mode for js and sass linting

With this change, the dev mode could be run with the javascript and sass linting in watch mode.

Fixes #125
Closes #168

PR Close #456
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **chore**: Updating grunt tasks etc; no production code change
* **feat**: A new feature
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Scope
The scope should be the name of the component affected.

Follow these `<scope>` values:
* **scripts**
* **assets**
* **styles**
* **vendor**
* **tests**
* **config**

There are currently a few exceptions to the "use package name" rule:

* **packaging**: used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc.
* **changelog**: used for updating the release notes in CHANGELOG.md
* **aio**: used for docs-app (angular.io) related changes within the /aio directory of the repo
* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all packages (e.g. `style: add missing semicolons`)

### Subject
The subject contains a clear description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## <a name="branch-naming"></a> Branch Naming Convention

Please follow the following convention when creating new branches.

```
<type>/<name>
```

### Types

<table>
  <thead>
    <tr>
      <th>Prefix</th>
      <th>Use case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>feature</td>
      <td>New feature</td>
    </tr>
    <tr>
      <td>fix</td>
      <td>Code change linked to a bug</td>
    </tr>
    <tr>
      <td>hotfix</td>
      <td>Quick fixes to the codebase</td>
    </tr>
    <tr>
      <td>release</td>
      <td>Code-base releases</td>
    </tr>
  </tbody>
</table>

### Name
Always use dashes to separate words, and keep it short.

##### Examples
```
feature/component-architecture
hotfix/upload-size
fix/incorrect-upload-progress
release/1.0.x
```
