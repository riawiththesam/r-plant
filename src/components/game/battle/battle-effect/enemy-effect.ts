import { AnimatedSprite, Container, type Texture } from "pixi.js";

export type EnemyEffectProps = {
  textureList: Array<Texture>;
};

export class EnemyEffect extends Container {
  private readonly animation: AnimatedSprite;

  constructor(props: EnemyEffectProps) {
    super();

    this.animation = new AnimatedSprite(props.textureList);
    this.animation.x = 400;
    this.animation.y = 400;
    this.animation.width = 100;
    this.animation.height = 100;
    this.addChild(this.animation);
  }

  update(elapsedFrame: number): void {
    console.log(elapsedFrame);
    const frame = Math.round(elapsedFrame / 10);
    this.animation.currentFrame = frame % this.animation.totalFrames;
  }
}
