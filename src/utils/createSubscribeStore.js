export default function createSubscriberStore() {
  const subscribers = {};
  function subscribe(key, callback) {
    if (!subscribers[key]) {
      subscribers[key] = {};
    }

    // Generate unique
    const id = Math.random()
      .toString(36)
      .substring(7);

    subscribers[key][id] = callback;

    return () => {
      delete subscribers[key][id];
    };
  }
  function getSubscribers(key) {
    return subscribers[key] || {};
  }
  return {
    subscribe,
    getSubscribers
  };
}
