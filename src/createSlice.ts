import { useState, useEffect } from 'react';
import createStore from './utils/createStore';
import useHasChanges from './utils/useHasChanges';
import { TOptions } from './types';
import { assignRadioName } from './utils/assignRadioName';

/**
 * createSlice(options)
 * @example
 * createSlice({

 *   reducer: (state, action) => {
 *     if(action === 'increment') return state + 1;
 *     if(action === 'decrement') return state - 1;
 *     return state;
 *   },
 *   initialState: 0, // optional
 *   debugName: 'Counter' // optional
 * })
 */
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
    /**
     * A HOOK to get the state and re-render when updated.
     * @example
     * function Comp() {
     *   // Will re-render on any state change
     *   const state = slice.use();
     *   // Will re-render when counter change
     *   const counter = slice.use(state => [ state.counter ]);
     *
     *   return <div>{counter}</div>
     * }
     */
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
