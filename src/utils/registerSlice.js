export const initialSlices = {};
export const reducers = {};

export default function registerSlice(key, reducer, initialSlice) {
  if (typeof reducers[key] === 'function') {
    throw Error('Reducer already registered with key: ', key);
  }

  initialSlices[key] = initialSlice;
  reducers[key] = reducer;
}
