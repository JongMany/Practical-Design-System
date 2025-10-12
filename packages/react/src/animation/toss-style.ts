/**
 * Toss 스타일 애니메이션 API
 * 선언적이고 체이닝 가능한 애니메이션 시스템
 */

import {
  EasingType,
  TimelineMode,
  AnimationEndBehavior,
  TimelineModeMap,
  AnimationEndBehaviorMap,
  EasingMap,
} from "./enums";
import { rallyEngine } from "./engine";

// Toss 스타일 Motion 클래스
export class TossMotion {
  private spec: {
    duration?: number;
    easing?: EasingType;
    delay?: number;
    transition?: string;
    translateX?: { from?: number; to: number };
    translateY?: { from?: number; to: number };
    scale?: { from?: number; to: number };
    opacity?: { from?: number; to: number };
    rotate?: { from?: number; to: number };
    backgroundColor?: { from?: string; to: string };
    color?: { from?: string; to: string };
    width?: { from?: number; to: number };
    height?: { from?: number; to: number };
  } = {};

  constructor(duration?: number, easing?: EasingType) {
    if (duration !== undefined) this.spec.duration = duration;
    if (easing !== undefined) this.spec.easing = easing;
  }

  // 체이닝 메서드들
  translateX(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.translateX = { to: fromOrTo };
    } else {
      this.spec.translateX = fromOrTo;
    }
    return this;
  }

  translateY(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.translateY = { to: fromOrTo };
    } else {
      this.spec.translateY = fromOrTo;
    }
    return this;
  }

  scale(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.scale = { to: fromOrTo };
    } else {
      this.spec.scale = fromOrTo;
    }
    return this;
  }

  opacity(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.opacity = { to: fromOrTo };
    } else {
      this.spec.opacity = fromOrTo;
    }
    return this;
  }

  rotate(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.rotate = { to: fromOrTo };
    } else {
      this.spec.rotate = fromOrTo;
    }
    return this;
  }

  backgroundColor(
    fromOrTo: string | { from?: string; to: string }
  ): TossMotion {
    if (typeof fromOrTo === "string") {
      this.spec.backgroundColor = { to: fromOrTo };
    } else {
      this.spec.backgroundColor = fromOrTo;
    }
    return this;
  }

  color(fromOrTo: string | { from?: string; to: string }): TossMotion {
    if (typeof fromOrTo === "string") {
      this.spec.color = { to: fromOrTo };
    } else {
      this.spec.color = fromOrTo;
    }
    return this;
  }

  width(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.width = { to: fromOrTo };
    } else {
      this.spec.width = fromOrTo;
    }
    return this;
  }

  height(fromOrTo: number | { from?: number; to: number }): TossMotion {
    if (typeof fromOrTo === "number") {
      this.spec.height = { to: fromOrTo };
    } else {
      this.spec.height = fromOrTo;
    }
    return this;
  }

  transition(transitionValue: string): TossMotion {
    this.spec.transition = transitionValue;
    return this;
  }

  // 스펙 반환
  toSpec() {
    return {
      duration: this.spec.duration || 0.3,
      easing: this.spec.easing ? EasingMap[this.spec.easing] : "ease-out",
      delay: this.spec.delay,
      ...this.spec,
    };
  }
}

// Toss 스타일 Rally 클래스
export class TossRally {
  private target: string | HTMLElement;
  private playCount: number | "infinite";
  private endBehavior: AnimationEndBehavior;
  private motions: TossMotion[] = [];

  constructor(
    target: string | HTMLElement,
    playCount: number | "infinite" = 1,
    endBehavior: AnimationEndBehavior = AnimationEndBehavior.MAINTAIN
  ) {
    this.target = target;
    this.playCount = playCount;
    this.endBehavior = endBehavior;
  }

  // Motion 추가 메서드
  motion(duration?: number, easing?: EasingType): TossMotion {
    const motion = new TossMotion(duration, easing);
    this.motions.push(motion);
    return motion;
  }

  // 외부에서 motion을 추가할 수 있는 메서드
  addMotion(motion: TossMotion): void {
    this.motions.push(motion);
  }

  // 스펙 반환
  toSpec() {
    return {
      target: this.target,
      playCount: this.playCount,
      endBehavior: AnimationEndBehaviorMap[this.endBehavior],
      motions: this.motions.map((motion) => motion.toSpec()),
    };
  }

