import { useContext } from 'react';
import SliceContext from './utils/SliceContext';

export default function useSliceStore() {
  return useContext(SliceContext);
}
