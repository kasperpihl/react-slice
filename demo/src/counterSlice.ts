import { createSlice } from 'react-slice';

type CounterState = number;

type IncrementAction = 'increment';

type DecrementAction = 'decrement';

export default createSlice<CounterState, IncrementAction | DecrementAction>({
  reducer: (state, action) => {
    switch (action) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  },
  initialState: 0
});
