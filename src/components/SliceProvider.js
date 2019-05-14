import React, { useMemo } from 'react';

import SliceContext from '../utils/SliceContext';
import createSliceStore from '../utils/createSliceStore';

export default function SliceProvider({ children, ...options }) {
  const store = useMemo(() => createSliceStore(options), []);

  return (
    <SliceContext.Provider value={store}>{children}</SliceContext.Provider>
  );
}
