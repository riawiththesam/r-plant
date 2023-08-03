import { BehaviorSubject } from "rxjs";
import { MainScene } from "../../scene/main-scene/main-scene";

const sceneState = new BehaviorSubject(MainScene.name);
const sceneObservable = sceneState.asObservable();

const mouseState = new BehaviorSubject({ mouseDown: false });
const mouseObservable = mouseState.asObservable();

export function useGameUseCase() {
  const gameConfig = {
    width: 800,
    height: 600,
  };

  function getMouse() {
    return mouseState.value;
  }

  function setScene(name: string) {
    sceneState.next(name);
  }

  function setMouseState(mouseDown: boolean) {
    const current = mouseState.value;
    mouseState.next({ ...current, mouseDown });
  }

  return {
    gameConfig,
    sceneObservable,
    mouseObservable,
    getMouse,
    setScene,
    setMouseState,
  };
}
