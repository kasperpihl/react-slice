// Task for persistor
export default function createPersistor(persist) {
  if (persist && typeof persist !== 'object') {
    throw Error('react-slice persist must be an object');
  }
  const storage = persist && persist.storage;
  return {
    save: (slice, state) => {
      if (!storage) return;
      state = JSON.stringify(state);
      storage.setItem(`reactSlice-${slice.stateKey}`, state);
    },
    load: slice => {
      if (!storage) return;
      let state = storage.getItem(`reactSlice-${slice.stateKey}`);
      state = JSON.parse(state);
      return state;
    }
  };
}
