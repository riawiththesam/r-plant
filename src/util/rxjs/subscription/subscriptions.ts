import { Subscription } from "rxjs";

export function letSubscription(func: (subscription: Subscription) => void): Subscription {
  const subscription = new Subscription();
  func(subscription);
  return subscription;
}
