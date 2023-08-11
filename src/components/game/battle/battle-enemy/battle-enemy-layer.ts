import { Container } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type EnemyListState } from "../../../../scene/battle-scene/types/enemy-list-state";

export class BattleEnemyLayer extends Container {
  update(state: EnemyListState): void {
    this.removeChildren();
    this.safeAddChildren(state.list.map((item) => new BattleEnemy(item)));
  }
}
