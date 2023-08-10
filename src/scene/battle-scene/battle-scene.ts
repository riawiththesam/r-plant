import { Container, Sprite } from "pixi.js";
import { Scene } from "../../util/pixi/scene/scene";
import { gameConfig } from "../../common/game-config";
import bgGrass from "../../game-assets/background/bg-grass.png";
import { BattleSceneViewModel } from "./battle-scene-view-model";
import { BattleEnemy } from "../../components/game/battle/battle-enemy/battle-enemy";
import { BattleOperationContainer } from "../../components/game/battle/battle-operation/battle-operation-container";
import { BattleFriendLayer } from "../../components/game/battle/battle-friend/battle-friend-layer";

export class BattleScene extends Scene {
  override onCreate(): void {
    const viewModel = new BattleSceneViewModel();

    const background = Sprite.from(bgGrass, {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.addChild(background);

    const friendLayer = new BattleFriendLayer();
    this.addChild(friendLayer);
    viewModel.friendListObservable.subscribe((state) => friendLayer.update(state)).addTo(this.unsubscribeOnDestroy);

    const enemyContainer = new Container();
    this.addChild(enemyContainer);
    viewModel.enemyListObservable
      .subscribe((state) => {
        enemyContainer.removeChildren();
        enemyContainer.safeAddChildren(state.list.map((item) => new BattleEnemy(item)));
      })
      .addTo(this.unsubscribeOnDestroy);

    const battleOperationContainer = new BattleOperationContainer();
    this.addChild(battleOperationContainer);

    viewModel.load();
  }
}
