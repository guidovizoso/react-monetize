<h2 align="center">💸</h2>
<h1 align="center">react-monetize <sup>1.0.0</sup></h1>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![CI](https://github.com/guidovizoso/react-monetize/workflows/CI/badge.svg?tag=1.0.0)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![npm](https://img.shields.io/npm/dt/react-monetize?label=npm%20downloads)
<a href="https://twitter.com/guido_vizoso" target="_blank">
<img alt="Twitter: guido\_vizoso" src="https://img.shields.io/twitter/follow/guido_vizoso.svg?style=social" />
</a>

> Helpers and hooks to speed up your integration with [Web Monetization API](https://webmonetization.org/)

## Install

Currently supports React, Create React App and Next Js.
Not yet tested in Gatsby or Preact.

```sh
yarn add react-monetize
```

## Usage

Wrap your app with the `MonetizeProvider` and add your payment pointer.

> You can read how to get one here: https://webmonetization.org/docs/receiving

```javascript
import { MonetizeProvider } from 'react-monetize';

function App() {
    return (
        <MonetizePovider paymentPointer="myPaymentPointer">
            <YourApp />
        </MonetizeProvider>
    );
}

export default App;
```

Now you have two hooks available to use anywhere in your app:

### useStatus

**State** is the current state provided by Web Monetization API according to this [list](https://webmonetization.org/docs/api#states).

**Events** are the payment events registered stored as `CustomEvent`.

```javascript
import { useStatus } from 'react-monetize';

function Component() {
    const { state, events } = useStatus();

    return (
        <>
            <p>State: {state}</p>
            <ul>
                {events.map((e) => (
                    <li key={e.timeStamp}>{`${e.detail.amount} ${e.detail.assetCode}`}</li>
                ))}
            </ul>
        </>
    );
}

export default Component;
```

### useContent

Provides a boolean that indicates if the user has provided a payment or not so you can choose to show paid content.

```javascript
import { useContent } from 'react-monetize';

function MonetizedContent() {
    const { isMonetized } = useContent();
    return (
        <React.Fragment>
            {isMonetized ? <div>My premium content</div> : <div>You need to subscribe to access premium content</div>}
        </React.Fragment>
    );
}

export default MonetizedContent;
```

## Contribute

Clone and then:

```sh
cd react-monetize
yarn
yarn build
cd examples/next-js
yarn
yarn dev
```

Develop.

## Roadmap to v1.0.0

-   ~~Improve code on MonetizeContext file.~~
-   ~~Add ESLint.~~
-   ~~Automatic deployment with Github Actions.~~
-   Add tests.

## Future changes

-   Remove global declaration for document once the property is added to DOM types.
-   _Monetization UI?_

## Author

👤 **Guido Vizoso <guido.vizoso9@gmail.com>**

-   Twitter: [@guido_vizoso](https://twitter.com/guido_vizoso)
-   Github: [@guidovizoso](https://github.com/guidovizoso)
-   LinkedIn: [@guidovizoso](https://linkedin.com/in/guidovizoso)

## Related projects

-   Sharafian's approach: https://github.com/sharafian/react-web-monetization
-   jkga's vanilla: https://github.com/jkga/is-web-monetized
-   sorxrob's Svelte project: https://github.com/sorxrob/svelte-monetization

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
