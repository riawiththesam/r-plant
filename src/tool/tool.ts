import * as PIXI from "pixi.js";
import { useGameUseCase } from "../use-case/game-use-case/game-use-case";
import { ThreeGameRoot } from "../three-components/three-game-root/three-game-root";
import { ToolRoot } from "../components/tool-root/tool-root";

export function startGame() {
  const { gameConfig } = useGameUseCase();

  const canvasContainer = document.querySelector("#canvasContainer");
  const canvas = document.querySelector("#pixi") as HTMLCanvasElement;
  if (canvasContainer == null || canvas == null) return;

  const options: Partial<PIXI.IApplicationOptions> = {
    width: gameConfig.width,
    height: gameConfig.height,
    view: canvas,
    backgroundAlpha: 0,
  };
  const app = new PIXI.Application(options);
  app.stage.addChild(new ToolRoot());

  const threeGamrRoot = new ThreeGameRoot();
  threeGamrRoot.run();

  const resizeCanvas = () => {
    const gameDisplayRatio = gameConfig.width / gameConfig.height;
    const containerRatio = canvasContainer.clientWidth / canvasContainer.clientHeight;

    if (gameDisplayRatio > containerRatio) {
      const resizeWidth = canvasContainer.clientWidth;
      const resizeHeight = resizeWidth / gameDisplayRatio;
      app.renderer.resize(resizeWidth, resizeHeight);
      threeGamrRoot.resize(resizeWidth, resizeHeight);

      const scaleX = resizeWidth / gameConfig.width;
      const scaleY = resizeHeight / gameConfig.height;
      app.stage.setTransform(0, 0, scaleX, scaleY);
    } else {
      const resizeHeight = canvasContainer.clientHeight;
      const resizeWidth = resizeHeight * gameDisplayRatio;
      app.renderer.resize(resizeWidth, resizeHeight);
      threeGamrRoot.resize(resizeWidth, resizeHeight);

      const scaleX = resizeWidth / gameConfig.width;
      const scaleY = resizeHeight / gameConfig.height;
      app.stage.setTransform(0, 0, scaleX, scaleY);
    }
  };
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("DOMContentLoaded", resizeCanvas);
}
