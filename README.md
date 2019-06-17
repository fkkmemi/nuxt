# memi nuxt lecture

## Install tools

- node
- yarn
- firebase-tools

## .env File setting

eg)
```text
FIREBASE_APIKEY=yourKey
FIREBASE_AUTHDOMAIN=yourDomain
FIREBASE_PROJECTID=yourProjectId
RECAPTCHA_KEY=yourRecaptchaKey
``` 

guide: [https://firebase.google.com/docs/firestore/quickstart](https://firebase.google.com/docs/firestore/quickstart)

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
```

Select all and enter default

## deploy

```bash
$ yarn firebase:deploy
```

## recaptcha setting

```bash
$ cd functions
$ firebase functions:config:set recaptcha.key="THE API KEY"
```

참고: [https://www.google.com/recaptcha](https://www.google.com/recaptcha)

리캡차 키를 파이어베이스 펑션스에 저장함