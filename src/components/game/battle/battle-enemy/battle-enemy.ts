import { Container, Sprite } from "pixi.js";
import { type EnemyCharacterState } from "../../../../scene/battle-scene/battle-scene-view-model";

export class BattleEnemy extends Container {
  constructor(enemy: EnemyCharacterState) {
    super();

    const enemySprite = Sprite.from(enemy.graphics.image);
    enemySprite.x = enemy.graphics.x;
    enemySprite.y = enemy.graphics.y;
    enemySprite.width = enemy.graphics.width;
    enemySprite.height = enemy.graphics.height;
    this.addChild(enemySprite);
  }
}
