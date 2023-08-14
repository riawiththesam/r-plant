import { AnimatedSprite, Container, type Texture } from "pixi.js";

const animationWidth = 100;
const animationHeight = 100;

export type EnemyEffectProps = {
  textureList: Array<Texture>;
};

export class EnemyEffect extends Container {
  constructor(private readonly props: EnemyEffectProps) {
    super();
  }

  startAnimation(x: number, y: number): void {
    const animation = new AnimatedSprite(this.props.textureList);

    animation.x = x - animationWidth / 2;
    animation.y = y - animationHeight / 2;
    animation.width = animationWidth;
    animation.height = animationHeight;
    animation.animationSpeed = 1;
    animation.loop = false;
    animation.onComplete = () => {
      this.removeChild(animation);
    };
    this.addChild(animation);
    animation.play();
  }
}
