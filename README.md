# React Slice

A simple performant approach to state management in React.

1. Uses reducers and dispatch 🤖
2. Access state from anywhere with hooks 🚀
3. You can still [use statically](https://github.com/kasperpihl/react-slice/blob/master/docs/Statically.md) 😲
4. Optimized for [use with Typescript](https://github.com/kasperpihl/react-slice/blob/master/docs/Typescript.md) 💙
5. Full control of render performance 🔥
6. [2kb minified](https://bundlephobia.com/result?p=react-slice) 💪

## Demo

I've made a few Codesandboxes to play around with react-slice

- [Typescript sandbox](https://codesandbox.io/s/youthful-mendel-ze693)

## Installation

```js
npm i react-slice
```

## The basics

Create a file and export your hook w/ reducer (fx useCounterSlice.js)

```js
// useCounterSlice.js
import { createSliceHook } from 'react-slice'; // 👈👈👈

export default createSliceHook({
  name: 'counter', // Used for debugging mainly.
  reducer: /*👈👈👈*/ (state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      default:
        return state;
    }
  },
  initialState: /*👈👈👈*/ 0
});
```

Then import that file somewhere else (fx App.jsx)
hint: it exports a hook 🏴‍☠️

```js
// App.jsx
import React from 'react';
import useCounterSlice from './useCounterSlice'; // 👈👈👈

export default function App(test) {
  const [counter, counterDispatch] = useCounterSlice(); // 👈👈👈

  const onClick = () => {
    counterDispatch({ type: 'increment' }); // 👈👈👈
  };
  return (
    <div className="App">
      <h1>{counter /*👈👈👈*/}</h1>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}
```

And boom! 💥 That's all you need to get up and running!

## Advanced/FAQ

- [Avoid unnecessary re-renders](https://github.com/kasperpihl/react-slice/blob/master/docs/Rerenders.md)
- [Use statically from utils etc.](https://github.com/kasperpihl/react-slice/blob/master/docs/Statically.md)
- [Use Typescript and get strongly typed state and actions](https://github.com/kasperpihl/react-slice/blob/master/docs/Typescript.md) 💙
- Use as an HOC. (coming soon)
- Use with Server-side rendering (coming soon)

## API

The API only exposes one function right now `createSliceHook(options)`

It returns a hook, and takes an options object like this:

| Name         | Type                    | Default value | Description                                           |
| ------------ | ----------------------- | ------------- | ----------------------------------------------------- |
| name         | string                  | null          | A name to show in the debug log, redux-logger style   |
| reducer      | function(state, action) | **required**  | A standard reducer taking 2 arguments: state & action |
| initialState | any                     | undefined     | The initial value of the state                        |

The hook it returns looks like this:

`useCounterSlice(updateDepFn?: (state) => [...deps]): [state, dispatch]`

| Name        | Type           | Default value | Description                                                  |
| ----------- | -------------- | ------------- | ------------------------------------------------------------ |
| updateDepFn | (state) => []) | null          | A function that return array of values to check for equality |

```js
function App() {
  // This only re-renders when state.counter and state.someOtherVal updates! 🔥
  const [counter, counterDispatch] = useCounterSlice(state => [
    state.counter,
    state.someOtherVal
  ]);
  // Render your stuff!
}
```
