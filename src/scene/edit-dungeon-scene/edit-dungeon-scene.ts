import * as PIXI from "pixi.js";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useEditDungeonMapUseCase } from "../../use-case/edit-dungeon-map-use-case/edit-dungeon-map-use-case";
import { Button } from "../../components/button/button";

export class EditDungeonScene extends PIXI.Container {
  constructor() {
    super();
    const { currentMapObservable, setWall, getEditWallState, setSetWall, setRemoveWall, exportJSON } =
      useEditDungeonMapUseCase();
    const { getMouse } = useGameUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
      onWallPointerEnter: (xIndex, yIndex, direction) => {
        if (getEditWallState() == "setWall") {
          if (getMouse().mouseDown) {
            setWall(xIndex, yIndex, direction, "wall");
          }
        }
        if (getEditWallState() == "removeWall") {
          if (getMouse().mouseDown) {
            setWall(xIndex, yIndex, direction, "none");
          }
        }
      },
    });

    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });

    this.addChild(dungeonMap);

    const buttonSetWallMode = new Button({
      x: 500,
      y: 50,
      width: 100,
      height: 20,
      text: "setWall",
      onClick: setSetWall,
    });
    this.addChild(buttonSetWallMode);

    const buttonRemoveWallMode = new Button({
      x: 500,
      y: 80,
      width: 100,
      height: 20,
      text: "removeWall",
      onClick: setRemoveWall,
    });
    this.addChild(buttonRemoveWallMode);

    const buttonExportJSON = new Button({
      x: 650,
      y: 50,
      width: 100,
      height: 20,
      text: "Export JSON",
      onClick: exportJSON,
    });
    this.addChild(buttonExportJSON);
  }
}
