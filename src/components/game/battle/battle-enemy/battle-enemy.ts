import { Color, Container, Graphics, Sprite } from "pixi.js";
import { type EnemyCharacterState } from "../../../../scene/battle-scene/types/battle-character-state/enemy-list-state";
import { calcDamageMotion } from "../common/common";

const damageMotionMax = 30;
const damageMotionDuration = 20;

export class BattleEnemy extends Container {
  constructor(enemy: EnemyCharacterState, selected: boolean, damageMotionFrame: number) {
    super();

    const damageMotion = calcDamageMotion(damageMotionFrame, damageMotionDuration, damageMotionMax);
    const enemySprite = Sprite.from(enemy.graphics.image);
    enemySprite.x = enemy.graphics.x - enemy.graphics.width / 2 + damageMotion.x;
    enemySprite.y = enemy.graphics.y - enemy.graphics.height / 2 + damageMotion.y;
    enemySprite.width = enemy.graphics.width;
    enemySprite.height = enemy.graphics.height;
    this.addChild(enemySprite);

    const pointer = new Graphics();
    pointer.x = enemy.graphics.x;
    pointer.y = enemy.graphics.y - enemy.graphics.height / 2;
    pointer.beginFill(new Color({ r: 0, g: 0, b: 255 }));
    pointer.drawPolygon(-10, -10, 10, -10, 0, 10);
    pointer.visible = selected;
    this.addChild(pointer);
  }
}
