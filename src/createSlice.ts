import { useContext, useState, useEffect } from 'react';
import SliceContext from './utils/SliceContext';
import createSliceStore from './utils/createSliceStore';
import useHasChanges from './utils/useHasChanges';

export default function createSlice<TS, TA>(options: {
  name: string;
  reducer: (state: TS, action: TA) => TS;
  initialState?: TS;
  debug?: boolean;
}) {
  if (typeof options !== 'object') {
    throw Error('react-slice: createSlice must include options object');
  }

  const { name, reducer, initialState } = options;
  if (typeof name !== 'string') {
    throw Error('react-slice createSlice must include name');
  }
  if (typeof initialState !== 'object') {
    throw Error('react-slice createSlice must include initialState object');
  }
  if (typeof reducer !== 'function') {
    throw Error('react-slice createSlice must include reducer function');
  }

  const obj = {
    name: options.name,
    originalName: options.name,
    store: createSliceStore(),
    initialized: false
  };
  function initialize(store: typeof obj.store) {
    if (obj.initialized) return;
    obj.initialized = true;
    if (store) {
      obj.store = store;
    }
    obj.store.register(obj.name, options);
  }
  function useSlice(uniqueFn?: () => any[]): TS {
    const store = useContext(SliceContext);
    initialize(store);

    const [updateBust, setUpdateBust] = useState(new Date());
    const slice: TS = obj.store.getState(obj.name);

    if (typeof slice === 'undefined') {
      throw Error(
        `Trying to access uninitialized part of slice tree: ${obj.name}`
      );
    }

    const hasChanges = useHasChanges(slice, uniqueFn);

    useEffect(() => {
      return obj.store.subscribe(obj.name, newSlice => {
        if (hasChanges(newSlice)) {
          setUpdateBust(new Date());
        }
      });
    }, [obj, hasChanges]);

    return slice;
  }
  useSlice.rename = (newName: string) => (obj.name = newName);
  useSlice.seed = (state: TS) => null;
  useSlice.dispatch = (action: TA) => obj.store.dispatch(obj.name, action);
  return useSlice;
}
