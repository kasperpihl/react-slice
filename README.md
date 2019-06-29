# React Slice

A simple performant approach to state management using only React built'ins.

1. Uses reducers and dispatch 🤖
2. Access state from anywhere with hooks 🚀
3. Optimized for use with Typescript 💙
4. Full control of render performance 🔥

## Installation

```js
npm i react-slice
```

## Getting started

Let me show first, then explain after 🙏

Create a file and export your reducer (fx counter.slice.js)

```js
// counter.slice.js
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
  initialState: /*👈👈👈*/ 0
});
```

Then import that file somewhere else (fx App.jsx)
hint: it exports a hook 🏴‍☠️

```js
// App.jsx
import React from 'react';
import useCounterSlice from './counter.slice'; // 👈👈👈

export default function App(test) {
  const [counter, counterDispatch] = useCounterSlice(); // 👈👈👈

  const onClick = () => {
    counterDispatch({ type: 'increment' }); // 👈👈👈
  };
  return (
    <div className="App">
      <h1>{counter /*👈👈👈*/}</h1>
      <h2>Start clicking to see some magic happen!</h2>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}
```

And boom! 💥 That's all you need to get up and running!

## API

The API only exposes one function right now `createSlice(options)`

it takes an options object that looks like this:

| Name         | Type                    | Default value | Description                                           |
| ------------ | ----------------------- | ------------- | ----------------------------------------------------- |
| reducer      | function(state, action) | **required**  | A standard reducer taking 2 arguments: state & action |
| initialState | any                     | undefined     | The initial value of the state                        |
| debugName    | string                  | null          | Turn on debugging, showing the string in the log      |
