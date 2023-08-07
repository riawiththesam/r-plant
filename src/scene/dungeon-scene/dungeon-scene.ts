import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { useDungeonMapUseCase } from "../../use-case/dungeon-map-use-case/dungeon-map-use-case";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";
import { Scene } from "../../util/pixi/scene/scene";

export class DungeonScene extends Scene {
  constructor() {
    super();
    const { currentMapObservable, loadMap, playerStateObservable, updatePlayer } = useDungeonMapUseCase();
    const { getKeyBoard } = useGameUseCase();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);
    currentMapObservable.subscribe((state) => {
      dungeonMap.setMap(state);
    });
    playerStateObservable.subscribe((state) => {
      dungeonMap.setPlayerState(state.position);
    });

    this.updateEvent.subscribe((_) => {
      updatePlayer(getKeyBoard());
    });

    loadMap();
  }
}
