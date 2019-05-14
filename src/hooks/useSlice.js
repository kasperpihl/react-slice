import { useState, useEffect, useCallback, useContext } from 'react';
import SliceContext from '../utils/SliceContext';
import useHasChanges from './useHasChanges';

export default function useSlice(key, updateDepFunc) {
  const store = useContext(SliceContext);

  const [updateBust, setUpdateBust] = useState(new Date());
  const slice = store.getSlice(key);

  if (typeof slice === 'undefined') {
    throw Error('Trying to access uninitialized part of slice tree: ', key);
  }

  const dispatch = useCallback(store.dispatch.bind(null, key), [key]);
  const hasChanges = useHasChanges(slice, updateDepFunc);

  useEffect(() => {
    return store.subscribe(key, newSlice => {
      if (hasChanges(newSlice)) {
        setUpdateBust(new Date());
      }
    });
  }, [key, store, hasChanges]);

  return [slice, dispatch];
}
