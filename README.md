# clap.js

Unified tap/click event API. Because `touchstart` can be misinterpreted in
swipe scenarios. Do not let it happen with `clap.js`.

# usage

``` js
var onClap = require('clap.js')

onClap(domElement, function(e) {
  console.log('click or tap here')
})

// onClick() returns dispose handler:
var dispose = onClick(otherElement, function(e) { /* ... */ })
// So that if you don't need it anymore, you can dispose it:
dispose()
```

# install

Grab it from npm to use with your favorite bundler:

```
npm install clap.js --save
```

Or use CDN:

```
https://cdn.rawgit.com/anvaka/clap.js/v1.0.0/dist/onclap.min.js
```

# license

MIT
