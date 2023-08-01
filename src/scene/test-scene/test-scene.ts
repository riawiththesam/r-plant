export class TestScene extends Phaser.Scene {
  private debug: Phaser.GameObjects.Graphics | undefined;

  constructor() {
    super({ key: "TestScene" });
  }

  preload() {
    this.load.image("floor", "assets/dungeon/floor/fl-grass.png");
  }

  create() {
    //    this.add.image(400, 300, "bg").setFlip(false, true);

    const vertices = [-1, 1, 1, 1, -1, -1, 1, -1];
    const uvs = [0, 0, 1, 0, 0, 1, 1, 1];

    const indicies = [0, 2, 1, 2, 3, 1];

    const mesh = this.add.mesh(400, 300, "floor");
    mesh.addVertices(vertices, uvs, indicies);
    mesh.panZ(7);

    //    this.debug = this.add.graphics();
    //    mesh.setDebug(this.debug);
    /*
    this.input.keyboard.on("keydown-D", () => {
      if (mesh.debugCallback) {
        mesh.setDebug();
      } else {
        mesh.setDebug(this.debug);
      }
    });
    */

    const rotateRate = 1;
    const panRate = 1;
    const zoomRate = 4;

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) {
        return;
      }

      if (!pointer.event.shiftKey) {
        mesh.modelRotation.y += pointer.velocity.x * (rotateRate / 800);
        mesh.modelRotation.x += pointer.velocity.y * (rotateRate / 600);
      } else {
        mesh.panX(pointer.velocity.x * (panRate / 800));
        mesh.panY(pointer.velocity.y * (panRate / 600));
      }
    });

    this.input.on(
      "wheel",
      (
        pointer: Phaser.Input.Pointer,
        over: Array<Phaser.GameObjects.GameObject>,
        deltaX: number,
        deltaY: number,
        deltaZ: number,
      ) => {
        mesh.panZ(deltaY * (zoomRate / 600));
      },
    );
  }
}
