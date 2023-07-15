# Compose function

Implements `compose` and `composeMono` which are used for multiple composing function into one.

## Install

```bash
npm install --save @gmjs/compose-function
```

## API

- `compose<TInput, TOutput>(...ops: readonly Fn1<any, any>[]): Fn1<TInput, TOutput>`
  - Description
    - Compose multiple functions into one.
    - Strongly typed for compositions of up to 8 functions.
  - Parameters
    - `ops: readonly Fn1<any, any>[]` - The functions to compose.
- `composeMono<T>(...ops: readonly Fn1<T, T>[]): Fn1<T, T>`
  - Description
    - Compose multiple functions into one.
    - Same as `compose`, but all functions being composed must have the same input and output type.
