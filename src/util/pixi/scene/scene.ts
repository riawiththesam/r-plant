import { Container } from "pixi.js";

export abstract class Scene extends Container {
  onUpdate(_delta: number) {}
}
