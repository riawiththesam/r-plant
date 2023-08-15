import slime from "../../game-assets/character/slime/slime.png";
import { type EnemyListState } from "./types/battle-character-state/enemy-list-state";
import { type FriendListState } from "./types/battle-character-state/friend-list-state";
import { getHitRateBonus, getNumberOfAttacks } from "./types/battle-character-state/job-state";

export const friendListSample: FriendListState = {
  list: [
    {
      parsonal: {
        name: "キャラクター1",
        level: 10,
        job: "warrior",
        hitRateLevelBonus: getHitRateBonus("warrior", 10),
        numberOfAttacks: getNumberOfAttacks("warrior", 10),
        armorClass: 0,
        maxHitPoint: 50,
        currentHitPoint: 50,
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
        level: 10,
        job: "mage",
        hitRateLevelBonus: getHitRateBonus("mage", 10),
        numberOfAttacks: getNumberOfAttacks("mage", 10),
        armorClass: 0,
        maxHitPoint: 50,
        currentHitPoint: 50,
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
        level: 1,
        job: "warrior",
        hitRateLevelBonus: getHitRateBonus("warrior", 1),
        numberOfAttacks: getNumberOfAttacks("warrior", 1),
        armorClass: 0,
        maxHitPoint: 50,
        currentHitPoint: 50,
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
        level: 10,
        job: "warrior",
        hitRateLevelBonus: getHitRateBonus("warrior", 10),
        numberOfAttacks: getNumberOfAttacks("warrior", 10),
        armorClass: 0,
        maxHitPoint: 50,
        currentHitPoint: 50,
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
