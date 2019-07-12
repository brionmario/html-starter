# Contributing to HTML Starter

As a contributor, here are the guidelines we would like you to follow:

- [Submission Guidelines](#submit)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)
- [Branch Naming Conventions](#branch-naming)

## <a name="submit"></a> Submission Guidelines

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub](https://github.com/brionmario/html-starter/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design up front helps to ensure that we're ready to accept your work.
1. Fork the brionmario/html-starter repository.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b fix/your-fix master
   ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run the full test suite and ensure that all tests pass.
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```shell
   git push origin fix/your-fix
   ```

1. In GitHub, send a pull request to `brionmario/html-starter:master`.

- If we suggest changes then:

  - Make the required updates.
  - Re-run the test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete fix/your-fix
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D fix/your-fix
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- We follow [Google's JavaScript Style Guide][js-style-guide], but wrap all code at
  **100 characters**.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the changelog**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
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

#### Emojis

Feel free to spice up the git messages with `emojis`. Use the [gitmoji](https://gitmoji.carloscuesta.me/) guide by Carlos Cuesta to create awesome commits.

Examples:

| Type                  | Code                    | Preview               |
| --------------------- | ----------------------- | --------------------- |
| New Features          | `:sparkles:`            | :sparkles:            |
| Remove code & files   | `:fire:`                | :fire:                |
| Improving performance | `:zap:`                 | :zap:                 |
| CI Changes            | `:construction_worker:` | :construction_worker: |
| Bug Fix               | `:bug:`                 | :bug:                 |
| Breaking Changes      | `:boom:`                | :boom:                |
| Work on Docker        | `:whale:`               | :whale:               |
| UI Changes            | `:lipstick:`            | :lipstick:            |

Samples:

```
docs(readme): update readme. :memo:
```

```
ci(travis): update travis config :construction_worker:

With this change, trvis will run the unit tests before building the project.
```

```
fix(ci): fix travis build failure :bug:

Travis was treating warning as failures which caused the build to fail. Adding CI=false at the beginning of the build command fixed the issue.

Fixes #125
Closes #168

PR Close #456
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **chore**: Updating grunt tasks etc; no production code change
- **feat**: A new feature
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the component affected.

Follow these `<scope>` values:

- **common**
- **core**
- **scripts**
- **assets**
- **styles**
- **vendor**
- **tests**
- **vcs**
- **config**

- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

### Subject

The subject contains a clear description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

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
