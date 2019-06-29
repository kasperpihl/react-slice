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

- [Creating slices (isolated state objects)](#registersliceoptions)
- [Accessing and updating the slices](#sliceprovider--createslicestore)

### Creating slices (isolated state objects)

Register a reducer in file (fx counter.slice.js)

createSlice(options)

options object **Params**

| Name         | Type                    | Default value | Description                                           |
| ------------ | ----------------------- | ------------- | ----------------------------------------------------- |
| reducer      | function(state, action) | **required**  | A standard reducer taking 2 arguments: state & action |
| initialState | any                     | undefined     | The initial value of the state                        |
| debugName    | string                  | null          | Turn on debugging, showing the string in the log      |

```js
// counter.slice.js
import { createSlice } from 'react-slice';

export default createSlice({
  debugName: 'counter',
  reducer: (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          value: state.value + 1
        };
      case 'decrement':
        return {
          ...state,
          value: state.value - 1
        };
      default:
        return state;
    }
  },
  initialState: {
    value: 0
  }
});
```

### Accessing and updating the slices

Parameters

- updateDepFunc `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```js
import React from 'react';
import useCounterSlice from './counter.slice';

export default function App(test) {
  const [counter, counterDispatch] = useCounterSlice();

  return (
    <div className="App">
      <h1>{counter.value}</h1>
      <h2>Start clicking to see some magic happen!</h2>
      <button
        onClick={() => {
          counterDispatch({ type: 'increment' });
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          counterDispatch({ type: 'decrement' });
        }}
      >
        Decrement
      </button>
    </div>
  );
}
```
