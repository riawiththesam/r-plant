import range from "lodash/range";
import { AnimatedSprite, Container, Rectangle, Texture } from "pixi.js";
import attack1Effect from "../../../../game-assets/effect/battle/attack_1.png";

const animationWidth = 100;
const animationHeight = 100;

const fullTextureHeight = 240;
const textureWidth = 240;

export class BattleEffect extends Container {
  private readonly textureList: Array<Texture>;

  constructor() {
    super();

    const fullTexture = Texture.from(attack1Effect);
    this.textureList = range(0, 5).map((index) => {
      const rect = new Rectangle(textureWidth * index, 0, textureWidth, fullTextureHeight);
      return new Texture(fullTexture.castToBaseTexture(), rect);
    });
  }

  startAnimation(x: number, y: number): void {
    const animation = new AnimatedSprite(this.textureList);

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
