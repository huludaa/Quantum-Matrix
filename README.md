# myproject

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Git Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.  
**Format:** `<type>(<scope>): <subject>`

### Commit Types

| Type       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| `feat`     | A new feature                                                       |
| `fix`      | A bug fix                                                           |
| `docs`     | Documentation-only changes                                          |
| `style`    | Changes that do not affect code logic (whitespace, formatting, etc) |
| `refactor` | Code changes that neither fix bugs nor add features                 |
| `perf`     | Code changes that improve performance                               |
| `test`     | Adding missing tests or correcting existing tests                   |
| `chore`    | Maintenance tasks (dependency updates, config changes, etc)         |
| `revert`   | Reverts a previous commit                                           |
| `build`    | Changes affecting build system or external dependencies             |

### Examples

```bash
git commit -m "feat(auth): implement JWT authentication"
git commit -m "fix(api): resolve null pointer exception in user endpoint"
git commit -m "docs(readme): add deployment instructions"
git commit -m "style: format code with Prettier"
git commit -m "refactor(router): optimize route loading strategy"
git commit -m "perf(db): add indexing for frequently queried fields"
git commit -m "test: add unit tests for payment service"
git commit -m "chore: update eslint config"
git commit -m "revert: revert accidental deletion of config file"
git commit -m "build: upgrade webpack to v5"
```
