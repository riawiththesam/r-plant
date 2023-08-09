import { type CharacterState } from "./character-state";

export type EnemyGraphicsState = {
  graphics: {
    image: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type EnemyCharacterState = CharacterState & EnemyGraphicsState;

export type EnemyListState = {
  list: ReadonlyArray<EnemyCharacterState>;
};
