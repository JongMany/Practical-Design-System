/**
 * Rally Animation System
 * 토스의 Rally 시스템을 기반으로 한 React 애니메이션 라이브러리
 */

import {
  EasingType,
  TimelineMode,
  AnimationEndBehavior,
  AnimationState,
} from "./enums";

// 타입 exports
export type {
  AnimationController,
  AnimationEngine,
  AnimationEvent,
  AnimationProperty,
  EasingConfig,
  MotionSpec,
  RallySpec,
  SpringConfig,
  BezierConfig,
  TimelineSpec,
  TimelineOptions,
  UseAnimationOptions,
} from "./types";

// Enum exports
export {
  EasingType,
  TimelineMode,
  AnimationEndBehavior,
  AnimationState,
} from "./enums";

// TimelineEndBehavior export
export { TimelineEndBehavior } from "./types";

// 프리셋 exports
export {
  AnimationPreset,
  AnimationEffect,
  AnimationPresets,
  AnimationEffects,
} from "./presets";

// 엔진 exports
export { RallyAnimationEngine, rallyEngine } from "./engine";

// 새로운 Toss 스타일 API
export {
  TossMotion,
  TossRally,
  TossTimeline,
  TossRallyBackward,
  TossTimelineBackward,
  Motion,
  Rally,
  Timeline,
  Bezier,
  Spring,
  Ease,
  Stagger,
} from "./toss-style";

// 훅 exports
export {
  useAnimation,
  useMotion,
  useRally,
  useTimeline,
  useAnimationSequence,
  useAnimationParallel,
  useAnimationTrigger,
  useAnimationOnMount,
  useAnimationOnUnmount,
  useAnimationLoop,
  useAnimationState,
  useAnimationRef,
} from "./hooks";

// 컴포넌트 exports
export {
  Motion as MotionComponent,
  Rally as RallyComponent,
  Timeline as TimelineComponent,
  type AnimationRef,
  type MotionProps,
  type RallyProps,
  type TimelineProps,
} from "./components";

// Toss 스타일 유틸리티 함수들
export const RallyUtils = {
  // Toss 스타일 모션 빌더
  createMotion: (
    duration: number,
    easing: string,
    properties: {
      translateX?: { from?: number; to: number };
      translateY?: { from?: number; to: number };
      scale?: { from?: number; to: number };
      opacity?: { from?: number; to: number };
      rotate?: { from?: number; to: number };
      backgroundColor?: { from?: string; to: string };
      color?: { from?: string; to: string };
      width?: { from?: number; to: number };
      height?: { from?: number; to: number };
    }
  ) => ({
    duration,
    easing,
    ...properties,
  }),

  // Toss 스타일 랠리 빌더
  createRally: (
    target: string | HTMLElement,
    motions: any[],
    playCount?: number | "infinite"
  ) => ({
    target,
    playCount,
    motions,
  }),

  // Toss 스타일 타임라인 빌더
  createTimeline: (
    rallies: any[],
    playback:
      | TimelineMode
      | { type: "stagger"; staggerDelay: number } = TimelineMode.SERIAL
  ) => ({
    playback,
    rallies,
  }),

  // 애니메이션 체이닝
  chain: (...specs: any[]) => ({
    playback: TimelineMode.SERIAL,
    rallies: specs,
  }),

  // 애니메이션 병렬 실행
  parallel: (...specs: any[]) => ({
    playback: TimelineMode.PARALLEL,
    rallies: specs,
  }),

  // 애니메이션 지연 실행
  stagger: (specs: any[], delay: number) => ({
    playback: { type: "stagger" as const, staggerDelay: delay },
    rallies: specs,
  }),
};

// Toss 스타일 애니메이션 프리셋들 (새로운 시스템과 호환)
export const RallyPresets = {
  // 페이드 애니메이션
  fadeIn: (duration = 0.3, easing: EasingType = EasingType.SPRING_QUICK) => ({
    duration,
    easing,
    opacity: { from: 0, to: 1 },
  }),

  fadeOut: (duration = 0.3, easing: EasingType = EasingType.SPRING_QUICK) => ({
    duration,
    easing,
    opacity: { from: 1, to: 0 },
  }),

  // 슬라이드 애니메이션
  slideUp: (duration = 0.3, easing: EasingType = EasingType.SPRING_QUICK) => ({
    duration,
    easing,
    translateY: { from: 20, to: 0 },
  }),

  slideDown: (
    duration = 0.3,
    easing: EasingType = EasingType.SPRING_QUICK
  ) => ({
    duration,
    easing,
    translateY: { from: -20, to: 0 },
  }),

  slideLeft: (
    duration = 0.3,
    easing: EasingType = EasingType.SPRING_QUICK
  ) => ({
    duration,
    easing,
    translateX: { from: 20, to: 0 },
  }),

  slideRight: (
    duration = 0.3,
    easing: EasingType = EasingType.SPRING_QUICK
  ) => ({
    duration,
    easing,
    translateX: { from: -20, to: 0 },
  }),

  // 스케일 애니메이션
  scaleIn: (duration = 0.3, easing: EasingType = EasingType.SPRING_QUICK) => ({
    duration,
    easing,
    scale: { from: 0.8, to: 1 },
  }),

  scaleOut: (duration = 0.3, easing: EasingType = EasingType.SPRING_QUICK) => ({
    duration,
    easing,
    scale: { from: 1, to: 0.8 },
  }),

  // 회전 애니메이션
  rotateIn: (duration = 0.4, easing: EasingType = EasingType.SPRING_BASIC) => ({
    duration,
    easing,
    rotate: { from: -180, to: 0 },
  }),

  rotateOut: (
    duration = 0.4,
    easing: EasingType = EasingType.SPRING_BASIC
  ) => ({
    duration,
    easing,
    rotate: { from: 0, to: 180 },
  }),

  // 복합 애니메이션
  slideUpFadeIn: (
    duration = 0.3,
    easing: EasingType = EasingType.SPRING_QUICK
  ) => ({
    duration,
    easing,
    opacity: { from: 0, to: 1 },
    translateY: { from: 20, to: 0 },
  }),

  scaleInFadeIn: (
    duration = 0.3,
    easing: EasingType = EasingType.SPRING_QUICK
  ) => ({
    duration,
    easing,
    opacity: { from: 0, to: 1 },
    scale: { from: 0.8, to: 1 },
  }),
};

// 기본 내보내기는 제거 - named exports만 사용
