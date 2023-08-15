import range from "just-range";
import { type BattleSceneState } from "../../../battle-scene-subject";
import { type PersonalState } from "../../battle-character-state/personal-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { dice } from "../../../../../use-case/dice/dice";

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
  numberOfHits: number;
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

      const attackCommandResult = attack(actor, target);
      const numberOfHits = attackCommandResult.attacks.filter((attack) => attack.hit).length;

      return {
        type: "damage",
        target: targetType,
        targetIndex,
        hitRate: attackCommandResult.hitRate,
        numberOfAttacks: attackCommandResult.numberOfAttacks,
        numberOfHits,
        value: attackCommandResult.damage,
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

export type CommandEffect = DamageCommandEffect;
