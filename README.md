# React Slice
A simple approach to global state
- Key is only
- You register reducers on a unique key
- 

## Installation
```
npm i react-slice
```

## Getting started

We need to do 2 things
- Register our reducers (registerSlice)
- Provide the store in react (SliceProvider)

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
Now we have a reducer registered for state.footer :)

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

**SliceProvider props**

| Prop name | type | Default value | Description |
| --- | --- | --- | --- |
| debug | bool | false | Enable the debug logger to see what's going on 🚀 |


## Access/update the global state

We access our state tree using a hook (useSlice) or hoc (withSlice)

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


### withSlice(propKey, stateKey, [updateDepFunc]): Component

**Params**
- propKey `string` - Name of the prop to inject this state into.
- stateKey `string` - A unique key on where to store/access it from the state tree.
- updateDepFunc `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```
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
