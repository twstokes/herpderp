## Development
* `yarn install`
* Configure your editor for [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)
* `yarn watch`
* `yarn build`

## Building for Chrome

1. Extensions -> Load unpacked extension...
2. Browse to `dist` directory and choose it
3. Extensions -> Pack extension...

## Building Firefox WebExtension

1. `$ npm install --global web-ext`
2. `cd dist/`
3. `web-ext run` (to test before building)
4. `web-ext build`

Check out [web-ext](https://github.com/mozilla/web-ext) for more information
