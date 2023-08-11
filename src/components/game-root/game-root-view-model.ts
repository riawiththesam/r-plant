import { BehaviorSubject } from "rxjs";
import { type KeyboardStateType } from "../../scene/battle-scene/types/keyboard-state";
import { type GameInputStateType, type GameInputType } from "../../scene/battle-scene/types/input-state";

const keyboardGameInputMap: {
  [key in string]: GameInputType;
} = {
  w: "up",
  a: "left",
  s: "down",
  d: "right",
};

export class GameRootViewModel {
  private readonly mouseState = new BehaviorSubject({ mouseDown: false });
  //  private mouseObservable = this.mouseState.asObservable();

  private readonly keyBoardState = new BehaviorSubject<KeyboardStateType>({});

  private readonly inputState = new BehaviorSubject<GameInputStateType>({
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  });

  private readonly sceneState = new BehaviorSubject("");
  sceneObservable = this.sceneState.asObservable();

  constructor() {
    const setMouseState = (mouseDown: boolean): void => {
      const current = this.mouseState.value;
      this.mouseState.next({ ...current, mouseDown });
    };
    document.addEventListener("pointerdown", () => {
      setMouseState(true);
    });
    document.addEventListener("pointerup", () => {
      setMouseState(false);
    });

    document.addEventListener("keydown", (ev) => {
      const next = {
        ...this.keyBoardState.value,
        [ev.key]: true,
      };
      this.keyBoardState.next(next);
    });
    document.addEventListener("keyup", (ev) => {
      const next = {
        ...this.keyBoardState.value,
        [ev.key]: false,
      };
      this.keyBoardState.next(next);
    });
  }

  tick(delta: number): void {
    const current = this.inputState.value;
    const next: GameInputStateType = {
      up: 0,
      down: 0,
      left: 0,
      right: 0,
    };
    const currentKeyboard = this.getKeyBoard();

    Object.entries(keyboardGameInputMap).forEach(([keyboardKey, inputKey]) => {
      const state = currentKeyboard[keyboardKey];
      if (state === true) {
        next[inputKey] = current[inputKey] + delta;
      }
    });

    this.inputState.next(next);
  }

  getKeyBoard(): KeyboardStateType {
    return this.keyBoardState.value;
  }

  getInput(): GameInputStateType {
    return this.inputState.value;
  }

  getMouse(): { mouseDown: boolean } {
    return this.mouseState.value;
  }

  setScene(name: string): void {
    this.sceneState.next(name);
  }
}
