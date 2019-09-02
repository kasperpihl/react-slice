# Typescript example 💙

react-slice is made for

Create a file and export your hook w/ reducer (fx counterSlice.ts)

```js
// counterSlice.ts
import { createSlice } from 'react-slice';

type CounterState = number;

type IncrementAction = 'increment';
type DecrementAction = 'decrement';

export default createSlice({
  reducer: (state: CounterState, action: IncrementAction | DecrementAction) => {
    switch (action) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  },
  initialState: 0,
  debugName: 'Counter'
});
```

Now when use it, state and dispatch are **strongly typed** 💪

```js
// App.tsx
import React from 'react';
import counterSlice from './slices/counterSlice';

export default function App() {
  counter = counterSlice.use(counter => [counter]);
  // 👆 This is strongly typed 💪
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button
        onClick={() => {
          counterSlice.dispatch('increment');
          // 👆 And this is strongly typed 💪
        }}
      >
        Increment
      </button>
    </div>
  );
}
```
