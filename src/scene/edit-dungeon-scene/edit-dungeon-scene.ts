import * as PIXI from "pixi.js";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useEditDungeonMapUseCase } from "../../use-case/edit-dungeon-map-use-case/edit-dungeon-map-use-case";

export class EditDungeonScene extends PIXI.Container {
  constructor() {
    super();
    const { currentMapObservable, setWall } = useEditDungeonMapUseCase();
    const { getMouse } = useGameUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
      onWallPointerEnter: (xIndex, yIndex, direction) => {
        console.log(`${xIndex} ${yIndex} ${direction} ${getMouse().mouseDown}`);
        if (getMouse().mouseDown) {
          setWall(xIndex, yIndex, direction);
        }
      },
    });

    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });

    this.addChild(dungeonMap);
  }
}
