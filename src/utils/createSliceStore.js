import { initialSlices, reducers } from '../registerSlice';
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
  store.seed = (key, data) => {
    if (typeof reducers[key] !== 'function') {
      throw Error('Uninitialized part of slice tree: ', key);
    }
    if (typeof slices[key] === 'undefined') {
      slices[key] = data;
    }
  };

  store.dispatch = (key, type, payload) => {
    if (typeof reducers[key] !== 'function') {
      throw Error('Uninitialized part of slice tree: ', key);
    }
    if (typeof type !== 'string') {
      throw Error('Dispatch must include type (string) as first parameter');
    }
    const prevState = slices[key];
    slices[key] = reducers[key](slices[key], type, payload);
    if (options.debug) {
      debugLogger(key, type, payload, prevState, slices[key]);
    }
    notify(key, slices[key]);
  };
  return store;
}
