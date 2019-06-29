import React from 'react';
import ReactDOM from 'react-dom';
import { SliceProvider } from 'react-slice';

import App from './App';

function Root() {
  return (
    // <SliceProvider>
    <App />
    // </SliceProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
