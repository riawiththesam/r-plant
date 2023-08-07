import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { Scene } from "../../util/pixi/scene/scene";

export class DungeonScene extends Scene {
  constructor() {
    super();
    const { currentMapObservable, loadMap, playerPositionObservable } = useDungeonMapUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);
    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });
    playerPositionObservable.subscribe((state) => {
      dungeonMap.setPlayerState(state);
    });

    loadMap();
  }

  override onUpdate(_delta: number): void {
    const { getKeyBoard } = useGameUseCase();
    const { updatePlayer } = useDungeonMapUseCase();

    updatePlayer(getKeyBoard());
  }
}
