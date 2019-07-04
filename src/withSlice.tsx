import React from 'react';

export default function withSlice(name, useSlice, updateFn?) {
  return function(Component: React.ComponentType) {
    function WithSlice(props) {
      const slice = useSlice(updateFn && updateFn.bind(null, props));
      const injected = {
        ...props,
        [name]: slice
      };
      return <Component {...injected} />;
    }
    return WithSlice;
  };
}
