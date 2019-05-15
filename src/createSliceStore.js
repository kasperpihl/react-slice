import { slices } from './registerSlice';
import createSubscribeStore from './utils/createSubscribeStore';
import createPersistor from './utils/createPersistor';
import debugLogger from './utils/debugLogger';

export default function createSliceStore(options = {}) {
  const states = {};

  const persistor = createPersistor(options.persist);

  Object.entries(slices).forEach(([stateKey, slice]) => {
    states[stateKey] = persistor.load(slice) || slices[stateKey].initialState;
  });

  const { subscribe, getSubscribers } = createSubscribeStore();
  const notify = (stateKey, state) => {
    const subscribers = getSubscribers(stateKey);
    if (subscribers) {
      Object.values(subscribers).forEach(callback => {
        callback(state);
      });
    }
  };

  const store = {};

  store.getState = stateKey => states[stateKey];
  store.subscribe = subscribe;
  store.dispatch = (stateKey, type, payload) => {
    const slice = slices[stateKey];
    if (!slice) {
      throw Error('react-slice uninitialized part of state tree: ', stateKey);
    }
    if (typeof type !== 'string') {
      throw Error(
        'react-slice dispatch must include type (string) as first parameter'
      );
    }
    const prevState = states[stateKey];
    const newState = slice.reducer(states[stateKey], type, payload);
    if (typeof newState !== 'object') {
      throw Error('react-slice reducer return a non-object: ', stateKey);
    }
    if (options.debug) {
      debugLogger(stateKey, type, payload, prevState, newState);
    }
    states[stateKey] = newState;
    notify(stateKey, newState);
    persistor.save(slice, newState);
  };
  return store;
}
