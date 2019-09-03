import createStore from './utils/createStore';
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

  if (typeof options.reducer !== 'function') {
    throw Error('react-slice createSliceHook must include reducer function');
  }

  if (typeof options.debugName !== 'string') {
    options.debugName = assignRadioName();
  }

  return createStore<TState, TActions>(options);
}
