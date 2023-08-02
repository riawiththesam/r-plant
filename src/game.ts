import { MainScene } from "./scene/main-scene/main-scene";
import { TestScene } from "./scene/test-scene/test-scene";
import { useGameUseCase } from "./use-case/game-use-case/game-use-case";

export function startGame() {
  const { gameConfig } = useGameUseCase();

  const canvas = document.querySelector("#phaser") as HTMLCanvasElement;
  if (canvas == null) return;

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    width: gameConfig.width,
    height: gameConfig.height,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: [MainScene, TestScene],
    canvas: canvas,
    render: {
      transparent: true,
    },
  };
  new Phaser.Game(config);
}
