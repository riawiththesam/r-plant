import { Container, Rectangle, Texture } from "pixi.js";
import { BattleEnemy } from "./battle-enemy";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { type Observable, type Subscription } from "rxjs";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import { EnemyEffect } from "./enemy-effect";
import attack1Effect from "../../../../game-assets/effect/battle/attack_1.png";
import range from "lodash/range";

const fullTextureHeight = 240;
const textureWidth = 240;

export class BattleEnemyLayer extends Container {
  private readonly effectTextureList: Array<Texture>;

  constructor() {
    super();

    const fullTexture = Texture.from(attack1Effect);
    this.effectTextureList = range(0, 5).map((index) => {
      const rect = new Rectangle(textureWidth * index, 0, textureWidth, fullTextureHeight);
      return new Texture(fullTexture.castToBaseTexture(), rect);
    });
  }

  subscribe(battleSceneObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleSceneObservable
        .subscribe((state) => {
          this.removeChildren();

          const phase = state.phaseState;
          const selectedEnemyIndexes = phase.phase === "selectTarget" ? phase.selectedEnemyTargetIndexes : [];

          this.safeAddChildren(
            state.enemyListState.list.map((item, enemyIndex) => {
              return new BattleEnemy(
                item,
                selectedEnemyIndexes.some((i) => i === enemyIndex),
              );
            }),
          );

          this.addChild(new EnemyEffect({ textureList: this.effectTextureList }));
        })
        .addTo(it);
    });
  }
}
