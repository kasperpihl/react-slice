import React from 'react';
import useCounterSlice from './slices/useCounterSlice';

export default function App() {
  const [counter, counterDispatch] = useCounterSlice();

  return (
    <div className="App">
      <h1>{counter.value}</h1>
      <h2>Start editing to see some magic happen!</h2>
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
