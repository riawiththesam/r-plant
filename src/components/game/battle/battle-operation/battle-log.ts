import { Color, Container, Graphics, Text } from "pixi.js";
import { letContainer } from "../../../../util/pixi/container/containers";

const lineHeight = 30;
const bgColorBlue = new Color({ r: 0, g: 0, b: 255, a: 0.5 });
const bgColorDarkBlue = new Color({ r: 0, g: 0, b: 128, a: 0.5 });

type BattleLogProps = {
  log: ReadonlyArray<string>;
};

export class BattleLog extends Container {
  constructor(props: BattleLogProps) {
    super();

    this.safeAddChildren(
      props.log.map((line, index) => {
        const y = lineHeight * index;
        const logLine = createLogLine(y, line, index % 2 === 0 ? bgColorBlue : bgColorDarkBlue);
        return logLine;
      }),
    );
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
      fill: new Color({ r: 255, g: 255, b: 255 }).toArray(),
      fontSize: 20,
    });
    textObject.anchor.set(0.5);
    textObject.x = 0 + textObject.width / 2;
    textObject.y = y + textObject.height / 2;
    textObject.addTo(it);
  });
}
