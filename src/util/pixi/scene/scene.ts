import { Container } from "pixi.js";
import { BehaviorSubject } from "rxjs";

export type SceneEventType = {
  type: string;
};

export type UpdateEventType = SceneEventType & {
  type: "update";
  delta: number;
};

export abstract class Scene extends Container {
  private updateEventSubject = new BehaviorSubject<UpdateEventType>({ type: "update", delta: 0 });
  updateEvent = this.updateEventSubject.asObservable();

  onUpdate(delta: number) {
    this.updateEventSubject.next({ type: "update", delta });
  }
}
