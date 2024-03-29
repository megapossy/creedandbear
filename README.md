# Creadandbear Exam
Start at [creedandbear.pages.dev/login](https://creedandbear.pages.dev/login)

Use superuser@creedandbear.com to be able to login. I disabled auth gaurds by always adding a superuser@creedandbear.com user.

## Note on Build Bundle
Faker added about 1mb to the bundle. Its being used when getting users. Will be removed if fake data is not needed anymore. 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
