import * as PIXI from "pixi.js";
import { DungeonBackgroundScene } from "../dungeon-background-scene/dungeon-background-scene";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";

export class DungeonScene extends PIXI.Container {
  constructor() {
    super();

    this.addChild(new DungeonBackgroundScene());

    this.addChild(new DungeonMap());
  }
}
