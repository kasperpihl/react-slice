export type TSubscription = (state: any) => void;
export type TSubscriptionObject = {
  [id: string]: TSubscription;
};

export default function createSubscriberStore() {
  const subscribers: {
    [key: string]: TSubscriptionObject;
  } = {};
  function subscribe(key: string, callback: TSubscription) {
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
  function getSubscribers(key: string): TSubscriptionObject {
    return subscribers[key] || {};
  }
  return {
    subscribe,
    getSubscribers
  };
}
