import React from 'react';
import ReactDOM from 'react-dom';
import { SliceProvider, createSliceStore } from 'react-slice';
import './slices/counter.slice';
import App from './App';

const sliceStore = createSliceStore({
  debug: true,
  persist: {
    storage: localStorage
  }
});

function Root() {
  return (
    <SliceProvider store={sliceStore}>
      <App />
    </SliceProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
