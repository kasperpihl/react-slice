import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

function Root() {
  return (
    <>
      <App />
      <App />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
