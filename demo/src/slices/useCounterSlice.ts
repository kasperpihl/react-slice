import { createSliceHook } from 'react-slice';

type CounterState = number;

type IncrementAction = 'increment';

type DecrementAction = 'decrement';

export default createSliceHook({
  name: 'counter',
  reducer: (state: CounterState, action: IncrementAction | DecrementAction) => {
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
