import * as PIXI from "pixi.js";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";

export class DungeonScene extends PIXI.Container {
  constructor() {
    super();
    const { currentMapObservable, setWall } = useDungeonMapUseCase();
    const { getMouse } = useGameUseCase();

    const dungeonMap = new DungeonMap({
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
