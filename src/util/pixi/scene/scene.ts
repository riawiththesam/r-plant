import { Container } from "pixi.js";
import { BehaviorSubject, Subscription } from "rxjs";

export type SceneEventType = {
  type: string;
};

export type UpdateEventType = SceneEventType & {
  type: "update";
  delta: number;
};

export abstract class Scene extends Container {
  unsubscribeOnDestroy: Subscription | undefined;

  private readonly updateEventSubject = new BehaviorSubject<UpdateEventType>({ type: "update", delta: 0 });
  updateEvent = this.updateEventSubject.asObservable();

  __update(delta: number): void {
    this.updateEventSubject.next({ type: "update", delta });
    this.onUpdate(delta);
  }

  onUpdate(_delta: number): void {}

  __craete(): void {
    this.unsubscribeOnDestroy = new Subscription();
    this.onCreate();
  }

  onCreate(): void {}

  __destroy(): void {
    this.unsubscribeOnDestroy?.unsubscribe();
    this.onDestroy();
  }

  onDestroy(): void {}
}
