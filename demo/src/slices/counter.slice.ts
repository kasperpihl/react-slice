import { createSlice } from 'react-slice';
import produce from 'immer';

type CounterState = {
  counter: number;
};

type IncrementAction = {
  type: 'increment';
};

type DecrementAction = {
  type: 'decrement';
};

type CounterActions = IncrementAction | DecrementAction;

export default createSlice({
  name: 'Counter',
  debug: true,
  reducer: (state: CounterState, action: CounterActions) =>
    produce(state, (draft: CounterState) => {
      switch (action.type) {
        case 'increment':
          draft.counter += 1;
          break;
        case 'decrement':
          draft.counter -= 1;
          break;
      }
      return draft;
    }),
  initialState: {
    counter: 0
  }
});
