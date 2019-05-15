import React from 'react';
import { useSlice } from 'react-slice';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (propName, stateKey, updateDepFunc) => WrappedComponent => {
  function withSlice(props) {
    const stateArray = useSlice(stateKey, updateDepFunc);
    const injectProps = {};
    injectProps[propName] = stateArray;
    return <WrappedComponent {...props} {...injectProps} />;
  }
  if (typeof hoistNonReactStatics !== 'undefined') {
    hoistNonReactStatics(withSlice, WrappedComponent);
  }
  return withSlice;
};
