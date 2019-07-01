import React from 'react';
import useCounterSlice from './slices/useCounterSlice';

export default function App() {
  const [counter, counterDispatch] = useCounterSlice(counter => [counter]);

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
      <button
        onClick={() => {
          counterDispatch('decrement');
        }}
      >
        Decrement
      </button>
    </div>
  );
}
