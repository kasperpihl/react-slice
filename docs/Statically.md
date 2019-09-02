# Use statically

react-slice returns an object like a redux store (getState, dispatch and subscribe).
Therefore you can just use it similar to a redux store object

```js
// some-util.js
import counterSlice from './counterSlice';

// Get the state.
const counter = counterSlice.getState();

// Fire an action.
counterSlice.dispatch('increment');

// Listen for updates
const unsubscribe = counterSlice.subscribe(newCounter => {
  console.log('state updated', newCounter);
});
```
