import { type JobType } from "./job-state";

export type PersonalState = {
  name: string;
  level: number;
  job: JobType;
  hitRatelevelBonus: number;
  numberOfAttacks: number;
  armorClass: number;
  maxHitPoint: number;
  currentHitPoint: number;
};
