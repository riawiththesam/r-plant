import { Container } from "pixi.js";
import { CharacterName } from "./character-name";

export class CharacterLayer extends Container {
  update() {
    this.addChild(new CharacterName());
  }
}
