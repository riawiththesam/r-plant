import { BehaviorSubject } from "rxjs";

const sceneState = new BehaviorSubject("");
const sceneObservable = sceneState.asObservable();

const mouseState = new BehaviorSubject({ mouseDown: false });
const mouseObservable = mouseState.asObservable();

const gameKeyTypes = ["w", "a", "s", "d"] as const;
type GameKeyType = (typeof gameKeyTypes)[number];
export type KeyboardStateType = {
  [key in GameKeyType]: boolean;
};
const keyBoardState = new BehaviorSubject<KeyboardStateType>({
  w: false,
  a: false,
  s: false,
  d: false,
});

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
    document.addEventListener("keydown", (ev) => {
      const next = {
        ...keyBoardState.value,
        [ev.key]: true,
      };

      keyBoardState.next(next);
    });
    document.addEventListener("keyup", (ev) => {
      const next = {
        ...keyBoardState.value,
        [ev.key]: false,
      };

      keyBoardState.next(next);
    });
  }

  function getKeyBoard() {
    return keyBoardState.value;
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
    getKeyBoard,
    getMouse,
    setScene,
  };
}
