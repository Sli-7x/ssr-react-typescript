# Typescript SSR React boilerplate

### How to start

* `npm i` install dependencies

##### development

* `npm run dev` Start development

##### production

* `npm run build:client` Build client for production
* `npm run server` start server production

## Todo

* [x] server side rendering
* [x] server side caching
* [x] code split\*
* [x] typescript
* [x] styled-components
* [x] styled-components theme (another folder or move to own package?)
* [x] react router v4
* [x] redux + redux-thunk
* [x] express.js
* [x] static folder
* [x] react-helmet
* [x] tests
* [ ] error component
* [ ] wait for webpack 4 docs update and fix warnings

#### Notes

\*before running `npm run build:client`, need to change in tsconfig.json `module: "esnext"`for codesplit
