import { BehaviorSubject } from "rxjs";

const sceneState = new BehaviorSubject("");
const sceneObservable = sceneState.asObservable();

const mouseState = new BehaviorSubject({ mouseDown: false });
const mouseObservable = mouseState.asObservable();

export function useGameUseCase() {
  const gameConfig = {
    width: 800,
    height: 600,
  };

  function initializeGame() {
    function setMouseState(mouseDown: boolean) {
      const current = mouseState.value;
      mouseState.next({ ...current, mouseDown });
    }
    document.addEventListener("pointerdown", () => {
      setMouseState(true);
    });
    document.addEventListener("pointerup", () => {
      setMouseState(false);
    });
  }

  function getMouse() {
    return mouseState.value;
  }

  function setScene(name: string) {
    sceneState.next(name);
  }

  return {
    gameConfig,
    sceneObservable,
    mouseObservable,
    initializeGame,
    setScene,
  };
}
