import React from 'react';

import SliceContext from './utils/SliceContext';

export default function SliceProvider({ children, store }) {
  return (
    <SliceContext.Provider value={store}>{children}</SliceContext.Provider>
  );
}
