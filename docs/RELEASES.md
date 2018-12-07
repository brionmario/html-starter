# Release Instructions

This document contains all the necessary instructions to release the project and to generate the corresponding changelog.

Always follow the semantic versioning guidelines when releasing the application. The following generic script can be used to easily make different releases/pre-releases.

```bash
release=type preid=id npm run semver
```

Replace the `type` and `id` with the corresponding values.

##### Examples

1. Major release - 2.0.0

```bash
release=major npm run semver
```
2. Minor release - 2.1.0

```bash
release=minor npm run semver
```

3. Patch release - 2.1.1

```bash
release=patch npm run semver
```

4. Major Alpha release - 2.0.0-alpha.0

```bash
release=premajor preid=alpha npm run semver
```

5. Release Candidate minor release - 2.1.0-rc.0

```bash
release=preminor preid=rc npm run semver
```

6. Release next beta (2.0.0-beta.0 to 2.0.0-beta.1)

```bash
release=prerelease preid=beta npm run semver
```
