import debugLogger from './debugLogger';
import { TOptions } from '../types';

type TSubscriptionObject<TState> = {
  [id: string]: (state: TState) => void;
};

export default function createStore<TState, TAction>(
  options: TOptions<TState, TAction>
): {
  subscribe: (callback: (state: TState) => void) => () => void;
  getState: () => TState;
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
      debugLogger(options.name, action, prevState, state);
      scheduleUpdate();
    }
  };
}
