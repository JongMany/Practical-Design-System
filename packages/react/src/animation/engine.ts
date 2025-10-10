/**
 * Rally Animation Engine
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 엔진
 */

import type {
  AnimationEngine,
  AnimationEvent,
  AnimationState,
  Motion,
  MotionSpec,
  Rally,
  RallySpec,
  Timeline,
  TimelineSpec,
} from "./types";
import { getEasingConfig } from "./presets";

// 이벤트 리스너 타입
type EventListener = (event: AnimationEvent) => void;

// 이벤트 매니저 클래스
class EventManager {
  private listeners: Map<string, Set<EventListener>> = new Map();

  on(event: string, callback: EventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: EventListener): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  emit(event: AnimationEvent): void {
    const eventListeners = this.listeners.get(event.type);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(event));
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}

// 모션 구현 클래스
class MotionImpl implements Motion {
  public spec: MotionSpec;
  public state: AnimationState = "idle";
  private eventManager = new EventManager();
  private animationId: number | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private element: HTMLElement | null = null;

  constructor(spec: MotionSpec, target?: string | HTMLElement) {
    this.spec = spec;

    if (target) {
      if (typeof target === "string") {
        this.element = document.querySelector(target) as HTMLElement;
      } else {
        this.element = target;
      }
    }
  }

  async start(): Promise<void> {
    if (this.state === "running") return;

    this.state = "running";
    this.startTime = performance.now();

    this.emit({ type: "start", timestamp: this.startTime });

    if (!this.element) {
      console.warn("No target element found for motion");
      this.state = "finished";
      this.emit({ type: "end", timestamp: performance.now() });
      return;
    }

    await this.animate();
  }

  pause(): void {
    if (this.state !== "running") return;

    this.state = "paused";
    this.pausedTime = performance.now();

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.emit({ type: "pause", timestamp: this.pausedTime });
  }

  resume(): void {
    if (this.state !== "paused") return;

    this.state = "running";
    const pauseDuration = performance.now() - this.pausedTime;
    this.startTime += pauseDuration;

    this.emit({ type: "resume", timestamp: performance.now() });
    this.animate();
  }

  stop(): void {
    if (this.state === "idle") return;

    this.state = "idle";

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.emit({ type: "cancel", timestamp: performance.now() });
  }

  cancel(): void {
    this.stop();
  }

  on(event: string, callback: EventListener): void {
    this.eventManager.on(event, callback);
  }

  off(event: string, callback: EventListener): void {
    this.eventManager.off(event, callback);
  }

  private emit(event: AnimationEvent): void {
    this.eventManager.emit(event);
  }

