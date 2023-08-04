import { Container } from "pixi.js";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useEditDungeonMapUseCase } from "../../use-case/edit-dungeon-map-use-case/edit-dungeon-map-use-case";
import { Button } from "../../components/button/button";

export class EditDungeonScene extends Container {
  constructor() {
    super();
    const {
      currentMapObservable,
      setWall,
      getEditWallState,
      setSetWall,
      setSetDoor,
      setRemoveWall,
      exportJSON,
      loadJSON,
    } = useEditDungeonMapUseCase();
    const { getMouse } = useGameUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
      onWallPointerEnter: (xIndex, yIndex, direction) => {
        const editWallType = getEditWallState();
        if (editWallType == "setWall") {
          if (getMouse().mouseDown) {
            setWall(xIndex, yIndex, direction, "wall");
          }
        }
        if (editWallType == "removeWall") {
          if (getMouse().mouseDown) {
            setWall(xIndex, yIndex, direction, "none");
          }
        }
        if (editWallType == "setDoor") {
          if (getMouse().mouseDown) {
            setWall(xIndex, yIndex, direction, "door");
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
      text: "Set Wall",
      onClick: setSetWall,
    });
    this.addChild(buttonSetWallMode);

    const buttonSetDoorMode = new Button({
      x: 500,
      y: 80,
      width: 100,
      height: 20,
      text: "Set Door",
      onClick: setSetDoor,
    });
    this.addChild(buttonSetDoorMode);

    const buttonRemoveWallMode = new Button({
      x: 500,
      y: 110,
      width: 100,
      height: 20,
      text: "Remove Wall",
      onClick: setRemoveWall,
    });
    this.addChild(buttonRemoveWallMode);

    const buttonloadJSON = new Button({
      x: 650,
      y: 50,
      width: 100,
      height: 20,
      text: "Load JSON",
      onClick: loadJSON,
    });
    this.addChild(buttonloadJSON);

    const buttonExportJSON = new Button({
      x: 650,
      y: 80,
      width: 100,
      height: 20,
      text: "Export JSON",
      onClick: exportJSON,
    });
    this.addChild(buttonExportJSON);
  }
}
