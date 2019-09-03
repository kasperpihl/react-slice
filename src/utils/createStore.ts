import { useState, useEffect } from 'react';
import debugLogger from './debugLogger';
import useHasChanges from './useHasChanges';
import { TOptions, IStore } from '../types';

type TSubscriptionObject<TState> = {
  [id: string]: (state: TState) => void;
};

export default function createStore<TState, TAction>(
  options: TOptions<TState, TAction>
): IStore<TState, TAction> {
  let state: TState = options.initialState;

  const subscribers: TSubscriptionObject<TState> = {};
  const notify = (state: TState) => {
    Object.values(subscribers).forEach(callback => {
      callback(state);
    });
  };
  let hasTimer = false;
  const scheduleUpdate = () => {
    if (hasTimer) {
      return;
    }
    hasTimer = true;
    setTimeout(() => {
      hasTimer = false;
      notify(state);
    }, 0);
  };

  const store: IStore<TState, TAction> = {
    subscribe: callback => {
      const id = Math.random()
        .toString(36)
        .substring(7);

      subscribers[id] = callback;

      return () => {
        delete subscribers[id];
      };
    },
    getState: (): TState => state,
    dispatch: (action: TAction) => {
      const prevState = state;
      state = options.reducer(state, action);
      debugLogger(options.debugName, action, prevState, state);
      scheduleUpdate();
    }
  };
  store.use = function useSlice(uniqueFn?: (state: TState) => any[]): TState {
    const [updateBust, setUpdateBust] = useState(new Date());
    const state: TState = store.getState();

    const hasChanges = useHasChanges<TState>(state, uniqueFn);

    useEffect(() => {
      return store.subscribe(newState => {
        if (hasChanges(newState)) {
          setUpdateBust(new Date());
        }
      });
    }, [store, hasChanges]);

    return state;
  };

  return store;
}
