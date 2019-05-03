# memi nuxt lecture

## Install tools

- node v8
- yarn
- firebase-tools

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Firebase Setup

```bash
# login
$ firebase login

# init
$ firebase init
? Select a default Firebase project for this directory: # select your choise
? What file should be used for Database Rules? database.rules.json 
? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? No
✔  Wrote functions/package.json
✔  Wrote functions/index.js
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes
```

## deploy

```bash
$ yarn firebase:deploy
```
