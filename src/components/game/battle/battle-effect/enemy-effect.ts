import { AnimatedSprite, Container, type Texture } from "pixi.js";

export type EnemyEffectProps = {
  textureList: Array<Texture>;
};

export class EnemyEffect extends Container {
  constructor(props: EnemyEffectProps) {
    super();

    const animation = new AnimatedSprite(props.textureList);
    animation.animationSpeed = 0.1;
    animation.x = 400;
    animation.y = 400;
    animation.width = 100;
    animation.height = 100;
    animation.play();
    this.addChild(animation);
  }

  update(): void {}
}
