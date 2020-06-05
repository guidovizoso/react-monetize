<div align="center">
<img
    height="80"
    width="80"
    alt="money"
    src="https://raw.githubusercontent.com/guidovizoso/react-monetize/master/money.png"
  />

<h1>react-monetize</h1>
<p>Helpers and hooks to speed up your integration with Web Monetization API</p>
<a href="https://react-monetize.now.sh"><b>react-monetize.now.sh</b></a>
</div>
<br/>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![CI](https://github.com/guidovizoso/react-monetize/workflows/CI/badge.svg?tag=1.0.0-rc.5)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![npm](https://img.shields.io/npm/dt/react-monetize?label=npm%20downloads)
<a href="https://twitter.com/guido_vizoso" target="_blank">
<img alt="Twitter: guido\_vizoso" src="https://img.shields.io/twitter/follow/guido_vizoso.svg?style=social" />
</a>

## Install

Currently supports React, Create React App, Next Js and Gatsby (through [gatsby-plugin-monetization](https://github.com/mrmuhammadali/gatsby-plugin-monetization)).
Not yet tested in Preact.

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

## WIP

-   Improve documentation code and details.
-   Add documentation project to the library code.

## Future changes

-   Remove global declaration for document once the property is added to DOM types.
-   _Monetization UI?_

## Author

👤 **Guido Vizoso <guido.vizoso9@gmail.com>**

-   Twitter: [@guido_vizoso](https://twitter.com/guido_vizoso)
-   Github: [@guidovizoso](https://github.com/guidovizoso)
-   LinkedIn: [@guidovizoso](https://linkedin.com/in/guidovizoso)

## Contributors

👤 **Muhammad Ali <hi@muhammadali.io>**

-   Twitter: [@muhammadali_io](https://twitter.com/muhammadali_io)
-   Github: [@mrmuhammadali](https://github.com/mrmuhammadali)

## Related projects

-   Sharafian's approach: https://github.com/sharafian/react-web-monetization
-   jkga's vanilla: https://github.com/jkga/is-web-monetized
-   sorxrob's Svelte project: https://github.com/sorxrob/svelte-monetization

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
