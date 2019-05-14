import { initialSlices, reducers } from './registerSlice';
import createSubscribeStore from './createSubscribeStore';
import debugLogger from './debugLogger';

export default function createSliceStore(options = {}) {
  const slices = {
    ...initialSlices
  };

  const { subscribe, getSubscribers } = createSubscribeStore();
  const notify = (key, slice) => {
    const subscribers = getSubscribers(key);
    if (subscribers) {
      Object.values(subscribers).forEach(callback => {
        callback(slice);
      });
    }
  };

  const store = {};

  store.getSlice = key => slices[key];
  store.subscribe = subscribe;
  store.seed = (key, data, force) => {
    if (typeof reducers[key] !== 'function') {
      throw Error('Uninitialized part of slice tree: ', key);
    }
    if (force || typeof slices[key] === 'undefined') {
      slices[key] = data;
      notify(key, slices[key]);
    }
  };
  store.dispatch = (key, action) => {
    if (typeof reducers[key] !== 'function') {
      throw Error('Uninitialized part of slice tree: ', key);
    }
    const prevState = slices[key];
    slices[key] = reducers[key](slices[key], action);
    if (options.debug) {
      debugLogger(key, action, prevState, slices[key]);
    }
    notify(key, slices[key]);
  };
  return store;
}
