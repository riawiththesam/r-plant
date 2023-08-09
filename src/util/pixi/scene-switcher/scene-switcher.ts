import { type Application, Container } from "pixi.js";
import { type Scene } from "../scene/scene";

export type SceneFactory = () => Scene;

export type SceneSwitcherProps = {
  app: Application;
  sceneList: ReadonlyArray<[string, SceneFactory]>;
};

export class SceneSwitcher extends Container {
  private currentScene: Scene | undefined;
  private readonly sceneMap: ReadonlyMap<string, SceneFactory>;

  constructor(props: SceneSwitcherProps) {
    super();
    const { app, sceneList } = props;
    this.sceneMap = new Map(Object.values(sceneList));

    app.ticker.add((delta) => {
      this.currentScene?.__update(delta);
    });
  }

  startScene(name: string): void {
    if (this.currentScene != null) {
      this.removeChild(this.currentScene);
      this.currentScene.__destroy();
      this.currentScene = undefined;
    }

    const factory = this.sceneMap.get(name);
    if (factory == null) return;
    this.currentScene = factory();
    this.currentScene.__craete();
    this.addChild(this.currentScene);
  }
}
