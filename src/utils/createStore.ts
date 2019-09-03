import debugLogger from './debugLogger';
import { TOptions } from '../types';

type TSubscriptionObject<TState> = {
  [id: string]: (state: TState) => void;
};

export default function createStore<TState, TAction>(
  options: TOptions<TState, TAction>
): {
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
} {
  let state: TState = options.initialState;

  const subscribers: TSubscriptionObject<TState> = {};
  const notify = (state: TState) => {
    Object.values(subscribers).forEach(callback => {
      callback(state);
    });
  };
  let hasTimer = false;
  const scheduleUpdate = () => {
    if (hasTimer) {
      return;
    }
    hasTimer = true;
    setTimeout(() => {
      hasTimer = false;
      notify(state);
    }, 0);
  };

  return {
    subscribe: callback => {
      const id = Math.random()
        .toString(36)
        .substring(7);

      subscribers[id] = callback;

      return () => {
        delete subscribers[id];
      };
    },
    getState: (): TState => state,
    dispatch: (action: TAction) => {
      const prevState = state;
      state = options.reducer(state, action);
      debugLogger(options.debugName, action, prevState, state);
      scheduleUpdate();
    }
  };
}
