import { type PersonalState } from "./personal-state";

export type EnemyGraphicsState = {
  personal: PersonalState;
  graphics: {
    image: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type EnemyCharacterState = EnemyGraphicsState;

export type EnemyListState = {
  list: ReadonlyArray<EnemyCharacterState>;
};
