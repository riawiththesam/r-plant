import { BehaviorSubject } from "rxjs";
import { type EnemyListState } from "./types/battle-character-state/enemy-list-state";
import { type FriendListState } from "./types/battle-character-state/friend-list-state";
import { type PhaseState } from "./types/battle-phase-state/battle-phase-state";
import { type BattleSettingState } from "./types/battle-setting-state/battle-setting-state";
import { produce, castDraft } from "immer";
import { type CommandDetail } from "./types/battle-phase-state/command-detail/command-detail";
import { createPreparePhaseState } from "./types/battle-phase-state/prepare-phase-state/prepare-phase-state";
import { createReserveActionsState } from "./types/battle-phase-state/reserve-actions-state/reserve-actions-state";
import { createSelectTargetState } from "./types/battle-phase-state/select-target-state/select-target-state";
import { createPreExecuteActionsState } from "./types/battle-phase-state/pre-execute-actions-state/pre-execute-actions-state";
import {
  createExecuteActionsState,
  executeActionsStateCreateNextPhase,
  updateExecuteActionsState,
} from "./types/battle-phase-state/execute-actions-state/execute-actions-state";
import { personalStateApplyCommandEffectList } from "./types/battle-phase-state/command-effect/command-effect";

export type BattleSceneState = {
  phaseState: PhaseState;
  friendListState: FriendListState;
  enemyListState: EnemyListState;
  settingState: BattleSettingState;
};

const defaultBattleSceneState: BattleSceneState = {
  phaseState: createPreparePhaseState(),
  friendListState: { list: [] },
  enemyListState: { list: [] },
  settingState: {
    commandAutoProgressionDuration: 30,
  },
};

export class BattleSceneSubject extends BehaviorSubject<BattleSceneState> {
  constructor() {
    super(defaultBattleSceneState);
  }

  applyInputFriendListStateIfPossible(input: "down" | "up"): void {
    // 行動選択中
    const phaseState = this.value.phaseState;
    if (phaseState.type !== "reserveActions") return;

    const friendState = this.value.friendListState.list[phaseState.characterIndex];
    if (friendState == null) return;

    const nextPhase = produce(phaseState, (draft) => {
      const indexDiff = input === "down" ? 1 : -1 + friendState.command.commandList.length;
      const nextIndex = (draft.selectedCommandIndex + indexDiff) % friendState.command.commandList.length;
      draft.selectedCommandIndex = nextIndex;
    });

    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = nextPhase;
      }),
    );
  }

  applyReserveActionsDecide(): void {
    const phase = this.value.phaseState;
    if (phase.type !== "reserveActions") return undefined;
    const nextPhase = createSelectTargetState({
      type: "selectTarget",
      characterIndex: phase.characterIndex,
      selectedCommandIndex: phase.selectedCommandIndex,
      selectedEnemyTargetIndexes: [0],
      reservedCommandList: [...phase.reservedCommandList],
    });
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = nextPhase;
      }),
    );
  }

  applyDecideSelectTarget(): void {
    // selectTarget以外のフェーズ、対象のキャラクターがいない、コマンドが選択できていない場合は何もしない
    const phase = this.value.phaseState;
    if (phase.type !== "selectTarget") return;
    const friend = this.value.friendListState.list[phase.characterIndex];
    if (friend === null) return;
    const [commandType] = friend?.command.commandList[phase.selectedCommandIndex] ?? [];
    if (commandType == null) return;
    const targetList = [...phase.selectedEnemyTargetIndexes];

    // コマンドを保存
    const command: CommandDetail = { actorType: "friend", actorIndex: phase.characterIndex, commandType, targetList };
    const reservedCommand = [...phase.reservedCommandList, command];

    // 次のPhaseに変更 パーティ全員分の行動を予約したらPreExecuteActions、まだであれば次のキャラクターの行動予約
    this.next(
      produce(this.value, (draft) => {
        const nextPhase =
          reservedCommand.length === draft.friendListState.list.length
            ? createPreExecuteActionsState({
                reservedCommandList: reservedCommand,
              })
            : createReserveActionsState({
                characterIndex: phase.characterIndex + 1,
                reservedCommandList: reservedCommand,
              });
        draft.phaseState = nextPhase;
      }),
    );
  }

  resolvePreExecuteActions(): void {
    const phase = this.value.phaseState;
    if (phase.type !== "preExecuteActions") return;

    const enemyCommandList: Array<CommandDetail> = this.value.enemyListState.list.map((_, index) => {
      return {
        actorType: "enemy",
        actorIndex: index,
        commandType: "attack",
        targetList: [0],
      };
    });

    const allCharacterCommandList = phase.reservedCommandList.concat(enemyCommandList);

    // お互いのすべての行動を設定
    const nextValue = produce(this.value, (draft) => {
      const nextPhase = createExecuteActionsState(
        draft,
        allCharacterCommandList,
        0,
        0,
        draft.settingState.commandAutoProgressionDuration,
      );
      if (nextPhase == null) return;

      draft.phaseState = castDraft(nextPhase);
    });
    this.next(nextValue);
  }

  updateExecuteActions(delta: number): void {
    const phase = this.value.phaseState;
    if (phase.type !== "executeActions") return;

    if (phase.commandEffectCurrentFrame < phase.commandAutoProgressionDuration) {
      this.next(
        produce(this.value, (draft) => {
          draft.phaseState = castDraft(updateExecuteActionsState(phase, delta));
        }),
      );
      return;
    }
    const nextCharacterState = personalStateApplyCommandEffectList(
      this.value.friendListState,
      this.value.enemyListState,
      phase.commandResult,
    );
    this.next(
      produce(this.value, (draft) => {
        draft.phaseState = castDraft(executeActionsStateCreateNextPhase(phase, this.value));
        draft.enemyListState = castDraft(nextCharacterState.enemy);
        draft.friendListState = castDraft(nextCharacterState.friend);
      }),
    );
  }
}
