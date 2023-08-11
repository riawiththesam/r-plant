import { Scene } from "../../util/pixi/scene/scene";
import { BattleSceneViewModel } from "./battle-scene-view-model";
import { BattleOperationLayer } from "../../components/game/battle/battle-operation/battle-operation-layer";
import { BattleFriendLayer } from "../../components/game/battle/battle-friend/battle-friend-layer";
import { BattleEnemyLayer } from "../../components/game/battle/battle-enemy/battle-enemy-layer";
import { BattleBackgroundLayer } from "../../components/game/battle/battle-background/battle-background-layer";
import { type GameRootViewModel } from "../../components/game-root/game-root-view-model";

export class BattleScene extends Scene {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {
    super();
  }

  override onCreate(): void {
    const viewModel = new BattleSceneViewModel(this.gameRootViewModel);

    this.addChild(new BattleBackgroundLayer());

    const friendLayer = new BattleFriendLayer();
    this.addChild(friendLayer);
    viewModel.friendListObservable.subscribe((state) => friendLayer.update(state)).addTo(this.unsubscribeOnDestroy);

    const enemyLayer = new BattleEnemyLayer();
    this.addChild(enemyLayer);
    viewModel.enemyListObservable.subscribe((state) => enemyLayer.update(state)).addTo(this.unsubscribeOnDestroy);

    const battleOperationLayer = new BattleOperationLayer();
    battleOperationLayer.subscribe(viewModel.friendListObservable).addTo(this.unsubscribeOnDestroy);
    this.addChild(battleOperationLayer);

    viewModel.subscribeUpdate(this.updateEvent).addTo(this.unsubscribeOnDestroy);

    viewModel.load();
  }
}
