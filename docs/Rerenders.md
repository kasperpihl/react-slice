# Avoid re-renders

Just pass a function that returns an array with values to compare.

```js
// useTasksSlice.js
import { createSlice } from 'react-slice';

export default createSlice({
  name: 'tasks',
  reducer: (state, action) => {
    return {
      ...state,
      [action.id]: action.payload
    };
  }
  initialState: {
    'id-1': {
      title: 'I am first'
    },
    'id-2': {
      title: 'I am second'
    }
  }
})
```

```js
import useTasksSlice from './useTasksSlice.js';

function App() {
  // This only re-renders when task with id-1 updates! 🔥
  const [tasks, tasksDispatch] = useTasksSlice(state => [state['id-1']]);
  // Render your stuff!
}
```
