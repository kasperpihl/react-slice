import React from 'react';
import useSlice from './useSlice';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (propName, stateKey, updateDepFunc) => WrappedComponent => {
  function withSlice(props) {
    const stateArray = useSlice(stateKey, updateDepFunc);
    const injectProps = {};
    injectProps[propName] = stateArray;
    return <WrappedComponent {...props} {...injectProps} />;
  }
  if (typeof hoistNonReactStatics !== 'undefined') {
    console.log('hoisted!');
    hoistNonReactStatics(withSlice, WrappedComponent);
  }
  return withSlice;
};
