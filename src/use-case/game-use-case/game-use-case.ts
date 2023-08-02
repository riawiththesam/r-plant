import { BehaviorSubject } from "rxjs";
import { MainScene } from "../../scene/main-scene/main-scene";

const sceneState = new BehaviorSubject(MainScene.name);
const sceneObservable = sceneState.asObservable();

export function useGameUseCase() {
  const gameConfig = {
    width: 800,
    height: 600,
  };

  function setScene(name: string) {
    sceneState.next(name);
  }

  return {
    gameConfig,
    sceneObservable,
    setScene,
  };
}
