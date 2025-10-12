/**
 * Rally Animation Engine
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 엔진
 */

import React from "react";
import type {
  AnimationEngine,
  AnimationEvent,
  Motion,
  MotionSpec,
  Rally,
  RallySpec,
  Timeline,
  TimelineSpec,
  RallyFunction,
  TimelineFunction,
} from "./types";
import { AnimationEndBehavior, AnimationState } from "./enums";

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

// Toss 스타일 모션 구현 클래스
class MotionImpl implements Motion {
  public spec: MotionSpec;
  public state: AnimationState = AnimationState.IDLE;
  private eventManager = new EventManager();
  private animationId: number | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private element: HTMLElement | null = null;
  private initialValues: Map<string, any> = new Map();

  constructor(spec: MotionSpec, target?: string | HTMLElement) {
    this.spec = spec;

    if (target) {
      if (typeof target === "string") {
        this.element = document.querySelector(target) as HTMLElement;
        if (!this.element) {
          console.warn(
            `Motion: Target element not found for selector "${target}"`
          );
        }
      } else {
        this.element = target;
      }

      if (this.element) {
        try {
          this.saveInitialValues();
        } catch (error) {
          console.error("Motion: Error saving initial values:", error);
        }
      }
    }
  }

  private saveInitialValues(): void {
    if (!this.element) return;

    // 각 속성의 초기값 저장
    const computedStyle = getComputedStyle(this.element);

    if (this.spec.translateX) {
      const transform = computedStyle.transform;
      const matrix = new DOMMatrix(transform);
      this.initialValues.set("translateX", matrix.m41);
    }

    if (this.spec.translateY) {
      const transform = computedStyle.transform;
      const matrix = new DOMMatrix(transform);
      this.initialValues.set("translateY", matrix.m42);
    }

    if (this.spec.scale) {
      const transform = computedStyle.transform;
      const matrix = new DOMMatrix(transform);
      this.initialValues.set("scale", matrix.a);
    }

    if (this.spec.opacity) {
      this.initialValues.set("opacity", parseFloat(computedStyle.opacity));
    }

    if (this.spec.rotate) {
      const transform = computedStyle.transform;
      const matrix = new DOMMatrix(transform);
      this.initialValues.set(
        "rotate",
        Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)
      );
    }

    if (this.spec.backgroundColor) {
      this.initialValues.set("backgroundColor", computedStyle.backgroundColor);
    }

    if (this.spec.color) {
      this.initialValues.set("color", computedStyle.color);
    }

    if (this.spec.width) {
      this.initialValues.set("width", parseFloat(computedStyle.width));
    }

    if (this.spec.height) {
      this.initialValues.set("height", parseFloat(computedStyle.height));
    }

