import createSubscribeStore from './createSubscribeStore';
import debugLogger from './debugLogger';

export default function createSliceStore() {
  const slices = {};
  const states = {};

  const { subscribe, getSubscribers } = createSubscribeStore();
  const notify = <T>(name: string, state: T) => {
    const subscribers = getSubscribers(name);
    if (subscribers) {
      Object.values(subscribers).forEach(callback => {
        callback(state);
      });
    }
  };

  return {
    subscribe,
    register: (name: string, options) => {
      slices[name] = options;
      if (typeof options.initialState !== 'undefined') {
        states[name] = options.initialState;
      }
    },
    getState: <T>(name: string): T => states[name],
    dispatch: <T>(name: string, action: T) => {
      const slice = slices[name];
      if (typeof slice === 'undefined') {
        throw Error(`react-slice uninitialized part of state tree: ${name}`);
      }

      const prevState = states[name];
      const newState = slice.reducer(states[name], action);
      if (slice.debug) {
        debugLogger(name, action, prevState, newState);
      }
      states[name] = newState;
      notify(name, newState);
    }
  };
}
