// Task for persistor
export default function createPersistor(persist) {
  if (typeof persist !== 'object') {
    throw Error('react-slice: persist must be an object');
  }
  return {
    save: (key, state) => {},
    load: key => {}
  };
}
