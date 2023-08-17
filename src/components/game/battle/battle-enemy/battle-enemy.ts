import { Color, Container, Graphics, Point, Sprite } from "pixi.js";
import { type EnemyCharacterState } from "../../../../scene/battle-scene/types/battle-character-state/enemy-list-state";

const damageMotionMax = 30;
const damageMotionDuration = 20;

export class BattleEnemy extends Container {
  constructor(enemy: EnemyCharacterState, selected: boolean, damageMotionFrame: number) {
    super();

    const damageMotion = calcDamageMotion(damageMotionFrame);
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

/**
 * 被ダメージ時のモーション座標の計算
 * @param frame
 * @returns
 */
function calcDamageMotion(frame: number): Point {
  // xはsinカーブ4周 yはsinカーブ3周
  const progress = Math.min(frame / damageMotionDuration, 1);
  const angleProgressX = progress * 2 * Math.PI * 4;
  const angleProgressY = progress * 2 * Math.PI * 3;
  const angleRateX = Math.sin(angleProgressX);
  const angleRateY = Math.sin(angleProgressY);
  // 振れ幅 初期値1、最終0
  const valueRate = 1 - progress;
  return new Point(damageMotionMax * valueRate * angleRateX, damageMotionMax * valueRate * angleRateY);
}
