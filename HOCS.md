# Using HOCs
the withSlice hoc does not use hoist-non-react-statics. If you need this, you can create your own withSlice really easily like this.
```js
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