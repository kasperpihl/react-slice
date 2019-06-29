import React from 'react';
import useCounterSlice from './slices/counter.slice';

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
