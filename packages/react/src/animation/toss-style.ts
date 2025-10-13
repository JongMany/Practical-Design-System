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
import {
  reverseProperty,
  reverseMotionSpec,
  reverseRallySpec,
  reverseTimelineSpec,
  findElement,
  collectAllRallies,
  executeTimelineEndBehavior,
  fadeOutRallies,
  getDefaultTimelineOptions,
  saveInitialState,
  ANIMATION_CONSTANTS,
} from "./utils";
import type {
  NumericPropertySpec,
  StringPropertySpec,
  MotionSpec,
  RallySpec,
  TimelineSpec,
  TimelineEndBehavior,
  TimelineOptions,
} from "./types";

// Toss 스타일 Motion 클래스 - 타입 안전성 강화
export class TossMotion {
  private spec: {
    duration?: number;
    easing?: EasingType;
    delay?: number;
    transition?: string;
    // 숫자형 속성들 - 타입 안전성 강화
    translateX?: NumericPropertySpec;
    translateY?: NumericPropertySpec;
    scale?: NumericPropertySpec;
    opacity?: NumericPropertySpec;
    rotate?: NumericPropertySpec;
    width?: NumericPropertySpec;
    height?: NumericPropertySpec;
    // 문자열형 속성들 - 타입 안전성 강화
    backgroundColor?: StringPropertySpec;
    color?: StringPropertySpec;
  } = {};

  constructor(duration?: number, easing?: EasingType) {
    if (duration !== undefined) this.spec.duration = duration;
    if (easing !== undefined) this.spec.easing = easing;
  }

