import { Point } from "pixi.js";

/**
 * 被ダメージ時のモーション座標の計算
 * @param frame
 * @returns
 */
export function calcDamageMotion(frame: number, damageMotionDuration: number, damageMotionMax: number): Point {
  // xはsinカーブ4周 yはsinカーブ3周
  const progress = Math.min(frame / damageMotionDuration, 1);
  const angleProgressX = progress * 2 * Math.PI * 4;
  const angleProgressY = progress * 2 * Math.PI * 3;
  const angleRateX = Math.sin(angleProgressX);
  const angleRateY = Math.sin(angleProgressY);
  // 振れ幅 初期値1、最終0
  const valueRate = 1 - progress;
  return new Point(damageMotionMax * valueRate * angleRateX, damageMotionMax * valueRate * angleRateY);
}
