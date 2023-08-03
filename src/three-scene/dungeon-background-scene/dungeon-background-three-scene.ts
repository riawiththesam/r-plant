import * as THREE from "three";
import { useGameUseCase } from "../../use-case/game-use-case/game-use-case";

export class DungeonBackgroundThreeScene extends THREE.Scene {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.Camera;
  private cube: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement) {
    super();
    const { gameConfig } = useGameUseCase();

    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.camera = new THREE.PerspectiveCamera(75, gameConfig.width / gameConfig.height, 0.1, 1000);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.add(this.cube);

    this.camera.position.z = 5;
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this, this.camera);
  }

  resize(width: number, height: number) {
    // レンダラーのサイズを調整する
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
  }
}
