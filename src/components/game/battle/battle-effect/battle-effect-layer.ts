import { Container, Rectangle, Texture } from "pixi.js";
import { type Observable, type Subscription } from "rxjs";
import { type BattleSceneState } from "../../../../scene/battle-scene/battle-scene-subject";
import { letSubscription } from "../../../../util/rxjs/subscription/subscriptions";
import attack1Effect from "../../../../game-assets/effect/battle/attack_1.png";
import range from "lodash/range";
import { EnemyEffect } from "./enemy-effect";

const fullTextureHeight = 240;
const textureWidth = 240;

export class BattleEffectLayer extends Container {
  private readonly effectTextureList: Array<Texture>;
  private readonly enemyEffect: EnemyEffect;

  constructor() {
    super();

    const fullTexture = Texture.from(attack1Effect);
    this.effectTextureList = range(0, 5).map((index) => {
      const rect = new Rectangle(textureWidth * index, 0, textureWidth, fullTextureHeight);
      return new Texture(fullTexture.castToBaseTexture(), rect);
    });
    this.enemyEffect = new EnemyEffect({
      textureList: this.effectTextureList,
    });
    this.addChild(this.enemyEffect);
  }

  subscribe(battleStateObservable: Observable<BattleSceneState>): Subscription {
    return letSubscription((it) => {
      battleStateObservable
        .subscribe((state) => {
          const phase = state.phaseState;
          this.enemyEffect.visible = phase.type === "executeActions";
          if (phase.type !== "executeActions") return;

          const command = phase.allCharacterCommandList[phase.executingIndex];
          if (phase.commandEffectCurrentFrame !== 0 || command == null) return;

          // TODO コマンド実行者actorTypeではなくコマンドの対象等で分岐する
          if (command.actorType === "friend") {
            // TODO 対象の数だけ表示などする
            const targetIndex = command.targetList[0] ?? -1;
            const target = state.enemyListState.list[targetIndex];
            if (target == null) return;
            this.enemyEffect.startAnimation(target.graphics.x, target.graphics.y);
          }
        })
        .addTo(it);
    });
  }
}
