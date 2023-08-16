import { type PersonalState } from "../../battle-character-state/personal-state";
import { type CommandDetail } from "../command-detail/command-detail";
import { type FriendListState } from "../../battle-character-state/friend-list-state";
import { type EnemyListState } from "../../battle-character-state/enemy-list-state";
import { produce } from "immer";
import { attack } from "../attack-command-result/attack-command-result";
import { type BattleSceneState } from "../../battle-scene-state/battle-scene-state";

const commandEffectTypes = ["damage"];
type CommandEffectType = (typeof commandEffectTypes)[number];

export type CommandEffectBase = {
  type: CommandEffectType;
};

export type DamageCommandEffect = {
  type: "damage";
  actor: "friend" | "enemy";
  actorIndex: number;
  target: "friend" | "enemy";
  targetIndex: number;
  hitRate: number;
  numberOfAttacks: number;
  numberOfHits: number;
  value: number;
};

export type CommandEffect = DamageCommandEffect;

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
        actor: command.actorType,
        actorIndex: command.actorIndex,
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

/**
 *
 */
export type PersonalStateApplyCommandEffectListResult = {
  friend: FriendListState;
  enemy: EnemyListState;
};

export function personalStateApplyCommandEffectList(
  friendListState: FriendListState,
  enemyListState: EnemyListState,
  list: ReadonlyArray<CommandEffect>,
): PersonalStateApplyCommandEffectListResult {
  const effectOnFriend = list.filter((effect) => effect.target === "friend");
  const effectOnEnemy = list.filter((effect) => effect.target === "enemy");

  const friendResult = produce(friendListState, (draft) => {
    effectOnFriend.forEach((effect) => {
      const target = draft.list[effect.targetIndex];
      if (target == null) return;
      target.parsonal.currentHitPoint = target.parsonal.currentHitPoint - effect.value;
    });
  });
  const enemyResult = produce(enemyListState, (draft) => {
    effectOnEnemy.forEach((effect) => {
      const target = draft.list[effect.targetIndex];
      if (target == null) return;
      target.personal.currentHitPoint = target.personal.currentHitPoint - effect.value;
    });
  });

  return {
    friend: friendResult,
    enemy: enemyResult,
  };
}
export { attack };
