import { Container, type DisplayObject } from "pixi.js";

/**
 * Container.safeAddChildrenの追加
 * Container.addChildメソッドはスプレッド構文を利用することで複数のchildを追加することができるが、
 * 配列の中身が0個の場合にエラーが発生する落とし穴があるため、こちらを利用する
 */
declare module "pixi.js" {
  interface Container {
    safeAddChildren: <T extends DisplayObject = DisplayObject>(children: T[]) => T | undefined;
  }
}

Object.defineProperty(Container.prototype, "safeAddChildren", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function <T extends DisplayObject>(this: Container, children: T[]): T | undefined {
    if (children.length > 0) {
      return this.addChild(...children);
    }
    return undefined;
  },
});
