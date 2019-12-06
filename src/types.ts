export interface ISliceOptions<TState = any, TAction = any> {
  /** A reducer, given a state and action to produce the "Next state" */
  reducer: (state: TState, action: TAction) => TState;
  /** Initial state, can be anything, commonly an {} */
  initialState?: TState;
  /** A string to show in the console log when debugging */
  debugName?: string;
}

export interface ISliceStore<TState = any, TAction = any> {
  /**
   * slice.subscribe(callback)
   * @example
   * let oldCounter;
   * slice.subscribe((newState) => {
   *   // This gets called when state updates.
   *   if(newState.counter !== oldCounter) {
   *     console.log('Counter got updated!');
   *   }
   *   oldCounter = newState.counter;
   * })
   */
  subscribe: (callback: (state: TState) => void) => () => void;
  /**
   * Gets the current state, check .use() for React hook!
   * @example
   * // Gets the current state.
   * const state = slice.getState();
   */
  getState: () => TState;
  /**
   * Dispatch an action to update state.
   * @example
   * slice.dispatch({
   *   type: 'updatenumber',
   *   payload: 9
   * })
   */
  dispatch: (action: TAction) => void;
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
  use: (uniqueFn?: (state: TState) => any[]) => TState;
}
