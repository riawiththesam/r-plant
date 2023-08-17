import { Container, Sprite } from "pixi.js";
import { type FriendCharacterState } from "../../../../scene/battle-scene/types/battle-character-state/friend-list-state";
import { HitPointBar } from "./hit-point-bar";
import { calcDamageMotion } from "../common/common";

const damageMotionMax = 30;
const damageMotionDuration = 20;

export type BattleFriendProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  friend: FriendCharacterState;
  damageMotionFrame: number;
};

export class BattleFriend extends Container {
  constructor(props: BattleFriendProps) {
    super();
    const { x, y, width, height, friend, damageMotionFrame } = props;

    const damageMotion = calcDamageMotion(damageMotionFrame, damageMotionDuration, damageMotionMax);

    const sprite = Sprite.from(friend.graphics.image);
    sprite.x = x - width / 2 + damageMotion.x;
    sprite.y = y - height / 2 + damageMotion.y;
    sprite.width = width;
    sprite.height = height;
    this.addChild(sprite);

    const barY = y + height / 2 - 12;
    const hpBar = new HitPointBar({
      x: x - width / 2,
      y: barY,
      width,
      max: friend.parsonal.maxHitPoint,
      current: friend.parsonal.currentHitPoint,
    });
    this.addChild(hpBar);
  }
}
