import { DisplayObject, type Container } from "pixi.js";

declare module "pixi.js" {
  interface DisplayObject {
    addTo: (container: Container) => DisplayObject;
  }
}

Object.defineProperty(DisplayObject.prototype, "addTo", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: function (this: DisplayObject, container: Container): DisplayObject {
    return container.addChild(this);
  },
});
