import { registerSlice } from 'react-slice';

export default registerSlice({
  stateKey: 'counter',
  reducer: (state, type) => {
    switch (type) {
      case 'increment':
        return { counter: state.counter + 1 };
      case 'decrement':
        return { counter: state.counter - 1 };
      default:
        console.warn('unknown type', type);
        return state;
    }
  },
  initialState: {
    counter: 0
  }
});
