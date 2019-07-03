import { useState, useEffect, useCallback } from 'react';
import createStore from './utils/createStore';
import useHasChanges from './utils/useHasChanges';
import { TOptions } from './types';

export default function createSliceHook<TS, TA>(options: TOptions<TS, TA>) {
  if (typeof options !== 'object') {
    throw Error('react-slice: createSliceHook must include options object');
  }

  const { reducer, name } = options;
  if (typeof name !== 'string' || !name) {
    throw Error('react-slice createSliceHook must include name');
  }

  if (typeof reducer !== 'function') {
    throw Error('react-slice createSliceHook must include reducer function');
  }
  const store = createStore<TS, TA>(options);

  const useSlice: {
    (uniqueFn?: (state: TS) => any[]): [TS, (action: TA) => void];
    store: typeof store;
  } = (uniqueFn?) => {
    const [updateBust, setUpdateBust] = useState(new Date());
    const state: TS = store.getState();

    const hasChanges = useHasChanges(state, uniqueFn);
    const dispatch = useCallback((action: TA) => store.dispatch(action), [
      store
    ]);

    useEffect(() => {
      return store.subscribe(newState => {
        if (hasChanges(newState)) {
          setUpdateBust(new Date());
        }
      });
    }, [store, hasChanges]);

    return [state, dispatch];
  };
  useSlice.store = store;

  return useSlice;
}
