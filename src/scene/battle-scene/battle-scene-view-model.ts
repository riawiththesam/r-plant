import { BehaviorSubject } from "rxjs";
import slime from "../../game-assets/character/slime/slime.png";

export type BattleCharacterState = {
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BattleCharacterListState = {
  list: ReadonlyArray<BattleCharacterState>;
};

export class BattleSceneViewModel {
  private readonly enemyListSubject = new BehaviorSubject<BattleCharacterListState>({ list: [] });
  enemyListObservable = this.enemyListSubject.asObservable();

  load(): void {
    this.enemyListSubject.next({
      list: [
        {
          image: slime,
          x: 100,
          y: 100,
          width: 100,
          height: 100,
        },
      ],
    });
  }
}
