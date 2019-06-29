# React Slice

A simple performant approach to global state using only React built'ins.

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

export default function App() {
  const counterState = useCounterSlice();

  return (
    <div className="App">
      <h1>{counterState.counter}</h1>
      <h2>Start clicking to see some magic happen!</h2>
      <button
        onClick={() => {
          useCounterSlice.dispatch({ type: 'increment' });
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          useCounterSlice.dispatch({ type: 'decrement' });
        }}
      >
        Decrement
      </button>
    </div>
  );
}
```
