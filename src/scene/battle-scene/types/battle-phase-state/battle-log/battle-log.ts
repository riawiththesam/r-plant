import { type BattleSceneState } from "../../battle-scene-state/battle-scene-state";
import { type CommandEffect } from "../command-effect/command-effect";

export type BattleLog = {
  actor: "friend" | "enemy";
  list: ReadonlyArray<string>;
};

export function createBattleLog(
  state: BattleSceneState,
  actor: "friend" | "enemy",
  commandEffectList: ReadonlyArray<CommandEffect>,
): BattleLog {
  const list = commandEffectList
    .map((effect) => {
      // TODO weapon
      const weaponName = "素手";
      const numberOfAttacks = `${effect.numberOfAttacks}回攻撃`;
      const numberOfHits = `${effect.numberOfHits}回ヒット`;
      const numberOfDamage = `${effect.value}のダメージ`;
      const actorName = getActorName(state, effect);
      return [actorName, weaponName, numberOfAttacks, numberOfHits, numberOfDamage];
    })
    .flat();

  return {
    actor,
    list,
  };
}

export function getActorName(state: BattleSceneState, commandEffect: CommandEffect): string {
  if (commandEffect.actor === "enemy") {
    const actor = state.enemyListState.list[commandEffect.actorIndex];
    return actor?.personal.name ?? "???";
  } else {
    const actor = state.friendListState.list[commandEffect.actorIndex];
    return actor?.parsonal.name ?? "???";
  }
}
