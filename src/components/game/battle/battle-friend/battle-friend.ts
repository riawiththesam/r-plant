import { Container, Sprite } from "pixi.js";
import { type FriendCharacterState } from "../../../../scene/battle-scene/types/battle-character-state/friend-list-state";
import { HitPointBar } from "./hit-point-bar";

export type BattleFriendProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  friend: FriendCharacterState;
};

export class BattleFriend extends Container {
  constructor(props: BattleFriendProps) {
    super();

    const sprite = Sprite.from(props.friend.graphics.image);
    sprite.x = props.x - props.width / 2;
    sprite.y = props.y - props.height / 2;
    sprite.width = props.width;
    sprite.height = props.height;
    this.addChild(sprite);

    const barY = props.y + props.height / 2 - 12;
    const hpBar = new HitPointBar({
      x: props.x - props.width / 2,
      y: barY,
      width: props.width,
      max: props.friend.parsonal.maxHitPoint,
      current: props.friend.parsonal.currentHitPoint,
    });
    this.addChild(hpBar);
  }
}
