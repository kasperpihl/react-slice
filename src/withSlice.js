import React from 'react';
import useSlice from './useSlice';

export default (propName, stateKey, updateDepFunc) => WrappedComponent => {
  function withSlice(props) {
    const stateArray = useSlice(stateKey, updateDepFunc);
    const injectProps = {};
    injectProps[propName] = stateArray;
    return <WrappedComponent {...props} {...injectProps} />;
  }

  return withSlice;
};
