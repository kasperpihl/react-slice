import createStore from './utils/createStore';
import { ISliceOptions } from './types';
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
  options: ISliceOptions<TState, TActions>
) {
  if (typeof options !== 'object') {
    throw Error(
      'react-slice: createSlice takes options object as first parameter'
    );
  }

  if (typeof options.reducer !== 'function') {
    throw Error('react-slice createSlice must include reducer function');
  }

  // Make sure we get a nice name (StateAlpha, StateBravo, StateCharlie 😂)
  if (typeof options.debugName !== 'string') {
    options.debugName = assignRadioName();
  }

  return createStore<TState, TActions>(options);
}
