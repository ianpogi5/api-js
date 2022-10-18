# api-js-reference

Reference repo for JS API project.

## Prerequisites

- We will use yarn to enable monorepo
- Not tested in M$ Windows.

### Mongodb server

This project requires mongodb server. You can easily set it up using docker compose. A `docker-compose.yml` is included in the repo.

```bash
docker compose up -d
```

### Yarn workspaces

Example commands

```bash
# install all packages
yarn

# run npm script in root
yarn <script-name>
yarn lint-staged

# install an npm package in root project
yarn add some-package
yarn add serverless
yarn add -D prettier

# run npm script in sub package
yarn workspace <project-name> <script-name>
yarn workspace model lint
yarn workspace model test

# install an npm package in sub project
yarn workspace <project-name> add some-package
yarn workspace model add mongoose
yarn workspace model add -D eslint

```

## Coding

### Auto code formatter and linting

We use [prettier](https://prettier.io/) to format our codes and [eslint](https://www.npmjs.com/package/eslint) to lint,

VSCode extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Auto check code format and lint every commit

We use [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) to make this happen.

To configure, edit the file [.lintstagedrc.json](/.lintstagedrc.json). For more info, go to [lint-staged](https://github.com/okonet/lint-staged#Configuration) documentation.

### Run unit/integration tests

```bash
# One time execution
yarn workspace <package-name> test
yarn workspace model test

# Run every time a file has changed
yarn workspace <package-name> test:watch
yarn workspace model test:watch
```

### Build package

```bash
# One time execution
yarn workspace <package-name> build
yarn workspace model build

# Run every time a file has changed
yarn workspace <package-name> build:watch
yarn workspace model build:watch
```

### Able to run APIs in one `serverless-offline` instances

Coming soon.

## Continuous Integration

### Auto check code format and lint every commit

Coming soon.

### Run unit/integration tests

Coming soon.

### Able to run APIs in one `serverless-offline` instances

Coming soon.

### Run static code analysis

Coming soon.

## Continuous Deployment

### Deploy each API separately

Coming soon.

## Yarn

### Cache packages

Coming soon.
