import { Container, Sprite } from "pixi.js";
import { type FriendCharacterState } from "../../../../scene/battle-scene/battle-scene-view-model";

export type BattleFriendProps = {
  x: number;
  y: number;
  widht: number;
  height: number;
  state?: FriendCharacterState;
};

export class BattleFriend extends Container {
  constructor(props: BattleFriendProps) {
    super();

    if (props.state != null) {
      const sprite = Sprite.from(props.state.graphics.image);
      sprite.x = props.x;
      sprite.y = props.y;
      sprite.width = props.widht;
      sprite.height = props.height;
      this.addChild(sprite);
    }
  }
}
