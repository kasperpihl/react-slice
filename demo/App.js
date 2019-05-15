import React from 'react';
import { useSlice } from 'react-slice';

export default function App() {
  const [counterState, counterDispatch] = useSlice('counter');

  return (
    <div className="App">
      <h1>{counterState.counter}</h1>
      <h2>Start editing to see some magic happen!</h2>
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
