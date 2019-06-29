import React, { useMemo } from 'react';
import createSliceStore from './utils/createSliceStore';
import SliceContext from './utils/SliceContext';

export default function SliceProvider({ children }) {
  const store = useMemo(() => createSliceStore(), []);
  return (
    <SliceContext.Provider value={store}>{children}</SliceContext.Provider>
  );
}
