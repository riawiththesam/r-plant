export type EnemyParsonalState = {
  name: string;
  maxHitPoint: number;
  currentHitPoint: number;
};

export type EnemyGraphicsState = {
  personal: EnemyParsonalState;
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