  // 애니메이션 실행
  async play() {
    const rally = rallyEngine.createRally(this.toSpec());
    return await rally.start();
  }

  // 역방향 애니메이션
  backward() {
    return new TossRallyBackward(this.toSpec());
  }
}

// 역방향 애니메이션 클래스
export class TossRallyBackward {
  private spec: any;

  constructor(spec: any) {
    this.spec = spec;
  }

  async play() {
    // 역방향으로 애니메이션 실행 - 실행 순서를 뒤집고 from과 to를 뒤바꿈
    console.log("🔍 Original spec:", this.spec);
    console.log("🔍 Original motions:", this.spec.motions);

    const reversedSpec = {
      ...this.spec,
      motions: this.spec.motions
        .slice()
        .reverse() // 실행 순서를 뒤집음
        .map((motion: any) => {
          const reversedMotion: any = {
            duration: motion.duration,
            easing: motion.easing,
            delay: motion.delay,
            transition: motion.transition,
          };

          // 각 속성의 from과 to를 뒤바꿈
          if (motion.translateX) {
            reversedMotion.translateX = {
              from: motion.translateX.to,
              to: motion.translateX.from || 0,
            };
          }
          if (motion.translateY) {
            reversedMotion.translateY = {
              from: motion.translateY.to,
              to: motion.translateY.from || 0,
            };
          }
          if (motion.scale) {
            reversedMotion.scale = {
              from: motion.scale.to,
              to: motion.scale.from || 1,
            };
          }
          if (motion.opacity) {
            reversedMotion.opacity = {
              from: motion.opacity.to,
              to: motion.opacity.from || 1,
            };
          }
          if (motion.rotate) {
            reversedMotion.rotate = {
              from: motion.rotate.to,
              to: motion.rotate.from || 0,
            };
          }
          if (motion.backgroundColor) {
            reversedMotion.backgroundColor = {
              from: motion.backgroundColor.to,
              to: motion.backgroundColor.from || "",
            };
          }
          if (motion.color) {
            reversedMotion.color = {
              from: motion.color.to,
              to: motion.color.from || "",
            };
          }
          if (motion.width) {
            reversedMotion.width = {
              from: motion.width.to,
              to: motion.width.from || 0,
            };
          }
          if (motion.height) {
            reversedMotion.height = {
              from: motion.height.to,
              to: motion.height.from || 0,
            };
          }

          return reversedMotion;
        }),
    };

    console.log("🔄 Reversed spec:", reversedSpec);
    console.log("🔄 Reversed motions:", reversedSpec.motions);

    const rally = rallyEngine.createRally(reversedSpec);
    return await rally.start();
  }
}

// 역방향 Timeline 애니메이션 클래스
export class TossTimelineBackward {
  private spec: any;

  constructor(spec: any) {
    this.spec = spec;
  }

