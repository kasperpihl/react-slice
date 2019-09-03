import React from 'react';
import counterSlice from './counterSlice';

export default function App() {
  const counter = counterSlice.use();

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button
        onClick={() => {
          counterSlice.dispatch('increment');
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          counterSlice.dispatch('decrement');
        }}
      >
        Decrement
      </button>
    </div>
  );
}
