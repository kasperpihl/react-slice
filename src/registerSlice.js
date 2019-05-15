export const slices = {};

export default function registerSlice(options) {
  if (typeof options !== 'object') {
    throw Error('react-slice: registerSlice must include options object');
  }

  const { stateKey, reducer, initialState } = options;
  if (typeof stateKey !== 'string') {
    throw Error('react-slice registerSlice must include stateKey');
  }
  if (typeof initialState !== 'object') {
    throw Error('react-slice registerSlice must include initialState object');
  }
  if (typeof reducer !== 'function') {
    throw Error('react-slice registerSlice must include reducer function');
  }
  if (slices[stateKey]) {
    throw Error('Slice already registered for stateKey: ', stateKey);
  }

  slices[stateKey] = options;
  return options;
}
