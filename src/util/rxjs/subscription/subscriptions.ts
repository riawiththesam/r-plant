import { Subscription } from "rxjs";

/**
 * rxjsのSubscriptionにaddToメソッドを追加
 * observable.subscribe().addTo(subscription)とメソッドチェーンでunsubscribeさせることができる
 */
declare module "rxjs" {
  interface Subscription {
    addTo(subscription?: Subscription): void;
  }
}

Object.defineProperty(Subscription.prototype, "addTo", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function (this: Subscription, subscription?: Subscription) {
    subscription?.add(this);
  },
});
