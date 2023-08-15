import slime from "../../game-assets/character/slime/slime.png";
import { type EnemyListState } from "./types/enemy-list-state";
import { type FriendListState } from "./types/friend-list-state";

export const friendListSample: FriendListState = {
  list: [
    {
      parsonal: {
        name: "キャラクター1",
        maxHitPoint: 250,
        currentHitPoint: 100,
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
      },
      inParty: {
        position: 0,
      },
    },
    {
      parsonal: {
        name: "キャラクター2",
        maxHitPoint: 250,
        currentHitPoint: 100,
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
      },
      inParty: {
        position: 1,
      },
    },
    {
      parsonal: {
        name: "キャラクター3",
        maxHitPoint: 250,
        currentHitPoint: 100,
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
      },
      inParty: {
        position: 3,
      },
    },
  ],
};

export const enemyListSample: EnemyListState = {
  list: [
    {
      personal: {
        name: "敵スライム1",
        maxHitPoint: 150,
        currentHitPoint: 100,
      },
      // TODO 削除
      health: {
        max: 150,
        current: 100,
      },
      graphics: {
        image: slime,
        x: 600,
        y: 400,
        width: 100,
        height: 100,
      },
    },
  ],
};
