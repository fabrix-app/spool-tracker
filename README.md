# spool-tracker

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

:package: Tracker Spool


## Install
```sh
$ npm install --save @fabrix/spool-tracker
```

## Configure

```js
// config/main.ts
import { TrackerSpool } from '@fabrix/spool-tracker'
export const main = {
  spools: [
    // ... other spools
    TrackerSpool
  ]
}
```

## Configuration

```
// config/tracker.ts
export const tracker = {

}
```

For more information about store (type and configuration) please see the tracker documentation.

## Usage

```html

<a href="https://<your_website>/resource/<resource_token>/click?url=<the_link>">
  <img src="https://<your_website>/resource/<resource_token>/impression?url=https://<your_image_url>" alt="Ad Sample">
</a>

```

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-tracker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-tracker
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-tracker/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-tracker/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-tracker.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-tracker
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-tracker.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-tracker/coverage

