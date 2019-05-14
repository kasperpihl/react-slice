# Using HOCs
react-slice does not come with an hoc out of the box, because I don't want to depend on the hoist-non-react-statics. However you can create your own really easily
```
// create a withSlice.js somewhere
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useSlice } from 'react-slice';

export default (propName, stateKey, updateDepFunc) => (WrappedComponent) => {
  function withSlice(props) {
    const stateArray = useSlice(stateKey, updateDepFunc)
    const injectProps = {};
    injectProps[propName] = stateArray;
    return <WrappedComponent {...props} {...injectProps} />;
  }

  hoistNonReactStatics(withSlice, WrappedComponent);

  return withSlice;
}
```

And then you can use it like this :)

### withSlice(propKey, stateKey, [updateDepFunc]): Component

**Params**
- propKey `string` - Name of the prop to inject this state into.
- stateKey `string` - A unique key on where to store/access it from the state tree.
- updateDepFunc (optional) `function(state): [...dependencies]` - A function that returns an array of values to trigger re-render

```
import { withSlice } from '../your/path/withSlice';

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