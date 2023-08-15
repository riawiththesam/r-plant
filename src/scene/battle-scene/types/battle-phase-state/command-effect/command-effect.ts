import { type BattleSceneState } from "../../../battle-scene-subject";
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
  value: number;
};

export function createCommandEffectList(_: BattleSceneState, command?: CommandDetail): ReadonlyArray<CommandEffect> {
  if (command == null) return [];

  // TODO Commandに合わせる
  const target = command.actorType === "friend" ? "enemy" : "friend";

  // TODO 敵味方のステータスから効果量を算出する
  const effectValue = 5;

  const list: ReadonlyArray<CommandEffect> = command.targetList.map((targetIndex) => {
    return {
      type: "damage",
      target,
      targetIndex,
      value: effectValue,
    };
  });
  return list;
}

export type CommandEffect = DamageCommandEffect;
