# React Slice
A simple performant approach to global state using only React built'ins.


## Installation
```
npm i react-slice
```

## Basic setup

1. [Register our reducers (registerSlice)](#registerslicestatekey-reducer-initialstate)
2. [Create and Provide the store (createSliceStore + SliceProvider)]()
3. [Access/update global state (useSlice)](#useslicestatekey-updatedepfunc-state-dispatch)
4. [Access/update using HOC (withSlice)](#withslicepropkey-statekey-updatedepfunc-component)

## Advanced
5. 

### registerSlice(options)
Register a reducer and initial data for a unique key in the state tree.

options object **Params**
- stateKey `string` - A unique key on where to store/access it from the state tree.
- reducer `function(state, type, payload)` - A reducer on how to update state tree, given action arguments
- initialState `object` - the initial state object.

```js
import { registerSlice } from 'react-slice'

registerSlice({
  stateKey: 'counter',
  reducer: (state, type, payload) => {
    switch(type) {
      case 'increment':
        return {
          ...state,
          number: state.number + 1
        }
      case 'decrement':
        return {
          ...state,
          number: state.number - 1
        }
      default:
        return state;
    }
  },
  initialState: {
    number: 0
  }
});
```

### SliceProvider
Create a store and add the provider in your code similar to Redux.
Probably index.js or App.js:
```js
import { SliceProvider, createSliceStore } from 'react-slice';
const sliceStore = createSliceStore({
  debug: true,
  persist: {
    storage: localStorage
  }
});

render(
  <SliceProvider store={sliceStore}>
    <App>
  </SliceProvider>
)
```

| Prop name | type | Default value | Description |
| --- | --- | --- | --- |
| debug | bool | false | Enable the debug logger to see what's going on 🚀 |
| persist | object | null | Persist the global states 🚀 |
| persist.storage | Storage | **required** | Storage api to use (localStorage, asyncStorage etc.) |


### useSlice(stateKey, [updateDepFunc]): [state, dispatch]

**Params**
- stateKey `string` - A unique key on where to store/access it from the state tree.
- updateDepFunc `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```js
import { useSlice } from 'react-slice';

function CompTest() {
  // Receive full footerState
  const [footerState, footerDispatch] = useSlice('footer');
  
  // Receive full headerState
  const [headerState, headerDispatch] = useSlice('header', state => [state.position]);
  // Above will only re-render whenever state.position changes.

  const callback = () => {
    // Update footer with an action.
    footerDispatch('updatePosition', 'right');
  }

  return <div onClick={callback}>{footerState.position}</div>;
}
```

### withSlice(propKey, stateKey, [updateDepFunc]): Component

**Params**
- propKey `string` - Name of the prop to inject this state into.
- stateKey `string` - A unique key on where to store/access it from the state tree.
- updateDepFunc (optional) `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```js
import { withSlice } from 'react-slice';

class CompTest extends React.Component {
  render() {
    const [footerState, footerDispatch] = this.props.myChosenProp;
    
    const callback = () => {
      // Update footer with an action.
      footerDispatch('updatePosition', 'right');
    }
    return <div onClick={callback}>{footerState.position}</div>;
  }
}

export default withSlice('myChosenProp', 'footer')(CompTest);
```