  private async animate(): Promise<void> {
    if (!this.element) return;

    const startTime = this.startTime;
    const duration = this.spec.duration;
    const delay = this.spec.delay || 0;
    const totalDuration = duration + delay;

    return new Promise((resolve) => {
      const animate = (currentTime: number) => {
        if (this.state !== "running") {
          resolve();
          return;
        }

        const elapsed = currentTime - startTime;

        // 지연 시간 처리
        if (elapsed < delay) {
          this.animationId = requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min((elapsed - delay) / duration, 1);
        const easedProgress = this.ease(progress);

        this.updateElement(easedProgress);

        if (progress >= 1) {
          this.state = "finished";
          this.emit({ type: "end", timestamp: currentTime });
          resolve();
        } else {
          this.animationId = requestAnimationFrame(animate);
        }
      };

      this.animationId = requestAnimationFrame(animate);
    });
  }

  private ease(progress: number): number {
    const easing = this.spec.easing;

    if (typeof easing === "string") {
      try {
        const easingConfig = getEasingConfig(easing);
        return this.applyEasing(progress, easingConfig);
      } catch {
        // 기본 이징 사용
        return progress;
      }
    } else {
      return this.applyEasing(progress, easing);
    }
  }

  private applyEasing(progress: number, easing: any): number {
    switch (easing.type) {
      case "spring":
        return this.springEase(progress, easing);
      case "cubic-bezier":
        return this.cubicBezierEase(progress, easing.values);
      case "linear":
        return progress;
      case "ease":
        return this.cubicBezierEase(progress, [0.25, 0.1, 0.25, 1]);
      case "ease-in":
        return this.cubicBezierEase(progress, [0.42, 0, 1, 1]);
      case "ease-out":
        return this.cubicBezierEase(progress, [0, 0, 0.58, 1]);
      case "ease-in-out":
        return this.cubicBezierEase(progress, [0.42, 0, 0.58, 1]);
      default:
        return progress;
    }
  }

  private springEase(progress: number, config: any): number {
    // 간단한 스프링 이징 구현
    const tension = config.tension || 200;
    const friction = config.friction || 25;

    // 실제 스프링 계산은 복잡하므로 간단한 근사치 사용
    return 1 - Math.pow(1 - progress, tension / 100);
  }

  private cubicBezierEase(
    progress: number,
    values: [number, number, number, number]
  ): number {
    // 간단한 베지어 곡선 근사치
    const [x1, y1, x2, y2] = values;

    // 실제 베지어 곡선 계산은 복잡하므로 간단한 근사치 사용
    const t = progress;
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return 3 * uu * t * y1 + 3 * u * tt * y2 + ttt;
  }

  private updateElement(progress: number): void {
    if (!this.element) return;

    const from = this.spec.from;
    const to = this.spec.to;
    const property = this.spec.property;

    let value: any;

    if (typeof from === "number" && typeof to === "number") {
      value = from + (to - from) * progress;
    } else if (typeof from === "string" && typeof to === "string") {
      // transform 속성 처리
      if (property === "transform") {
        value = this.interpolateTransform(from, to, progress);
      } else {
        value = to; // 간단한 문자열 보간은 복잡하므로 끝 값 사용
      }
    } else {
      value = to;
    }

    this.applyProperty(property, value);
  }

  private interpolateTransform(
    from: string,
    to: string,
    progress: number
  ): string {
    // 간단한 transform 보간 (실제로는 더 복잡한 파싱이 필요)
    if (from.includes("translateY") && to.includes("translateY")) {
      const fromValue = this.extractNumber(from);
      const toValue = this.extractNumber(to);
      const value = fromValue + (toValue - fromValue) * progress;
      return `translateY(${value}px)`;
    }

    if (from.includes("scale") && to.includes("scale")) {
      const fromValue = this.extractNumber(from);
      const toValue = this.extractNumber(to);
      const value = fromValue + (toValue - fromValue) * progress;
      return `scale(${value})`;
    }

    return to;
  }

  private extractNumber(str: string): number {
    const match = str.match(/-?\d+\.?\d*/);
    return match ? parseFloat(match[0]) : 0;
  }

  private applyProperty(property: string, value: any): void {
    if (!this.element) return;

    switch (property) {
      case "opacity":
        this.element.style.opacity = value.toString();
        break;
      case "transform":
        this.element.style.transform = value;
        break;
      case "backgroundColor":
        this.element.style.backgroundColor = value;
        break;
      case "color":
        this.element.style.color = value;
        break;
      case "width":
        this.element.style.width =
          typeof value === "number" ? `${value}px` : value;
        break;
      case "height":
        this.element.style.height =
          typeof value === "number" ? `${value}px` : value;
        break;
      default:
        (this.element.style as any)[property] = value;
    }
  }
}

// 랠리 구현 클래스
class RallyImpl implements Rally {
  public spec: RallySpec;
  public state: AnimationState = "idle";
  public motions: Motion[] = [];
  private eventManager = new EventManager();

  constructor(spec: RallySpec) {
    this.spec = spec;
    this.motions = spec.motions.map(
      (motionSpec) => new MotionImpl(motionSpec, spec.target)
    );
  }

  async start(): Promise<void> {
    if (this.state === "running") return;

    this.state = "running";
    this.emit({ type: "start", timestamp: performance.now() });

    if (this.spec.parallel) {
      // 병렬 실행
      await Promise.all(this.motions.map((motion) => motion.start()));
    } else {
      // 순차 실행
      for (const motion of this.motions) {
        await motion.start();
      }
    }

    this.state = "finished";
    this.emit({ type: "end", timestamp: performance.now() });
  }

