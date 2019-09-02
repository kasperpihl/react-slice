import { useRef, useCallback, useEffect } from 'react';

export default function useHasChanges<TState>(
  slice: TState,
  updateDepFunc: (state: TState) => any[]
) {
  const lastDeps = useRef([]);
  const hasChanges = useCallback(
    s => {
      if (typeof updateDepFunc !== 'function') {
        return true;
      }

      const deps = updateDepFunc(s);
      if (!Array.isArray(deps)) {
        throw Error(
          'react-slice: update dependency function returned a non-array'
        );
      }
      let isDifferent = deps.length !== lastDeps.current.length;
      !isDifferent &&
        deps.forEach((a, i) => {
          if (a !== lastDeps.current[i]) {
            isDifferent = true;
          }
        });
      lastDeps.current = deps;
      return isDifferent;
    },
    [updateDepFunc]
  );

  useEffect(() => {
    hasChanges(slice);
  }, [hasChanges]);

  return hasChanges;
}
