import slime from "../../game-assets/character/slime/slime.png";

export const friendListSample = {
  one: {
    health: {
      max: 250,
      current: 100,
    },
    graphics: {
      image: slime,
    },
  },
  two: {
    health: {
      max: 250,
      current: 100,
    },
    graphics: {
      image: slime,
    },
  },
  four: {
    health: {
      max: 250,
      current: 100,
    },
    graphics: {
      image: slime,
    },
  },
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
