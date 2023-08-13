import { Color, Container, Graphics } from "pixi.js";

export type HitPointBarProps = {
  x: number;
  y: number;
  width: number;
  max: number;
  current: number;
};

export class HitPointBar extends Container {
  constructor(props: HitPointBarProps) {
    super();

    const backgroundHitPoint = new Graphics();
    backgroundHitPoint.beginFill(new Color({ r: 255, g: 0, b: 0 }));
    backgroundHitPoint.drawRect(props.x, props.y, props.width, 8);
    this.addChild(backgroundHitPoint);

    const currentHitPointWidth = props.width * (props.current / props.max);
    const currentHitPoint = new Graphics();
    currentHitPoint.beginFill(new Color({ r: 0, g: 0, b: 255 }));
    currentHitPoint.drawRect(props.x, props.y, currentHitPointWidth, 8);
    this.addChild(currentHitPoint);
  }
}
