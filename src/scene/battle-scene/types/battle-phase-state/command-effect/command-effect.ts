import range from "lodash/range";
import random from "lodash/random";
import sum from "lodash/sum";
import { type BattleSceneState } from "../../../battle-scene-subject";
import { type PersonalState } from "../../battle-character-state/personal-state";
import { type CommandDetail } from "../command-detail/command-detail";

const commandEffectTypes = ["damage"];
type CommandEffectType = (typeof commandEffectTypes)[number];

export type CommandEffectBase = {
  type: CommandEffectType;
};

export type DamageCommandEffect = {
  type: "damage";
  target: "friend" | "enemy";
  targetIndex: number;
  hitRate: number;
  numberOfAttacks: number;
  value: number;
};

export function createCommandEffectList(
  state: BattleSceneState,
  command?: CommandDetail,
): ReadonlyArray<CommandEffect> {
  if (command == null) return [];

  // TODO Commandに合わせる
  const targetType = command.actorType === "friend" ? "enemy" : "friend";

  // TODO 敵味方のステータスから効果量を算出する
  const actor = getCharacter(command.actorType, state, command.actorIndex);
  if (actor == null) return [];

  const list: ReadonlyArray<CommandEffect> = command.targetList
    .map((targetIndex) => {
      const target = getCharacter(targetType, state, targetIndex);
      if (target == null) return null;

      const attackResult = attack(actor, target);

      return {
        type: "damage",
        target: targetType,
        targetIndex,
        hitRate: attackResult.hitRate,
        numberOfAttacks: attackResult.numberOfAttacks,
        value: attackResult.damage,
      };
    })
    .filter((item) => item != null) as ReadonlyArray<CommandEffect>;
  return list;
}

export function getCharacter(
  targetType: "friend" | "enemy",
  state: BattleSceneState,
  targetIndex: number,
): PersonalState | undefined {
  if (targetType === "friend") {
    return state.friendListState.list[targetIndex]?.parsonal;
  } else {
    return state.enemyListState.list[targetIndex]?.personal;
  }
}

export type AttackResult = {
  damage: number;
  hitRate: number;
  numberOfAttacks: number;
};

export function attack(actor: PersonalState, target: PersonalState): AttackResult {
  const hitRate = Math.min(19 + target.armorClass + actor.hitRatelevelBonus, 19);
  const numberOfAttacks = actor.numberOfAttacks;

  const damageList = range(0, numberOfAttacks).map((_) => {
    const diceResult = random(0, 20);
    const hit = hitRate <= diceResult;
    const damage = random(0, 2);
    return hit ? damage : 0;
  });

  const effectValue = sum(damageList);
  return {
    damage: effectValue,
    hitRate,
    numberOfAttacks,
  };
}

export type CommandEffect = DamageCommandEffect;
