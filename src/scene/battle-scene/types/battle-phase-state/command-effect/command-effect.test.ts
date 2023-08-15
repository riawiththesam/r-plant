import { getHitRateBonus, getNumberOfAttacks } from "../../battle-character-state/job-state";
import { type PersonalState } from "../../battle-character-state/personal-state";
import { attack } from "./command-effect";

describe("describe", () => {
  test("test", () => {
    const actor: PersonalState = {
      name: "キャラクター1",
      level: 10,
      job: "warrior",
      hitRateLevelBonus: getHitRateBonus("warrior", 10),
      numberOfAttacks: getNumberOfAttacks("warrior", 10),
      armorClass: 0,
      maxHitPoint: 250,
      currentHitPoint: 100,
    };
    const target: PersonalState = {
      name: "敵スライム1",
      level: 10,
      job: "warrior",
      hitRateLevelBonus: getHitRateBonus("warrior", 10),
      numberOfAttacks: getNumberOfAttacks("warrior", 10),
      armorClass: 0,
      maxHitPoint: 150,
      currentHitPoint: 100,
    };
    if (actor == null || target == null) throw Error();

    const result = attack(actor, target);
    console.log(actor);
    console.log(result);
  });
});
