import { AnimatedSprite, Container, type Texture } from "pixi.js";

export type EnemyEffectProps = {
  textureList: Array<Texture>;
};

export class EnemyEffect extends Container {
  constructor(private readonly props: EnemyEffectProps) {
    super();
  }

  startAnimation(x: number, y: number): void {
    const animation = new AnimatedSprite(this.props.textureList);

    animation.x = x;
    animation.y = y;
    animation.width = 100;
    animation.height = 100;
    animation.animationSpeed = 1;
    animation.loop = false;
    animation.onComplete = () => {
      this.removeChild(animation);
    };
    this.addChild(animation);
    animation.play();
  }
}
