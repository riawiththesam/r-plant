import { Container, Sprite } from "pixi.js";

export type BattleFriendProps = {
  x: number;
  y: number;
  widht: number;
  height: number;
  image: string;
};

export class BattleFriend extends Container {
  constructor(props: BattleFriendProps) {
    super();

    const sprite = Sprite.from(props.image);
    sprite.x = props.x;
    sprite.y = props.y;
    sprite.width = props.widht;
    sprite.height = props.height;
    this.addChild(sprite);
  }
}