  pause(): void {
    if (this.state !== "running") return;

    this.state = "paused";
    this.motions.forEach((motion) => motion.pause());
    this.emit({ type: "pause", timestamp: performance.now() });
  }

  resume(): void {
    if (this.state !== "paused") return;

    this.state = "running";
    this.motions.forEach((motion) => motion.resume());
    this.emit({ type: "resume", timestamp: performance.now() });
  }

  stop(): void {
    if (this.state === "idle") return;

    this.state = "idle";
    this.motions.forEach((motion) => motion.stop());
    this.emit({ type: "cancel", timestamp: performance.now() });
  }

  cancel(): void {
    this.stop();
  }

  on(event: string, callback: EventListener): void {
    this.eventManager.on(event, callback);
  }

  off(event: string, callback: EventListener): void {
    this.eventManager.off(event, callback);
  }

  private emit(event: AnimationEvent): void {
    this.eventManager.emit(event);
  }
}

// 타임라인 구현 클래스
class TimelineImpl implements Timeline {
  public spec: TimelineSpec;
  public state: AnimationState = "idle";
  public rallies: Rally[] = [];
  private eventManager = new EventManager();

  constructor(spec: TimelineSpec) {
    this.spec = spec;
    this.rallies = spec.rallies.map((rallySpec) => new RallyImpl(rallySpec));
  }

  async start(): Promise<void> {
    if (this.state === "running") return;

    this.state = "running";
    this.emit({ type: "start", timestamp: performance.now() });

    switch (this.spec.sequence) {
      case "parallel":
        await Promise.all(this.rallies.map((rally) => rally.start()));
        break;
      case "sequential":
        for (const rally of this.rallies) {
          await rally.start();
        }
        break;
      case "staggered":
        for (let i = 0; i < this.rallies.length; i++) {
          const rally = this.rallies[i];
          if (i > 0 && this.spec.staggerDelay) {
            await new Promise((resolve) =>
              setTimeout(resolve, this.spec.staggerDelay)
            );
          }
          if (rally) {
            await rally.start();
          }
        }
        break;
    }

    this.state = "finished";
    this.emit({ type: "end", timestamp: performance.now() });
  }

  pause(): void {
    if (this.state !== "running") return;

    this.state = "paused";
    this.rallies.forEach((rally) => rally.pause());
    this.emit({ type: "pause", timestamp: performance.now() });
  }

  resume(): void {
    if (this.state !== "paused") return;

    this.state = "running";
    this.rallies.forEach((rally) => rally.resume());
    this.emit({ type: "resume", timestamp: performance.now() });
  }

  stop(): void {
    if (this.state === "idle") return;

    this.state = "idle";
    this.rallies.forEach((rally) => rally.stop());
    this.emit({ type: "cancel", timestamp: performance.now() });
  }

  cancel(): void {
    this.stop();
  }

  on(event: string, callback: EventListener): void {
    this.eventManager.on(event, callback);
  }

  off(event: string, callback: EventListener): void {
    this.eventManager.off(event, callback);
  }

  private emit(event: AnimationEvent): void {
    this.eventManager.emit(event);
  }
}

// 애니메이션 엔진 구현
export class RallyAnimationEngine implements AnimationEngine {
  createMotion(spec: MotionSpec, target?: string | HTMLElement): Motion {
    return new MotionImpl(spec, target);
  }

  createRally(spec: RallySpec): Rally {
    return new RallyImpl(spec);
  }

  createTimeline(spec: TimelineSpec): Timeline {
    return new TimelineImpl(spec);
  }

  async play(timeline: Timeline): Promise<void> {
    await timeline.start();
  }

  pause(timeline: Timeline): void {
    timeline.pause();
  }

  resume(timeline: Timeline): void {
    timeline.resume();
  }

  stop(timeline: Timeline): void {
    timeline.stop();
  }

  cancel(timeline: Timeline): void {
    timeline.cancel();
  }
}

// 기본 엔진 인스턴스
export const rallyEngine = new RallyAnimationEngine();