  async play() {
    // Timeline의 rallies 배열을 역순으로 하고, 각 Rally의 motions도 역순으로 처리
    const reversedSpec = {
      ...this.spec,
      rallies: this.spec.rallies
        .slice()
        .reverse() // Rally 순서를 뒤집음
        .map((rallySpec: any) => ({
          ...rallySpec,
          motions: rallySpec.motions
            .slice()
            .reverse() // 각 Rally의 motions 순서도 뒤집음
            .map((motion: any) => ({
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
        })),
    };

    const timeline = rallyEngine.createTimeline(reversedSpec);
    return await timeline.start();
  }
}

// Toss 스타일 Timeline 클래스
export class TossTimeline {
  private playback: TimelineMode | { type: "stagger"; staggerDelay: number };
  public rallies: (TossRally | TossTimeline)[] = [];

  constructor(
    playback: TimelineMode | { type: "stagger"; staggerDelay: number }
  ) {
    this.playback = playback;
  }

  // Rally 추가 메서드
  rally(
    target: string | HTMLElement,
    playCount: number | "infinite" = 1,
    endBehavior: "maintain" | "reset" | "reverse" = "maintain"
  ): TossRally {
    const rally = new TossRally(target, playCount, endBehavior);
    this.rallies.push(rally);
    return rally;
  }

  // Timeline 추가 메서드 (중첩 Timeline 지원)
  timeline(
    playback: "serial" | "parallel" | { type: "stagger"; staggerDelay: number }
  ): TossTimeline {
    const timeline = new TossTimeline(playback);
    this.rallies.push(timeline);
    return timeline;
  }

  // 스펙 반환
  toSpec(): any {
    // TimelineMode를 문자열로 변환
    let playback: string | { type: "stagger"; staggerDelay: number };
    if (typeof this.playback === "string") {
      playback = this.playback;
    } else if (
      this.playback &&
      typeof this.playback === "object" &&
      "type" in this.playback
    ) {
      playback = this.playback;
    } else {
      playback = TimelineModeMap[this.playback as TimelineMode];
    }

    return {
      playback,
      rallies: this.rallies.map((item) => {
        if (item instanceof TossRally) {
          return item.toSpec();
        } else {
          // TossTimeline인 경우
          return item.toSpec();
        }
      }),
    };
  }

  // 애니메이션 실행
  async play() {
    const timeline = rallyEngine.createTimeline(this.toSpec());
    return await timeline.start();
  }

  // 역방향 애니메이션
  backward() {
    return new TossTimelineBackward(this.toSpec());
  }
}

// Rally React 스타일 API
export function Rally(
  target: string | HTMLElement,
  playCount: number | "infinite" = 1,
  motions?: Array<{
    easing?: EasingType;
    duration?: number;
    delay?: number;
    transition?: string;
    translateX?: { from?: number; to: number };
    translateY?: { from?: number; to: number };
    scale?: { from?: number; to: number };
    opacity?: { from?: number; to: number };
    rotate?: { from?: number; to: number };
    backgroundColor?: { from?: string; to: string };
    color?: { from?: string; to: string };
    width?: { from?: number; to: number };
    height?: { from?: number; to: number };
  }>,
  endBehavior: AnimationEndBehavior = AnimationEndBehavior.MAINTAIN
): TossRally {
  const rally = new TossRally(target, playCount, endBehavior);

  if (motions) {
    // Rally React 스타일: motions 배열을 직접 받아서 처리
    motions.forEach((motionSpec) => {
      const motion = new TossMotion(motionSpec.duration, motionSpec.easing);

      // 각 속성을 motion에 추가
      if (motionSpec.translateX) motion.translateX(motionSpec.translateX);
      if (motionSpec.translateY) motion.translateY(motionSpec.translateY);
      if (motionSpec.scale) motion.scale(motionSpec.scale);
      if (motionSpec.opacity) motion.opacity(motionSpec.opacity);
      if (motionSpec.rotate) motion.rotate(motionSpec.rotate);
      if (motionSpec.backgroundColor)
        motion.backgroundColor(motionSpec.backgroundColor);
      if (motionSpec.color) motion.color(motionSpec.color);
      if (motionSpec.width) motion.width(motionSpec.width);
      if (motionSpec.height) motion.height(motionSpec.height);
      if (motionSpec.transition) motion.transition(motionSpec.transition);

      rally.addMotion(motion);
    });
  }

  return rally;
}

// Rally React 스타일 Timeline API - Rally들을 속성으로 받는 방식
export function Timeline(
  playback: TimelineMode | { type: "stagger"; staggerDelay: number },
  rallies?: (TossRally | TossTimeline)[]
): TossTimeline {
  const timeline = new TossTimeline(playback);

  if (rallies) {
    timeline.rallies = rallies;
  }

  return timeline;
}

// 편의 함수들
export function Motion(duration?: number, easing?: EasingType): TossMotion {
  return new TossMotion(duration, easing);
}

// 이징 상수들
export const Bezier = {
  out: EasingType.BEZIER_OUT,
  in: EasingType.BEZIER_IN,
  inOut: EasingType.BEZIER_IN_OUT,
};

export const Spring = {
  basic: EasingType.SPRING_BASIC,
  large: EasingType.SPRING_LARGE,
  quick: EasingType.SPRING_QUICK,
  gentle: EasingType.SPRING_GENTLE,
  wobbly: EasingType.SPRING_WOBBLY,
  stiff: EasingType.SPRING_STIFF,
};

export const Ease = {
  linear: EasingType.LINEAR,
  ease: EasingType.EASE,
  easeIn: EasingType.EASE_IN,
  easeOut: EasingType.EASE_OUT,
  easeInOut: EasingType.EASE_IN_OUT,
};

// Stagger delay 상수들
export const Stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
  verySlow: 0.3,
};