  // 숫자형 속성 체이닝 메서드들 - 타입 안전성 강화
  translateX(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.translateX =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  translateY(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.translateY =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  scale(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.scale =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  opacity(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.opacity =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  rotate(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.rotate =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  width(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.width =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  height(fromOrTo: number | NumericPropertySpec): TossMotion {
    this.spec.height =
      typeof fromOrTo === "number" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  // 문자열형 속성 체이닝 메서드들 - 타입 안전성 강화
  backgroundColor(fromOrTo: string | StringPropertySpec): TossMotion {
    this.spec.backgroundColor =
      typeof fromOrTo === "string" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  color(fromOrTo: string | StringPropertySpec): TossMotion {
    this.spec.color =
      typeof fromOrTo === "string" ? { to: fromOrTo } : fromOrTo;
    return this;
  }

  transition(transitionValue: string): TossMotion {
    this.spec.transition = transitionValue;
    return this;
  }

  // 스펙 반환 - 타입 안전성 강화
  toSpec(): MotionSpec {
    const spec = { ...this.spec };
    return {
      duration: spec.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
      easing: spec.easing || EasingType.EASE_OUT,
      delay: spec.delay,
      translateX: spec.translateX,
      translateY: spec.translateY,
      scale: spec.scale,
      opacity: spec.opacity,
      rotate: spec.rotate,
      backgroundColor: spec.backgroundColor,
      color: spec.color,
      width: spec.width,
      height: spec.height,
      transition: spec.transition,
    };
  }
}

// Toss 스타일 Rally 클래스
export class TossRally {
  private target: string | HTMLElement;
  private playCount: number | "infinite";
  private endBehavior: AnimationEndBehavior;
  private motions: TossMotion[] = [];
  private currentRally: import("./types").Rally | null = null; // 현재 실행 중인 Rally 인스턴스 추적

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

  // 스펙 반환 - 타입 안전성 강화
  toSpec(): RallySpec {
    return {
      target: this.target,
      playCount: this.playCount,
      endBehavior: this.endBehavior,
      motions: this.motions.map((motion) => motion.toSpec()),
    };
  }

  // 애니메이션 실행
  async play() {
    // 기존 Rally가 있다면 중지
    if (this.currentRally) {
      this.currentRally.stop();
    }

    // 새로운 Rally 생성 및 실행
    this.currentRally = rallyEngine.createRally(this.toSpec());
    return await this.currentRally.start();
  }

  // 애니메이션 중지
  stop() {
    if (this.currentRally) {
      this.currentRally.stop();
      this.currentRally = null;
    }
  }

  // 애니메이션 리셋
  reset() {
    if (this.currentRally) {
      this.currentRally.reset();
      this.currentRally = null;
    }
  }

  // 역방향 애니메이션
  backward() {
    return new TossRallyBackward(this.toSpec());
  }
}

// 역방향 애니메이션 클래스 - 중복 코드 제거 및 타입 안전성 강화
export class TossRallyBackward {
  private spec: RallySpec;

  constructor(spec: RallySpec) {
    this.spec = spec;
  }

  async play() {
    // 유틸리티 함수를 사용하여 중복 코드 제거
    const reversedSpec = reverseRallySpec(this.spec);

    console.log("🔍 Original spec:", this.spec);
    console.log("🔄 Reversed spec:", reversedSpec);

    const rally = rallyEngine.createRally(reversedSpec);
    return await rally.start();
  }
}

// 역방향 Timeline 애니메이션 클래스 - 중복 코드 제거 및 타입 안전성 강화
export class TossTimelineBackward {
  private spec: TimelineSpec;

  constructor(spec: TimelineSpec) {
    this.spec = spec;
  }

  async play() {
    // 유틸리티 함수를 사용하여 중복 코드 제거
    const reversedSpec = reverseTimelineSpec(this.spec);

    const timeline = rallyEngine.createTimeline(reversedSpec);
    return await timeline.start();
  }
}

// Toss 스타일 Timeline 클래스
export class TossTimeline {
  private playback: TimelineMode | { type: "stagger"; staggerDelay: number };
  public rallies: (TossRally | TossTimeline)[] = [];
  private options: TimelineOptions;
  private currentTimeline: import("./types").Timeline | null = null; // 현재 실행 중인 Timeline 인스턴스 추적
  private initialStates: Map<string | HTMLElement, Record<string, string>> =
    new Map(); // 초기 상태 저장

  constructor(
    playback: TimelineMode | { type: "stagger"; staggerDelay: number },
    options: TimelineOptions = {}
  ) {
    this.playback = playback;
    this.options = { ...getDefaultTimelineOptions(), ...options };
  }

  // Rally 추가 메서드
  rally(
    target: string | HTMLElement,
    playCount: number | "infinite" = 1,
    endBehavior: AnimationEndBehavior = AnimationEndBehavior.MAINTAIN
  ): TossRally {
    const rally = new TossRally(target, playCount, endBehavior);
    this.rallies.push(rally);
    return rally;
  }

  // Timeline 추가 메서드 (중첩 Timeline 지원)
  timeline(
    playback: TimelineMode | { type: "stagger"; staggerDelay: number }
  ): TossTimeline {
    const timeline = new TossTimeline(playback);
    this.rallies.push(timeline);
    return timeline;
  }

  // 스펙 반환 - 타입 안전성 강화
  toSpec(): TimelineSpec {
    return {
      playback: this.playback,
      rallies: this.rallies.map((item) => {
        if (item instanceof TossRally) {
          return item.toSpec();
        } else {
          // TossTimeline인 경우
          return item.toSpec();
        }
      }),
      options: this.options,
    };
  }

  // 애니메이션 실행
  async play() {
    // 기존 Timeline이 있다면 중지
    if (this.currentTimeline) {
      this.currentTimeline.stop();
    }

    // 초기 상태 저장 (애니메이션 시작 전)
    this.saveInitialStates();

    // Timeline 시작 콜백 실행
    this.options.onStart?.();

    // 새로운 Timeline 생성 및 실행
    this.currentTimeline = rallyEngine.createTimeline(this.toSpec());
    await this.currentTimeline.start();

    // Timeline 완료 후 동작 실행
    await this.executeEndBehavior();

    // Timeline 완료 콜백 실행
    this.options.onComplete?.();
  }

  // 애니메이션 중지
  stop() {
    if (this.currentTimeline) {
      this.currentTimeline.stop();
      this.currentTimeline = null;
    }
  }

  // 애니메이션 리셋
  reset() {
    if (this.currentTimeline) {
      this.currentTimeline.reset();
      this.currentTimeline = null;
    }
  }

  // 초기 상태 저장
  private saveInitialStates(): void {
    const allRallies = collectAllRallies(this.toSpec());
    allRallies.forEach((rally) => {
      const element = findElement(rally.target);
      if (element && !this.initialStates.has(rally.target)) {
        const initialState = saveInitialState(element);
        this.initialStates.set(rally.target, initialState);
      }
    });
  }

  // Timeline 완료 후 동작 실행
  async executeEndBehavior(): Promise<void> {
    const allRallies = collectAllRallies(this.toSpec());
    await executeTimelineEndBehavior(
      allRallies,
      this.options,
      this.initialStates
    );
  }

  // 부드러운 페이드아웃 애니메이션 실행
  async fadeOut(duration?: number, easing?: EasingType): Promise<void> {
    const allRallies = collectAllRallies(this.toSpec());
    await fadeOutRallies(
      allRallies,
      duration ||
        this.options.fadeOutDuration ||
        ANIMATION_CONSTANTS.DURATION.NORMAL,
      easing || this.options.fadeOutEasing || EasingType.EASE_OUT
    );
  }

  // 옵션 설정 메서드
  setOptions(options: Partial<TimelineOptions>): TossTimeline {
    this.options = { ...this.options, ...options };
    return this;
  }

  // 역방향 애니메이션
  backward() {
    return new TossTimelineBackward(this.toSpec());
  }
}

// Rally React 스타일 API - 타입 안전성 강화
export function Rally(
  target: string | HTMLElement,
  playCount: number | "infinite" = 1,
  motions?: MotionSpec[],
  endBehavior: AnimationEndBehavior = AnimationEndBehavior.MAINTAIN
): TossRally {
  const rally = new TossRally(target, playCount, endBehavior);

  if (motions) {
    // Rally React 스타일: motions 배열을 직접 받아서 처리
    motions.forEach((motionSpec) => {
      const motion = new TossMotion(motionSpec.duration, motionSpec.easing);

      // 각 속성을 motion에 추가 - 타입 안전성 강화
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

// Rally React 스타일 Timeline API - 타입 안전성 강화
export function Timeline(
  rallies: (TossRally | TossTimeline)[],
  playback:
    | TimelineMode
    | { type: "stagger"; staggerDelay: number } = TimelineMode.SERIAL,
  options: TimelineOptions = {}
): TossTimeline {
  const timeline = new TossTimeline(playback, options);
  timeline.rallies = rallies;
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

// Stagger delay 상수들 - 유틸리티 상수 사용
export const Stagger = {
  fast: ANIMATION_CONSTANTS.STAGGER.FAST,
  normal: ANIMATION_CONSTANTS.STAGGER.NORMAL,
  slow: ANIMATION_CONSTANTS.STAGGER.SLOW,
  verySlow: ANIMATION_CONSTANTS.STAGGER.VERY_SLOW,
};

// TimelineEndBehavior export
export { TimelineEndBehavior } from "./types";
