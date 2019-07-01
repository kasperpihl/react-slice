import { createSliceHook } from 'react-slice';
import produce from 'immer';

type CounterState = {
  value: number;
};

type IncrementAction = {
  type: 'increment';
};

type DecrementAction = {
  type: 'decrement';
};

type CounterActions = IncrementAction | DecrementAction;

export default createSliceHook({
  debugName: 'Counter',
  reducer: (state: CounterState, action: CounterActions) =>
    produce(state, (draft: CounterState) => {
      switch (action.type) {
        case 'increment':
          draft.value += 1;
          break;
        case 'decrement':
          draft.value -= 1;
          break;
      }
      return draft;
    }),
  initialState: {
    value: 0
  }
});
