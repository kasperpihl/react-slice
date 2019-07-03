# Use statically

react-slice follows a hook-first, static-second approach.
That said, it's very easy to use your slice/state statically.
The hook has a store property that is an isolated redux-like store

```js
// some-util.js
import useCounterSlice from './useCounterSlice';

const counterStore = useCounterSlice.store;
// Get the state.

const counter = counterStore.getState();

// Fire an action.
counterStore.dispatch('increment');

// Listen for updates
const unsubscribe = counterStore.subscribe(newCounter => {
  console.log('state updated', newCounter);
});
```
