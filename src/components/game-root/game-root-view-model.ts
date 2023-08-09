import { BehaviorSubject } from "rxjs";

const gameKeyTypes = ["w", "a", "s", "d"] as const;
type GameKeyType = (typeof gameKeyTypes)[number];
export type KeyboardStateType = {
  [key in GameKeyType]: boolean;
};

export class GameRootViewModel {
  private readonly mouseState = new BehaviorSubject({ mouseDown: false });
  //  private mouseObservable = this.mouseState.asObservable();

  private readonly keyBoardState = new BehaviorSubject<KeyboardStateType>({
    w: false,
    a: false,
    s: false,
    d: false,
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

  getKeyBoard(): KeyboardStateType {
    return this.keyBoardState.value;
  }

  getMouse(): { mouseDown: boolean } {
    return this.mouseState.value;
  }

  setScene(name: string): void {
    this.sceneState.next(name);
  }
}
