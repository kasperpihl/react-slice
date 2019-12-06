import { useState, useEffect } from 'react';
import debugLogger from './debugLogger';
import useHasChanges from './useHasChanges';
import { ISliceOptions, ISliceStore } from '../types';

type TSubscriptionObject<TState> = {
  [id: string]: (state: TState) => void;
};

export default function createStore<TState, TAction>(
  options: ISliceOptions<TState, TAction>
): ISliceStore<TState, TAction> {
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

  const tempStore: Omit<ISliceStore<TState, TAction>, 'use'> = {
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

      if (
        typeof process === 'undefined' ||
        process.env.NODE_ENV !== 'production'
      ) {
        debugLogger(options.debugName, action, prevState, state);
      }

      scheduleUpdate();
    }
  };

  const store: ISliceStore<TState, TAction> = {
    ...tempStore,
    use: function useSlice(uniqueFn?: (state: TState) => any[]): TState {
      const [updateBust, setUpdateBust] = useState(new Date());
      const state: TState = tempStore.getState();

      const hasChanges = useHasChanges<TState>(state, uniqueFn);

      useEffect(() => {
        return tempStore.subscribe(newState => {
          if (hasChanges(newState)) {
            setUpdateBust(new Date());
          }
        });
      }, [tempStore, hasChanges]);

      return state;
    }
  };

  return store;
}
