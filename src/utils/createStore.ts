import debugLogger from './debugLogger';

type TSubscriptionObject = {
  [id: string]: (state: any) => void;
};

export default function createStore(options) {
  let state = options.initialState;

  const subscribers: TSubscriptionObject = {};
  const subscribe = (callback: (state: any) => void) => {
    const id = Math.random()
      .toString(36)
      .substring(7);

    subscribers[id] = callback;

    return () => {
      delete subscribers[id];
    };
  };
  const notify = <T>(state: T) => {
    Object.values(subscribers).forEach(callback => {
      callback(state);
    });
  };

  return {
    subscribe,
    getState: <T>(): T => state,
    dispatch: <T>(action: T) => {
      const prevState = state;
      state = options.reducer(state, action);
      debugLogger(options.name, action, prevState, state);
      notify(state);
    }
  };
}
