import { MainScene } from "./scene/main-scene/main-scene";
import "./style.css";
import { useGameUseCase } from "./use-case/game-use-case/game-use-case";

const { gameConfig } = useGameUseCase();

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: gameConfig.width,
  height: gameConfig.height,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: MainScene,
};
new Phaser.Game(config);
