# React Slice

A simple performant approach to global and LOCAL state using only React built'ins.

## Installation

```js
npm i react-slice
```

## Basic setup

- [Register our reducers (registerSlice)](#registersliceoptions)
- [Create and Provide the store (createSliceStore + SliceProvider)](#sliceprovider--createslicestore)
- [Access/update global state (useSlice)](#useslicestatekey-updatedepfunc-state-dispatch)

## Advanced stuff

- Coming soon

### createSlice(options)

Register a reducer and initial data for a unique key in the state tree.

options object **Params**

- name `string` - A unique key on where to store/access it from the state tree.
- debug `boolean`
- reducer `function(state, type, payload)` - A reducer on how to update state tree, given action arguments
- initialState `any` - the initial state object.

```js
import { createSlice } from 'react-slice';

export default createSlice({
  name: 'counter',
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

### Global state

In order to use global state, all you need to do, is add a provider similar to Redux.
Probably index.js:

```js
import { SliceProvider } from 'react-slice';

render(
  <SliceProvider>
    <App>
  </SliceProvider>
)
```

### useSlice([updateDepFunc]): [state, dispatch]

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
      <h2>Start editing to see some magic happen!</h2>
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
