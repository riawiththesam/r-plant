import { Container } from "pixi.js";

export function letContainer(func: (it: Container) => void): Container {
  const container = new Container();
  func(container);
  return container;
}
