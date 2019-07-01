import { useState, useEffect, useCallback } from 'react';
import createStore from './utils/createStore';
import useHasChanges from './utils/useHasChanges';

export default function createSliceHook<TS, TA>(options: {
  name: string;
  reducer: (state: TS, action: TA) => TS;
  initialState?: TS;
}) {
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
  const store = createStore(options);

  function useSlice(
    uniqueFn?: (state: TS) => any[]
  ): [TS, (action: TA) => void] {
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
  }
  return useSlice;
}
