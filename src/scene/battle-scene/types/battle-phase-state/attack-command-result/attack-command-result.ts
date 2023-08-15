import range from "just-range";
import { type PersonalState } from "../../battle-character-state/personal-state";
import { dice } from "../../../../../use-case/dice/dice";

export type AttackResult = {
  diceResult: number;
  hit: boolean;
  damage: number;
};

export type AttackCommandResult = {
  damage: number;
  hitRate: number;
  numberOfAttacks: number;
  attacks: ReadonlyArray<AttackResult>;
};

export function attack(actor: PersonalState, target: PersonalState): AttackCommandResult {
  const hitRate = Math.min(19 + target.armorClass + actor.hitRateLevelBonus, 19);
  const numberOfAttacks = actor.numberOfAttacks;

  const attackResultList: ReadonlyArray<AttackResult> = range(0, numberOfAttacks).map((_) => {
    // 命中判定
    const diceResult = dice(1, 20);
    const hit = hitRate >= diceResult.sum;
    // TODO 武器を装備した場合 1D2 以外の威力となる
    const damage = dice(1, 2);
    return {
      diceResult: diceResult.sum,
      hit,
      damage: damage.sum,
    };
  });
  const damages = attackResultList.map((item) => item.damage);

  const effectValue = damages.reduce((a, b) => a + b, 0);
  return {
    damage: effectValue,
    hitRate,
    numberOfAttacks,
    attacks: attackResultList,
  };
}
