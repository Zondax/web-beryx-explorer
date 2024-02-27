# web-beryx

![Zondax banner](./assets/readme-top.png)

[![License](https://img.shields.io/badge/security-confidential-red)]()
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Zondax_web-beryx&metric=alert_status&token=d4eb32a273ec995bc8732790fe5afb1f8fa8d8bc)](https://sonarcloud.io/summary/new_code?id=Zondax_web-beryx)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Zondax_web-beryx&metric=vulnerabilities&token=d4eb32a273ec995bc8732790fe5afb1f8fa8d8bc)](https://sonarcloud.io/summary/new_code?id=Zondax_web-beryx)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Zondax_web-beryx&metric=sqale_rating&token=d4eb32a273ec995bc8732790fe5afb1f8fa8d8bc)](https://sonarcloud.io/summary/new_code?id=Zondax_web-beryx)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Zondax_web-beryx&metric=code_smells&token=d4eb32a273ec995bc8732790fe5afb1f8fa8d8bc)](https://sonarcloud.io/summary/new_code?id=Zondax_web-beryx)

## 🧑‍💻 Develop

- Install all dependencies `yarn install`
- Initialize your dev environment: `yarn dev:setup`

We use turbo for build caching. While you can use `yarn`, try using `turbo` to run all package.json tasks.

Example:

```
turbo lint
turbo build
```

The advantage is that things will be cached and the second time you run these commands, you might get subsecond times :)

### 🚀 In production

```bash
turbo build
turbo start
```

## Stack

- Eslint + Prettier
- Vercel
- Github Actions

## Guidelines

### Tooling

We recomment the following tools (ask for licenses if you want):

- WebStorm license, please ask.
- Polypane license (https://polypane.app/)
- GitKraken (https://www.gitkraken.com/)
- Sentry CLI (https://docs.sentry.io/product/cli/installation/)

### References

- Nice community here: <https://github.com/shuding/nextra/discussions>

### Codemods

```bash
npx @mui/codemod v5.0.0/preset-safe .
```

```bash
npx @mui/codemod v5.0.0/top-level-imports .
npx @mui/codemod v5.0.0/rename-css-variables .
npx @mui/codemod v5.0.0/base-hook-imports .
```
