import { PositionInDungeon, moveForwardPositionInDungeon, turnPositionInDungeon } from "./position-in-dungeon-types";

const playerMoveTypes = ["stop", "moveForward", "turnLeft", "turnRight"] as const;
type PlayerMoveType = (typeof playerMoveTypes)[number];

export type PlayerStateType = {
  moveState: {
    state: PlayerMoveType;
    delta: number;
  };
  position: PositionInDungeon;
};

export const defaultPlayerStateType: PlayerStateType = {
  moveState: {
    state: "stop",
    delta: 0,
  },
  position: {
    x: 0,
    y: 0,
    direction: "east",
  },
};

const movingType = ["moveForward", "turnLeft", "turnRight"] as const;
export function playerIsMoving(playerState: PlayerStateType): boolean {
  return movingType.some((value) => value == playerState.moveState.state);
}

export function startMoveForwardPlayer(playerState: PlayerStateType): PlayerStateType {
  const nextPosition = moveForwardPositionInDungeon(playerState.position);
  return {
    moveState: {
      state: "moveForward",
      delta: 0,
    },
    position: nextPosition,
  };
}

export function startTurnPlayer(playerState: PlayerStateType, turn: "right" | "left"): PlayerStateType {
  const nextPosition = turnPositionInDungeon(turn, playerState.position);
  return {
    moveState: {
      state: turn == "right" ? "turnRight" : "turnLeft",
      delta: 0,
    },
    position: nextPosition,
  };
}

export function updatePlayerMoveState(playerState: PlayerStateType, delta: number): PlayerStateType {
  const currentMoveStateDelta = playerState.moveState.delta + delta;

  if (currentMoveStateDelta < 20) {
    // 20フレーム(1/3秒)まではdeltaだけを更新
    return {
      ...playerState,
      moveState: {
        ...playerState.moveState,
        delta: currentMoveStateDelta,
      },
    };
  } else {
    // 移動完了
    return {
      ...playerState,
      moveState: {
        ...playerState.moveState,
        state: "stop",
        delta: 0,
      },
    };
  }
}
