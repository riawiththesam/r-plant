import { DungeonMap } from "../../components/game/dungeon/dungeon-map/dungeon-map";
import { Scene } from "../../util/pixi/scene/scene";
import { DungeonSceneViewModel } from "./dungeon-scene-view-model";

export class DungeonScene extends Scene {
  override onCreate(): void {
    const viewModel = new DungeonSceneViewModel();

    const dungeonMap = new DungeonMap({
      x: 50,
      y: 50,
    });
    this.addChild(dungeonMap);

    viewModel.currentMapObservable
      .subscribe((state) => {
        dungeonMap.setMap(state);
      })
      .addTo(this.unsubscribeOnDestroy);

    viewModel.playerStateObservable
      .subscribe((state) => {
        dungeonMap.setPlayerState(state);
      })
      .addTo(this.unsubscribeOnDestroy);

    this.updateEvent
      .subscribe((event) => {
        viewModel.updatePlayer(event.delta);
      })
      .addTo(this.unsubscribeOnDestroy);

    viewModel.loadMap();
  }
}
