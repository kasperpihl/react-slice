# React Slice

A simple performant approach to state management in React.

1. Uses reducers and dispatch 🤖
2. Access state from anywhere with hooks 🚀
3. You can still [use statically](https://github.com/kasperpihl/react-slice/blob/master/docs/Statically.md) 😲
4. Optimized for [use with Typescript](https://github.com/kasperpihl/react-slice/blob/master/docs/Typescript.md) 💙
5. Full control of [render performance](https://github.com/kasperpihl/react-slice/blob/master/docs/Rerenders.md) 🔥
6. [2kb minified](https://bundlephobia.com/result?p=react-slice) 💪

## Demo

I've made a few Codesandboxes to play around with react-slice

- [Javascript sandbox](https://codesandbox.io/s/clever-worker-bpq1g)
- [Typescript sandbox](https://codesandbox.io/s/youthful-mendel-ze693)

## Installation

```js
npm i react-slice
```

## The basics

Create a file and export your hook w/ reducer (fx counterSlice.js)

```js
// counterSlice.js
import { createSlice } from 'react-slice'; // 👈👈👈

export default createSlice({
  reducer: /*👈👈👈*/ (state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      default:
        return state;
    }
  },
  initialState: /*👈👈👈*/ 0,
  debugName: 'Counter' // Optional.
});
```

Then import that file somewhere else (fx App.jsx) 🏴‍☠️

```js
// App.jsx
import React from 'react';
import counterSlice from './counterSlice'; // 👈👈👈

export default function App(test) {
  const counterState = counterSlice.use(); // 👈👈👈

  const onClick = () => {
    counterSlice.dispatch({ type: 'increment' }); // 👈👈👈
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

- [API for createSlice()](https://github.com/kasperpihl/react-slice/blob/master/docs/API.md)
- [Avoid unnecessary re-renders](https://github.com/kasperpihl/react-slice/blob/master/docs/Rerenders.md)
- [Use statically from utils etc.](https://github.com/kasperpihl/react-slice/blob/master/docs/Statically.md)
- [Use Typescript and get strongly typed state and actions](https://github.com/kasperpihl/react-slice/blob/master/docs/Typescript.md) 💙
- Use with Server-side rendering (coming soon, would love ideas/usecases)
