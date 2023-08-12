import slime from "../../game-assets/character/slime/slime.png";
import { type FriendListState } from "./types/friend-list-state";

export const friendListSample: FriendListState = {
  list: [
    {
      common: {
        health: {
          max: 250,
          current: 100,
        },
      },
      graphics: {
        image: slime,
      },
      command: {
        commandList: [
          ["attack", "攻撃"],
          ["spell", "呪文"],
          ["skill", "スキル"],
          ["item", "アイテム"],
        ],
        selectedCommandIndex: 0,
      },
      reservedCommand: {
        command: undefined,
      },
      inParty: {
        position: 0,
      },
    },
    {
      common: {
        health: {
          max: 250,
          current: 100,
        },
      },
      graphics: {
        image: slime,
      },
      command: {
        commandList: [
          ["attack", "攻撃"],
          ["spell", "呪文"],
          ["skill", "スキル"],
          ["item", "アイテム"],
        ],
        selectedCommandIndex: 0,
      },
      reservedCommand: {
        command: undefined,
      },
      inParty: {
        position: 1,
      },
    },
    {
      common: {
        health: {
          max: 250,
          current: 100,
        },
      },
      graphics: {
        image: slime,
      },
      command: {
        commandList: [
          ["attack", "攻撃"],
          ["spell", "呪文"],
          ["skill", "スキル"],
          ["item", "アイテム"],
        ],
        selectedCommandIndex: 0,
      },
      reservedCommand: {
        command: undefined,
      },
      inParty: {
        position: 3,
      },
    },
  ],
};

export const enemyListSample = {
  list: [
    {
      health: {
        max: 150,
        current: 100,
      },
      graphics: {
        image: slime,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      },
    },
  ],
};
