export type ActorType = "enemy" | "friend";

export type CommandDetail = {
  actorType: ActorType;
  actorIndex: number;
  commandType: string;
  targetList: Array<number>;
};
