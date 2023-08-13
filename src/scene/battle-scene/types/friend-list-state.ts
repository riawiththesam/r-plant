export type FriendParsonalState = {
  name: string;
  maxHitPoint: number;
  currentHitPoint: number;
};

export type FriendGraphicsState = {
  image: string;
};

export type FriendCommandState = {
  commandList: Array<[string, string]>;
};

export type FriendInPartyState = {
  position: number;
};

export type FriendCharacterState = {
  parsonal: FriendParsonalState;
  graphics: FriendGraphicsState;
  command: FriendCommandState;
  inParty: FriendInPartyState;
};

export type FriendListState = {
  list: Array<FriendCharacterState>;
};
