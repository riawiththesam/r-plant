import { Color, Container, Graphics, Text } from "pixi.js";
import { letContainer } from "../../../../util/pixi/container/containers";

const lineHeight = 30;
const bgColorBlue = new Color({ r: 0, g: 0, b: 255, a: 0.8 });
const bgColorDarkBlue = new Color({ r: 0, g: 0, b: 128, a: 0.8 });
const bgColorRed = new Color({ r: 255, g: 0, b: 0, a: 0.8 });
const bgColorDarkRed = new Color({ r: 128, g: 0, b: 0, a: 0.8 });

type BattleLogProps = {
  actor: "friend" | "enemy";
  log: ReadonlyArray<string>;
};

export class BattleLog extends Container {
  constructor(props: BattleLogProps) {
    super();

    this.safeAddChildren(
      props.log.map((line, index) => {
        const y = lineHeight * index;
        const logLine = createLogLine(y, line, getLineColor(props.actor, index));
        return logLine;
      }),
    );
  }
}

function getLineColor(actor: "friend" | "enemy", index: number): Color {
  switch (actor) {
    case "friend":
      return index % 2 === 0 ? bgColorBlue : bgColorDarkBlue;
    case "enemy":
      return index % 2 === 0 ? bgColorRed : bgColorDarkRed;
  }
}

function createLogLine(y: number, text: string, bgColor: Color): Container {
  return letContainer((it) => {
    const lineBackground = new Graphics();
    lineBackground.x = 0;
    lineBackground.y = y;
    lineBackground.beginFill(bgColor);
    lineBackground.drawRect(0, 0, 400, lineHeight);
    lineBackground.addTo(it);

    const textObject = new Text(text, {
      fill: 0xffffff,
      fontSize: 20,
    });
    textObject.anchor.set(0.5);
    textObject.x = 0 + textObject.width / 2;
    textObject.y = y + textObject.height / 2;
    textObject.addTo(it);
  });
}
