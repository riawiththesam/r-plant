import { Container, Sprite } from "pixi.js";
import { type FriendCharacterState } from "../../../../scene/battle-scene/types/friend-list-state";
import { HitPointBar } from "./hit-point-bar";

export type BattleFriendProps = {
  x: number;
  y: number;
  widht: number;
  height: number;
  friend: FriendCharacterState;
};

export class BattleFriend extends Container {
  constructor(props: BattleFriendProps) {
    super();

    const sprite = Sprite.from(props.friend.graphics.image);
    sprite.x = props.x;
    sprite.y = props.y;
    sprite.width = props.widht;
    sprite.height = props.height;
    this.addChild(sprite);

    const barY = props.y + props.height - 12;
    const hpBar = new HitPointBar({
      x: props.x,
      y: barY,
      width: props.widht,
      max: props.friend.parsonal.maxHitPoint,
      current: props.friend.parsonal.currentHitPoint,
    });
    this.addChild(hpBar);
  }
}
