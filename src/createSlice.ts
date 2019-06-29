import { useState, useEffect, useCallback } from 'react';
import createSliceStore from './utils/createSliceStore';
import useHasChanges from './utils/useHasChanges';

export default function createSlice<TS, TA>(options: {
  reducer: (state: TS, action: TA) => TS;
  initialState?: TS;
  debugName?: string;
}) {
  if (typeof options !== 'object') {
    throw Error('react-slice: createSlice must include options object');
  }

  const { reducer } = options;
  if (typeof reducer !== 'function') {
    throw Error('react-slice createSlice must include reducer function');
  }
  const store = createSliceStore(options);

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
