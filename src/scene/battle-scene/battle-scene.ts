import { Scene } from "../../util/pixi/scene/scene";
import { BattleSceneViewModel } from "./battle-scene-view-model";
import { BattleOperationLayer } from "../../components/game/battle/battle-operation/battle-operation-layer";
import { BattleFriendLayer } from "../../components/game/battle/battle-friend/battle-friend-layer";
import { BattleEnemyLayer } from "../../components/game/battle/battle-enemy/battle-enemy-layer";
import { BattleBackgroundLayer } from "../../components/game/battle/battle-background/battle-background-layer";
import { type GameRootViewModel } from "../../components/game-root/game-root-view-model";
import { BattleEffectLayer } from "../../components/game/battle/battle-effect/battle-effect-layer";
import { BattleLogLayer } from "../../components/game/battle/battle-operation/battle-log-layer";

export class BattleScene extends Scene {
  constructor(private readonly gameRootViewModel: GameRootViewModel) {
    super();
  }

  override onCreate(): void {
    const viewModel = new BattleSceneViewModel(this.gameRootViewModel);

    this.addChild(new BattleBackgroundLayer());

    const friendLayer = new BattleFriendLayer();
    friendLayer.subscribe(viewModel.battleSceneObservable).addTo(this.unsubscribeOnDestroy);
    this.addChild(friendLayer);

    const enemyLayer = new BattleEnemyLayer();
    enemyLayer.subscribe(viewModel.battleSceneObservable).addTo(this.unsubscribeOnDestroy);
    this.addChild(enemyLayer);

    const effectLayer = new BattleEffectLayer();
    effectLayer.subscribe(viewModel.battleSceneObservable).addTo(this.unsubscribeOnDestroy);
    this.addChild(effectLayer);

    const battleLogLayer = new BattleLogLayer();
    battleLogLayer.subscribe(viewModel.battleSceneObservable).add(this.unsubscribeOnDestroy);
    this.addChild(battleLogLayer);

    const battleOperationLayer = new BattleOperationLayer();
    battleOperationLayer.subscribe(viewModel).addTo(this.unsubscribeOnDestroy);
    this.addChild(battleOperationLayer);

    viewModel.subscribeUpdate(this.updateEvent).addTo(this.unsubscribeOnDestroy);

    viewModel.load();
  }
}
