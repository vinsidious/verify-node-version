# verify-node-version
> A super simple module that checks a user's node/npm versions against your .nvmrc and .npmrc.

#### Usage
```js
import verifyNodeVersion from 'verify-node-version';

verifyNodeVersion();
```

If the versions match, the function returns `undefined`. If the versions **don't** match, it will display a pretty little explanation and `process.exit(1)`.

```
> npm start
>
> The required node version is 5.9.1 and you're currently running 6.7.0
```
