import React from 'react';
import useCounterSlice from './slices/useCounterSlice';
import { withSlice } from 'react-slice';

export default withSlice('counterSlice', useCounterSlice)(App);

function App({ counterSlice }) {
  const [counter, counterDispatch] = useCounterSlice();
  console.log('rendering', counterSlice);

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
