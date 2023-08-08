import { BehaviorSubject } from "rxjs";

const gameKeyTypes = ["w", "a", "s", "d"] as const;
type GameKeyType = (typeof gameKeyTypes)[number];
export type KeyboardStateType = {
  [key in GameKeyType]: boolean;
};

export class GameRootViewModel {
  private mouseState = new BehaviorSubject({ mouseDown: false });
  //  private mouseObservable = this.mouseState.asObservable();

  private keyBoardState = new BehaviorSubject<KeyboardStateType>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  private sceneState = new BehaviorSubject("");
  sceneObservable = this.sceneState.asObservable();

  constructor() {
    const setMouseState = (mouseDown: boolean) => {
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

  getKeyBoard() {
    return this.keyBoardState.value;
  }

  getMouse() {
    return this.mouseState.value;
  }

  setScene(name: string) {
    this.sceneState.next(name);
  }
}
