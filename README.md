# React Slice
A simple performant approach to global state using only React built'ins.


## Installation
```
npm i react-slice
```

## Getting started

1. [Register our reducers (registerSlice)](#registerslicestatekey-reducer-initialstate)
2. [Provide the store in react (SliceProvider)](#sliceprovider)
3. [Access/update global state (useSlice)](#useslicestatekey-updatedepfunc-state-dispatch)
3.1. [Access/update using HOC (withSlice)](https://github.com/kasperpihl/react-slice/blob/master/HOCS.md)

### registerSlice(stateKey, reducer, initialState)
Register a reducer and initial data for a unique key in the state tree.

**Params**
- stateKey `string` - A unique key on where to store/access it from the state tree.
- reducer `function(state, type, payload)` - A reducer on how to update state tree, given action arguments
- initialState(optional) `any` - the initial state value.

```
import { registerSlice } from 'react-slice'

registerSlice('footer', (state, type, payload) => {
  switch(type) {
    case 'updatePosition':
      return {
        ...state,
        position: payload
      }
    default:
      return state;
  }
}, {
  position: 'bottom'
});
```

### SliceProvider
Add the provider in your code similar to Redux and others
Probably index or App.js
```
import { SliceProvider } from 'react-slice';

render(
  <SliceProvider debug>
    <App>
  </SliceProvider>
)
```

| Prop name | type | Default value | Description |
| --- | --- | --- | --- |
| debug | bool | false | Enable the debug logger to see what's going on 🚀 |


### useSlice(stateKey, [updateDepFunc]): [state, dispatch]

**Params**
- stateKey `string` - A unique key on where to store/access it from the state tree.
- updateDepFunc `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```
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