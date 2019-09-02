import { useState, useEffect } from 'react';
import createStore from './utils/createStore';
import useHasChanges from './utils/useHasChanges';
import { TOptions } from './types';
import { assignRadioName } from './utils/assignRadioName';

export default function createSlice<TState = any, TActions = any>(
  options: TOptions<TState, TActions>
) {
  if (typeof options !== 'object') {
    throw Error('react-slice: createSliceHook must include options object');
  }

  const { reducer } = options;

  if (typeof reducer !== 'function') {
    throw Error('react-slice createSliceHook must include reducer function');
  }

  if (typeof options.debugName !== 'string') {
    options.debugName = assignRadioName();
  }

  const store = createStore<TState, TActions>(options);

  return {
    use: function useSlice(uniqueFn?: (state: TState) => any[]): TState {
      const [updateBust, setUpdateBust] = useState(new Date());
      const state: TState = store.getState();

      const hasChanges = useHasChanges<TState>(state, uniqueFn);

      useEffect(() => {
        return store.subscribe(newState => {
          if (hasChanges(newState)) {
            setUpdateBust(new Date());
          }
        });
      }, [store, hasChanges]);

      return state;
    },
    ...store
  };
}
