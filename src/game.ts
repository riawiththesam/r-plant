import * as PIXI from "pixi.js";
import { useGameUseCase } from "./use-case/game-use-case/game-use-case";
import { MainScene } from "./scene/main-scene/main-scene";

export function startGame() {
  const { gameConfig } = useGameUseCase();

  const canvas = document.querySelector("#pixi") as HTMLCanvasElement;
  if (canvas == null) return;

  const options: Partial<PIXI.IApplicationOptions> = {
    width: gameConfig.width,
    height: gameConfig.height,
    view: canvas,
  };

  const app = new PIXI.Application(options);
  app.stage.addChild(new MainScene());
}
