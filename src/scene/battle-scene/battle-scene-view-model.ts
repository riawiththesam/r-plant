import { BehaviorSubject } from "rxjs";
import slime from "../../game-assets/character/slime/slime.png";

export type BattleCharacterState = {
  health: {
    max: number;
    current: number;
  };
};

export type EnemyGraphicsState = {
  graphics: {
    image: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type EnemyCharacterState = BattleCharacterState & EnemyGraphicsState;

export type BattleEnemyListState = {
  list: ReadonlyArray<EnemyCharacterState>;
};

export type FriendGraphicsState = {
  graphics: {
    image: string;
  };
};

export type FriendCharacterState = BattleCharacterState & FriendGraphicsState;

export const friendListStateKeys = ["one", "two", "three", "four", "five", "six"] as const;
export type FriendListStateKey = (typeof friendListStateKeys)[number];
export type FriendListState = {
  [key in FriendListStateKey]?: FriendCharacterState;
};

export class BattleSceneViewModel {
  private readonly friendListSubject = new BehaviorSubject<FriendListState>({});
  friendListObservable = this.friendListSubject.asObservable();

  private readonly enemyListSubject = new BehaviorSubject<BattleEnemyListState>({ list: [] });
  enemyListObservable = this.enemyListSubject.asObservable();

  load(): void {
    this.friendListSubject.next({
      one: {
        health: {
          max: 250,
          current: 100,
        },
        graphics: {
          image: slime,
        },
      },
      two: {
        health: {
          max: 250,
          current: 100,
        },
        graphics: {
          image: slime,
        },
      },
      four: {
        health: {
          max: 250,
          current: 100,
        },
        graphics: {
          image: slime,
        },
      },
    });

    this.enemyListSubject.next({
      list: [
        {
          health: {
            max: 150,
            current: 100,
          },
          graphics: {
            image: slime,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
          },
        },
      ],
    });
  }
}