    if (this.spec.borderRadius) {
      this.initialValues.set("borderRadius", computedStyle.borderRadius);
    }
  }

  async start(): Promise<void> {
    if (this.state === AnimationState.RUNNING) return;

    this.state = AnimationState.RUNNING;
    this.startTime = performance.now();

    this.emit({ type: "start", timestamp: this.startTime });

    if (!this.element) {
      console.warn("No target element found for motion");
      this.state = AnimationState.FINISHED;
      this.emit({ type: "end", timestamp: performance.now() });
      return;
    }

    await this.animate();
  }

  pause(): void {
    if (this.state !== AnimationState.RUNNING) return;

    this.state = AnimationState.PAUSED;
    this.pausedTime = performance.now();

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.emit({ type: "pause", timestamp: this.pausedTime });
  }

  resume(): void {
    if (this.state !== AnimationState.PAUSED) return;

    this.state = AnimationState.RUNNING;
    const pauseDuration = performance.now() - this.pausedTime;
    this.startTime += pauseDuration;

    this.emit({ type: "resume", timestamp: performance.now() });
    this.animate();
  }

  stop(): void {
    if (this.state === AnimationState.IDLE) return;

    this.state = AnimationState.IDLE;

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
    const duration = this.spec.duration * 1000; // 초를 밀리초로 변환
    const delay = (this.spec.delay || 0) * 1000; // 초를 밀리초로 변환

    return new Promise((resolve) => {
      const animate = (currentTime: number) => {
        if (this.state !== AnimationState.RUNNING) {
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

        this.updateElementTossStyle(easedProgress);

        if (progress >= 1) {
          this.state = AnimationState.FINISHED;
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
      // 기본 이징 사용
      return this.applyEasing(progress, { type: easing as any });
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

    if (from.includes("rotate") && to.includes("rotate")) {
      const fromValue = this.extractNumber(from);
      const toValue = this.extractNumber(to);
      const value = fromValue + (toValue - fromValue) * progress;
      return `rotate(${value}deg)`;
    }

    return to;
  }

  private extractNumber(str: string): number {
    const match = str.match(/-?\d+\.?\d*/);
    return match ? parseFloat(match[0]) : 0;
  }

  // 색상 보간 함수
  private interpolateColor(from: string, to: string, progress: number): string {
    // 간단한 색상 보간 (hex 색상만 지원)
    if (from.startsWith("#") && to.startsWith("#")) {
      const fromRgb = this.hexToRgb(from);
      const toRgb = this.hexToRgb(to);

      if (fromRgb && toRgb) {
        const r = Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * progress);
        const g = Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * progress);
        const b = Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * progress);
        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    // 기본적으로 to 색상 반환
    return to;
  }

  // hex 색상을 RGB로 변환
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result && result[1] && result[2] && result[3]
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private updateElementTossStyle(progress: number): void {
    if (!this.element) return;

    const transforms: string[] = [];
    let currentTransform = this.element.style.transform || "";

    // 기존 transform 파싱
    const existingTransforms = this.parseTransform(currentTransform || "");
    const newTransforms: Record<string, number> = {};

    // translateX 처리
    if (this.spec.translateX) {
      const from =
        this.spec.translateX.from ?? this.initialValues.get("translateX") ?? 0;
      const to = this.spec.translateX.to;
      const value = from + (to - from) * progress;
      newTransforms.translateX = value;
    } else if (existingTransforms.translateX !== undefined) {
      newTransforms.translateX = existingTransforms.translateX;
    }

    // translateY 처리
    if (this.spec.translateY) {
      const from =
        this.spec.translateY.from ?? this.initialValues.get("translateY") ?? 0;
      const to = this.spec.translateY.to;
      const value = from + (to - from) * progress;
      newTransforms.translateY = value;
    } else if (existingTransforms.translateY !== undefined) {
      newTransforms.translateY = existingTransforms.translateY;
    }

    // scale 처리
    if (this.spec.scale) {
      const from = this.spec.scale.from ?? this.initialValues.get("scale") ?? 1;
      const to = this.spec.scale.to;
      const value = from + (to - from) * progress;
      newTransforms.scale = value;
    } else if (existingTransforms.scale !== undefined) {
      newTransforms.scale = existingTransforms.scale;
    }

    // rotate 처리
    if (this.spec.rotate) {
      const from =
        this.spec.rotate.from ?? this.initialValues.get("rotate") ?? 0;
      const to = this.spec.rotate.to;
      const value = from + (to - from) * progress;
      newTransforms.rotate = value;
    } else if (existingTransforms.rotate !== undefined) {
      newTransforms.rotate = existingTransforms.rotate;
    }

    // Transform 속성들을 순서대로 적용
    if (newTransforms.translateX !== undefined) {
      transforms.push(`translateX(${newTransforms.translateX}px)`);
    }
    if (newTransforms.translateY !== undefined) {
      transforms.push(`translateY(${newTransforms.translateY}px)`);
    }
    if (newTransforms.scale !== undefined) {
      transforms.push(`scale(${newTransforms.scale})`);
    }
    if (newTransforms.rotate !== undefined) {
      transforms.push(`rotate(${newTransforms.rotate}deg)`);
    }

    // transform 적용
    if (transforms.length > 0) {
      this.element.style.transform = transforms.join(" ");
    }

    // opacity 처리
    if (this.spec.opacity) {
      const from =
        this.spec.opacity.from ?? this.initialValues.get("opacity") ?? 1;
      const to = this.spec.opacity.to;
      const value = from + (to - from) * progress;
      this.element.style.opacity = value.toString();
    }

    // backgroundColor 처리
    if (this.spec.backgroundColor) {
      const from =
        this.spec.backgroundColor.from ??
        this.initialValues.get("backgroundColor") ??
        "";
      const to = this.spec.backgroundColor.to;
      // 색상 보간 적용
      if (from && to) {
        const interpolatedColor = this.interpolateColor(from, to, progress);
        this.element.style.backgroundColor = interpolatedColor;
      } else {
        this.element.style.backgroundColor = to;
      }
    }

    // color 처리
    if (this.spec.color) {
      const from =
        this.spec.color.from ?? this.initialValues.get("color") ?? "";
      const to = this.spec.color.to;
      // 색상 보간 적용
      if (from && to) {
        const interpolatedColor = this.interpolateColor(from, to, progress);
        this.element.style.color = interpolatedColor;
      } else {
        this.element.style.color = to;
      }
    }

    // width 처리
    if (this.spec.width) {
      const from = this.spec.width.from ?? this.initialValues.get("width") ?? 0;
      const to = this.spec.width.to;
      const value = from + (to - from) * progress;
      this.element.style.width = `${value}px`;
    }

    // height 처리
    if (this.spec.height) {
      const from =
        this.spec.height.from ?? this.initialValues.get("height") ?? 0;
      const to = this.spec.height.to;
      const value = from + (to - from) * progress;
      this.element.style.height = `${value}px`;
    }

    // borderRadius 처리
    if (this.spec.borderRadius) {
      const from =
        this.spec.borderRadius.from ??
        this.initialValues.get("borderRadius") ??
        "0px";
      const to = this.spec.borderRadius.to;
      // borderRadius는 문자열이므로 간단한 보간은 어려우므로 단계별로 처리
      if (progress < 0.5) {
        this.element.style.borderRadius = from;
      } else {
        this.element.style.borderRadius = to;
      }
    }

    // transition 처리
    if (this.spec.transition) {
      this.element.style.transition = this.spec.transition;
    }
  }

  private parseTransform(transform: string): Record<string, number> {
    const result: Record<string, number> = {};

    if (!transform) return result;

    // translateX 파싱
    const translateXMatch = transform.match(/translateX\(([^)]+)\)/);
    if (translateXMatch && translateXMatch[1]) {
      result.translateX = parseFloat(translateXMatch[1]);
    }

    // translateY 파싱
    const translateYMatch = transform.match(/translateY\(([^)]+)\)/);
    if (translateYMatch && translateYMatch[1]) {
      result.translateY = parseFloat(translateYMatch[1]);
    }

    // scale 파싱 (scale(x) 또는 scale(x, y) 형태)
    const scaleMatch = transform.match(/scale\(([^)]+)\)/);
    if (scaleMatch && scaleMatch[1]) {
      const scaleValues = scaleMatch[1]
        .split(",")
        .map((v) => parseFloat(v.trim()));
      result.scale = scaleValues[0] || 1;
    }

    // rotate 파싱
    const rotateMatch = transform.match(/rotate\(([^)]+)\)/);
    if (rotateMatch && rotateMatch[1]) {
      result.rotate = parseFloat(rotateMatch[1]);
    }

    return result;
  }

  // Transform 속성을 안전하게 병합하는 함수
  private mergeTransforms(
    existingTransforms: Record<string, number>,
    newTransforms: Record<string, number>
  ): Record<string, number> {
    return {
      ...existingTransforms,
      ...newTransforms,
    };
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

// Toss 스타일 랠리 구현 클래스
class RallyImpl implements Rally {
  public spec: RallySpec;
  public state: AnimationState = AnimationState.IDLE;
  public motions: Motion[] = [];
  private eventManager = new EventManager();
  private element: HTMLElement | null = null;
  private initialStyles: Record<string, string> = {}; // 초기 스타일 상태 저장

  constructor(spec: RallySpec) {
    this.spec = spec;

    // 타겟 요소 찾기
    if (typeof spec.target === "string") {
      this.element = document.querySelector(spec.target) as HTMLElement;
      if (!this.element) {
        console.warn(
          `Rally: Target element not found for selector "${spec.target}"`
        );
      }
    } else {
      this.element = spec.target;
    }

    // 초기 스타일 상태 저장
    if (this.element) {
      this.saveInitialStyles();
    }

    // 모션들 생성 (안전성 검사 추가)
    if (!spec.motions || !Array.isArray(spec.motions)) {
      console.warn("Rally: No motions provided or motions is not an array");
      this.motions = [];
    } else {
      this.motions = spec.motions
        .map((motionSpec, index) => {
          try {
            return new MotionImpl(motionSpec, this.element || undefined);
          } catch (error) {
            console.error(
              `Rally: Error creating motion at index ${index}:`,
              error
            );
            return null;
          }
        })
        .filter(Boolean) as Motion[];
    }
  }

  async start(): Promise<void> {
    if (this.state === AnimationState.RUNNING) {
      console.warn(
        "Rally: Animation is already running, ignoring start request"
      );
      return;
    }

    // 이전 애니메이션이 있다면 정리
    if (this.state === AnimationState.PAUSED) {
      this.stop();
    }

    this.state = AnimationState.RUNNING;
    this.emit({ type: "start", timestamp: performance.now() });

    if (!this.element) {
      console.warn("No target element found for rally");
      this.state = AnimationState.FINISHED;
      this.emit({ type: "end", timestamp: performance.now() });
      return;
    }

    // playCount 처리
    const playCount = this.spec.playCount || 1;
    const isInfinite = playCount === "infinite";

    let currentPlay = 0;

    while (isInfinite || currentPlay < playCount) {
      // 모션들을 순차적으로 실행
      for (const motion of this.motions) {
        try {
          await motion.start();
        } catch (error) {
          console.error("Rally: Error executing motion:", error);
          // 개별 모션 에러가 발생해도 전체 애니메이션은 계속 진행
        }
      }

      currentPlay++;

      // 무한 반복이 아니고 마지막 반복이면 종료
      if (!isInfinite && currentPlay >= playCount) {
        break;
      }
    }

    this.state = AnimationState.FINISHED;
    this.emit({ type: "end", timestamp: performance.now() });

    // endBehavior 처리
    const endBehavior = this.spec.endBehavior || AnimationEndBehavior.MAINTAIN;
    if (endBehavior === AnimationEndBehavior.RESET) {
      // 즉시 초기 상태로 리셋 (애니메이션 없이)
      this.reset();
    } else if (endBehavior === AnimationEndBehavior.REVERSE) {
      // 역재생 애니메이션으로 초기 상태로 되돌아가기
      // 상태를 다시 running으로 변경
      this.state = AnimationState.RUNNING;
      await this.reverseAnimation();
      this.state = AnimationState.FINISHED;
    }
    // "maintain"은 기본값이므로 별도 처리 불필요
  }

  pause(): void {
    if (this.state !== AnimationState.RUNNING) return;

    this.state = AnimationState.PAUSED;
    this.motions.forEach((motion) => motion.pause());
    this.emit({ type: "pause", timestamp: performance.now() });
  }

  resume(): void {
    if (this.state !== AnimationState.PAUSED) return;

    this.state = AnimationState.RUNNING;
    this.motions.forEach((motion) => motion.resume());
    this.emit({ type: "resume", timestamp: performance.now() });
  }

  stop(): void {
    if (this.state === AnimationState.IDLE) return;

    this.state = AnimationState.IDLE;
    this.motions.forEach((motion) => motion.stop());
    this.emit({ type: "cancel", timestamp: performance.now() });
  }

  cancel(): void {
    this.stop();
  }

  backward(): Rally {
    // 역방향 애니메이션을 위한 새로운 Rally 인스턴스 생성
    const reversedSpec = {
      ...this.spec,
      motions: this.spec.motions
        .slice()
        .reverse()
        .map((motionSpec) => ({
          ...motionSpec,
          // from과 to를 뒤바꿈
          translateX: motionSpec.translateX
            ? {
                from: motionSpec.translateX.to,
                to: motionSpec.translateX.from ?? 0,
              }
            : undefined,
          translateY: motionSpec.translateY
            ? {
                from: motionSpec.translateY.to,
                to: motionSpec.translateY.from ?? 0,
              }
            : undefined,
          scale: motionSpec.scale
            ? { from: motionSpec.scale.to, to: motionSpec.scale.from ?? 1 }
            : undefined,
          opacity: motionSpec.opacity
            ? { from: motionSpec.opacity.to, to: motionSpec.opacity.from ?? 1 }
            : undefined,
          rotate: motionSpec.rotate
            ? { from: motionSpec.rotate.to, to: motionSpec.rotate.from ?? 0 }
            : undefined,
          backgroundColor: motionSpec.backgroundColor
            ? {
                from: motionSpec.backgroundColor.to,
                to: motionSpec.backgroundColor.from ?? "",
              }
            : undefined,
          color: motionSpec.color
            ? { from: motionSpec.color.to, to: motionSpec.color.from ?? "" }
            : undefined,
          width: motionSpec.width
            ? { from: motionSpec.width.to, to: motionSpec.width.from ?? 0 }
            : undefined,
          height: motionSpec.height
            ? { from: motionSpec.height.to, to: motionSpec.height.from ?? 0 }
            : undefined,
        })),
    };

    return new RallyImpl(reversedSpec);
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

  // 초기 스타일 상태 저장
  private saveInitialStyles(): void {
    if (!this.element) return;

    const computedStyle = window.getComputedStyle(this.element);
    this.initialStyles = {
      opacity: computedStyle.opacity,
      transform: computedStyle.transform,
      backgroundColor: computedStyle.backgroundColor,
      color: computedStyle.color,
      width: computedStyle.width,
      height: computedStyle.height,
      borderRadius: computedStyle.borderRadius,
      transition: this.element.style.transition || "",
    };
  }

  // 초기 스타일 상태로 복원
  private restoreInitialStyles(): void {
    if (!this.element) return;

    // transition을 일시적으로 비활성화하여 즉시 리셋
    const originalTransition = this.element.style.transition;
    this.element.style.transition = "none";

    // 저장된 초기 스타일로 복원
    Object.entries(this.initialStyles).forEach(([property, value]) => {
      if (property === "transition") return; // transition은 나중에 복원
      (this.element!.style as any)[property] = value;
    });

    // 강제 리플로우
    void this.element.offsetHeight;

    // transition 복원
    this.element.style.transition = originalTransition;
  }

  // 초기 상태로 리셋
  reset(): void {
    if (!this.element) return;

    // 1. 먼저 현재 실행 중인 애니메이션을 완전히 중지
    this.stop();

    // 2. 저장된 초기 스타일로 완전히 복원
    this.restoreInitialStyles();

    // 3. 상태를 IDLE로 리셋하고 reset 이벤트 발생
    this.state = AnimationState.IDLE;
    this.emit({ type: "reset", timestamp: performance.now() });
  }

  // 역방향 애니메이션 실행
  private async reverseAnimation(): Promise<void> {
    if (!this.element) return;

    console.log("🔄 Starting reverse animation for element:", this.element);
    console.log("🔄 Original spec:", this.spec);

    // 역방향 Rally를 생성하여 실행
    const reversedSpec: RallySpec = {
      target: this.element, // target을 현재 element로 설정
      playCount: 1, // 한 번만 실행
      endBehavior: AnimationEndBehavior.MAINTAIN, // reverse는 maintain으로 설정 (무한 루프 방지)
      motions: this.spec.motions
        .slice()
        .reverse()
        .map((motionSpec) => {
          const reversedMotion = { ...motionSpec };

          // from과 to를 뒤바꿈
          if (motionSpec.translateX) {
            reversedMotion.translateX = {
              from: motionSpec.translateX.to,
              to: motionSpec.translateX.from ?? 0,
            };
          }

          if (motionSpec.translateY) {
            reversedMotion.translateY = {
              from: motionSpec.translateY.to,
              to: motionSpec.translateY.from ?? 0,
            };
          }

          if (motionSpec.scale) {
            reversedMotion.scale = {
              from: motionSpec.scale.to,
              to: motionSpec.scale.from ?? 1,
            };
          }

          if (motionSpec.opacity) {
            reversedMotion.opacity = {
              from: motionSpec.opacity.to,
              to: motionSpec.opacity.from ?? 0, // opacity의 기본값은 0 (투명)
            };
          }

          if (motionSpec.rotate) {
            reversedMotion.rotate = {
              from: motionSpec.rotate.to,
              to: motionSpec.rotate.from ?? 0,
            };
          }

          if (motionSpec.backgroundColor) {
            reversedMotion.backgroundColor = {
              from: motionSpec.backgroundColor.to,
              to: motionSpec.backgroundColor.from ?? "",
            };
          }

          if (motionSpec.color) {
            reversedMotion.color = {
              from: motionSpec.color.to,
              to: motionSpec.color.from ?? "",
            };
          }

          if (motionSpec.width) {
            reversedMotion.width = {
              from: motionSpec.width.to,
              to: motionSpec.width.from ?? 0,
            };
          }

          if (motionSpec.height) {
            reversedMotion.height = {
              from: motionSpec.height.to,
              to: motionSpec.height.from ?? 0,
            };
          }

          if (motionSpec.borderRadius) {
            reversedMotion.borderRadius = {
              from: motionSpec.borderRadius.to,
              to: motionSpec.borderRadius.from ?? "0px",
            };
          }

          return reversedMotion;
        }),
    };

    console.log("🔄 Reversed spec:", reversedSpec);

    // 새로운 Rally 인스턴스를 생성하여 역방향 애니메이션 실행
    const reverseRally = new RallyImpl(reversedSpec);
    await reverseRally.start();

    console.log("🔄 Reverse animation completed");
  }
}

// Toss 스타일 타임라인 구현 클래스
class TimelineImpl implements Timeline {
  public spec: TimelineSpec;
  public state: AnimationState = AnimationState.IDLE;
  public rallies: (Rally | Timeline)[] = [];
  private eventManager = new EventManager();

  constructor(spec: TimelineSpec) {
    this.spec = spec;

    if (!spec.rallies || !Array.isArray(spec.rallies)) {
      console.warn("Timeline: No rallies provided or rallies is not an array");
      this.rallies = [];
    } else {
      this.rallies = spec.rallies
        .map((item, index) => {
          try {
            // RallySpec인지 TimelineSpec인지 구분
            if ("target" in item && "motions" in item) {
              // RallySpec인 경우
              return new RallyImpl(item as RallySpec);
            } else {
              // TimelineSpec인 경우 (중첩된 Timeline)
              return new TimelineImpl(item as TimelineSpec);
            }
          } catch (error) {
            console.error(
              `Timeline: Error creating rally/timeline at index ${index}:`,
              error
            );
            return null;
          }
        })
        .filter(Boolean) as (Rally | Timeline)[];
    }
  }

  async start(): Promise<void> {
    if (this.state === AnimationState.RUNNING) {
      console.warn(
        "Timeline: Animation is already running, ignoring start request"
      );
      return;
    }

    // 이전 애니메이션이 있다면 정리
    if (this.state === AnimationState.PAUSED) {
      this.stop();
    }

    this.state = AnimationState.RUNNING;
    this.emit({ type: "start", timestamp: performance.now() });

    switch (this.spec.playback) {
      case "parallel":
        try {
          await Promise.all(
            this.rallies.map((rally) => {
              if (rally) {
                return rally.start();
              }
              return Promise.resolve();
            })
          );
        } catch (error) {
          console.error("Timeline: Error in parallel execution:", error);
        }
        break;
      case "serial":
        for (const rally of this.rallies) {
          if (rally) {
            try {
              await rally.start();
            } catch (error) {
              console.error("Timeline: Error in serial execution:", error);
              // 개별 rally 에러가 발생해도 다음 rally는 계속 실행
            }
          }
        }
        break;
      default:
        // stagger 타입
        if (
          typeof this.spec.playback === "object" &&
          this.spec.playback.type === "stagger"
        ) {
          const staggerPlayback = this.spec.playback;
          for (let i = 0; i < this.rallies.length; i++) {
            const rally = this.rallies[i];
            if (i > 0) {
              await new Promise(
                (resolve) =>
                  setTimeout(resolve, staggerPlayback.staggerDelay * 1000) // 초를 밀리초로 변환
              );
            }
            if (rally) {
              try {
                await rally.start();
              } catch (error) {
                console.error(
                  `Timeline: Error in stagger execution at index ${i}:`,
                  error
                );
                // 개별 rally 에러가 발생해도 다음 rally는 계속 실행
              }
            }
          }
        }
        break;
    }

    this.state = AnimationState.FINISHED;
    this.emit({ type: "end", timestamp: performance.now() });
  }

  pause(): void {
    if (this.state !== AnimationState.RUNNING) return;

    this.state = AnimationState.PAUSED;
    this.rallies.forEach((rally) => rally.pause());
    this.emit({ type: "pause", timestamp: performance.now() });
  }

  resume(): void {
    if (this.state !== AnimationState.PAUSED) return;

    this.state = AnimationState.RUNNING;
    this.rallies.forEach((rally) => rally.resume());
    this.emit({ type: "resume", timestamp: performance.now() });
  }

  stop(): void {
    if (this.state === AnimationState.IDLE) return;

    this.state = AnimationState.IDLE;
    this.rallies.forEach((rally) => rally.stop());
    this.emit({ type: "cancel", timestamp: performance.now() });
  }

  cancel(): void {
    this.stop();
  }

  reset(): void {
    // 1. 먼저 현재 실행 중인 Timeline을 완전히 중지
    this.stop();

    // 2. 모든 Rally와 Timeline을 리셋 (이미 stop이 호출되었으므로 각각의 reset만 호출)
    this.rallies.forEach((rally) => {
      rally.reset();
    });

    // 3. Timeline 상태를 IDLE로 리셋하고 reset 이벤트 발생
    this.state = AnimationState.IDLE;
    this.emit({ type: "reset", timestamp: performance.now() });
  }

  backward(): Timeline {
    // 역방향 애니메이션을 위한 새로운 Timeline 인스턴스 생성
    const reversedSpec = {
      ...this.spec,
      rallies: this.spec.rallies
        .slice()
        .reverse()
        .map((rallySpec) => {
          if ("target" in rallySpec && "motions" in rallySpec) {
            // RallySpec인 경우
            return {
              ...rallySpec,
              motions: rallySpec.motions
                .slice()
                .reverse()
                .map((motion) => ({
                  ...motion,
                  // from과 to를 뒤바꿈
                  translateX: motion.translateX
                    ? {
                        from: motion.translateX.to,
                        to: motion.translateX.from || 0,
                      }
                    : undefined,
                  translateY: motion.translateY
                    ? {
                        from: motion.translateY.to,
                        to: motion.translateY.from || 0,
                      }
                    : undefined,
                  scale: motion.scale
                    ? { from: motion.scale.to, to: motion.scale.from || 1 }
                    : undefined,
                  opacity: motion.opacity
                    ? { from: motion.opacity.to, to: motion.opacity.from || 1 }
                    : undefined,
                  rotate: motion.rotate
                    ? { from: motion.rotate.to, to: motion.rotate.from || 0 }
                    : undefined,
                  backgroundColor: motion.backgroundColor
                    ? {
                        from: motion.backgroundColor.to,
                        to: motion.backgroundColor.from || "",
                      }
                    : undefined,
                  color: motion.color
                    ? { from: motion.color.to, to: motion.color.from || "" }
                    : undefined,
                  width: motion.width
                    ? { from: motion.width.to, to: motion.width.from || 0 }
                    : undefined,
                  height: motion.height
                    ? { from: motion.height.to, to: motion.height.from || 0 }
                    : undefined,
                })),
            };
          } else {
            // TimelineSpec인 경우 (중첩된 Timeline)
            return rallySpec;
          }
        }),
    };

    return new TimelineImpl(reversedSpec);
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

  reset(timeline: Timeline): void {
    timeline.reset();
  }

  // Toss 스타일 API 함수들
  Rally(spec: RallySpec): Rally {
    return this.createRally(spec);
  }

  Timeline(spec: TimelineSpec): Timeline {
    return this.createTimeline(spec);
  }
}

// 기본 엔진 인스턴스
export const rallyEngine = new RallyAnimationEngine();
