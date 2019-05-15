export const initialStates = {};
export const reducers = {};

export default function registerSlice(options) {
  if (typeof options !== 'object') {
    throw Error(
      'react-slice: registerSlice must include options object as first param'
    );
  }

  const { stateKey, reducer, initialState } = options;
  if (typeof reducer !== 'function') {
    throw Error('react-slice registerSlice must set a reducer option');
  }
  if (typeof reducers[stateKey] === 'function') {
    throw Error('Reducer already registered for stateKey: ', stateKey);
  }

  initialStates[stateKey] = initialState;
  reducers[stateKey] = reducer;
}
