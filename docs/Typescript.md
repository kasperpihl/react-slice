# Typescript example 💙

react-slice is made for

Create a file and export your hook w/ reducer (fx useCounterSlice.ts)

```js
// useCounterSlice.ts
import { createSliceHook } from 'react-slice';

type CounterState = number;

type IncrementAction = 'increment';
type DecrementAction = 'decrement';

export default createSliceHook({
  name: 'counter',
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
  initialState: 0
});
```

Now when you run useCounterSlice, counter and counterDispatch is **strongly typed** 💪

```js
// App.tsx
iimport React from 'react';
import useCounterSlice from './slices/useCounterSlice';

export default function App() {
  const [counter, counterDispatch] = useCounterSlice(counter => [counter]);
  // 👆👆👆 These are strongly typed 💪
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button
        onClick={() => {
          counterDispatch('increment');
        }}
      >
        Increment
      </button>
    </div>
  );
}

```
