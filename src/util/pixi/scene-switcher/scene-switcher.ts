import * as PIXI from "pixi.js";

export type SceneFactory = () => PIXI.Container;

export type SceneSwitcherProps = {
  sceneList: ReadonlyArray<[string, SceneFactory]>;
};

export class SceneSwitcher extends PIXI.Container {
  private currentScene: PIXI.Container | undefined;
  private sceneMap: ReadonlyMap<string, SceneFactory>;

  constructor(props: SceneSwitcherProps) {
    super();
    const {} = props;
    this.sceneMap = new Map(Object.values(props.sceneList));
  }

  startScene(name: string) {
    if (this.currentScene != null) {
      this.removeChild(this.currentScene);
      this.currentScene = undefined;
    }

    const factory = this.sceneMap.get(name);
    if (factory == null) return;
    this.currentScene = factory();
    this.addChild(this.currentScene);
  }
}
