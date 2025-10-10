/**
 * Rally Animation System
 * 토스의 Rally 시스템을 기반으로 한 React 애니메이션 라이브러리
 */

// 타입 exports
export type {
  AnimationController,
  AnimationEngine,
  AnimationEvent,
  AnimationProperty,
  AnimationState,
  EasingConfig,
  EasingType,
  Motion,
  MotionSpec,
  Rally,
  RallySpec,
  SpringConfig,
  BezierConfig,
  Timeline,
  TimelineSpec,
  UseAnimationOptions,
} from "./types";

// 프리셋 exports
export {
  EASING_PRESETS,
  MOTION_PRESETS,
  createMotionSpec,
  getEasingConfig,
  hasMotionPreset,
  hasEasingPreset,
  getAvailableMotionPresets,
  getAvailableEasingPresets,
} from "./presets";

// 엔진 exports
export { RallyAnimationEngine, rallyEngine } from "./engine";

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
  Animate,
  FadeIn,
  FadeOut,
  SlideUp,
  ScaleIn,
  type AnimationRef,
  type MotionProps,
  type RallyProps,
  type TimelineProps,
  type AnimateProps,
  type FadeInProps,
  type FadeOutProps,
  type SlideUpProps,
  type ScaleInProps,
} from "./components";

// 유틸리티 함수들
export const RallyUtils = {
  // 애니메이션 빌더
  createMotion: (
    property: string,
    from: any,
    to: any,
    duration: number,
    easing: string
  ) => ({
    property,
    from,
    to,
    duration,
    easing,
  }),

  createRally: (target: string, motions: any[], parallel = false) => ({
    target,
    motions,
    parallel,
  }),

  createTimeline: (
    rallies: any[],
    sequence: "parallel" | "sequential" | "staggered" = "sequential"
  ) => ({
    rallies,
    sequence,
  }),

  // 애니메이션 체이닝
  chain: (...specs: any[]) => ({
    rallies: specs,
    sequence: "sequential" as const,
  }),

  // 애니메이션 병렬 실행
  parallel: (...specs: any[]) => ({
    rallies: specs,
    sequence: "parallel" as const,
  }),

  // 애니메이션 지연 실행
  stagger: (specs: any[], delay: number) => ({
    rallies: specs,
    sequence: "staggered" as const,
    staggerDelay: delay,
  }),
};

// 기본 애니메이션 프리셋들
export const RallyPresets = {
  // 페이드 애니메이션
  fadeIn: (duration = 300, easing = "spring.quick") => ({
    property: "opacity" as const,
    from: 0,
    to: 1,
    duration,
    easing,
  }),

  fadeOut: (duration = 300, easing = "spring.quick") => ({
    property: "opacity" as const,
    from: 1,
    to: 0,
    duration,
    easing,
  }),

  // 슬라이드 애니메이션
  slideUp: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "translateY(20px)",
    to: "translateY(0)",
    duration,
    easing,
  }),

  slideDown: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "translateY(-20px)",
    to: "translateY(0)",
    duration,
    easing,
  }),

  slideLeft: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "translateX(20px)",
    to: "translateX(0)",
    duration,
    easing,
  }),

  slideRight: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "translateX(-20px)",
    to: "translateX(0)",
    duration,
    easing,
  }),

  // 스케일 애니메이션
  scaleIn: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "scale(0.8)",
    to: "scale(1)",
    duration,
    easing,
  }),

  scaleOut: (duration = 300, easing = "spring.quick") => ({
    property: "transform" as const,
    from: "scale(1)",
    to: "scale(0.8)",
    duration,
    easing,
  }),

  // 회전 애니메이션
  rotateIn: (duration = 400, easing = "spring.basic") => ({
    property: "transform" as const,
    from: "rotate(-180deg)",
    to: "rotate(0deg)",
    duration,
    easing,
  }),

  rotateOut: (duration = 400, easing = "spring.basic") => ({
    property: "transform" as const,
    from: "rotate(0deg)",
    to: "rotate(180deg)",
    duration,
    easing,
  }),

  // 복합 애니메이션
  slideUpFadeIn: (duration = 300, easing = "spring.quick") => [
    {
      property: "opacity" as const,
      from: 0,
      to: 1,
      duration,
      easing,
    },
    {
      property: "transform" as const,
      from: "translateY(20px)",
      to: "translateY(0)",
      duration,
      easing,
    },
  ],

  scaleInFadeIn: (duration = 300, easing = "spring.quick") => [
    {
      property: "opacity" as const,
      from: 0,
      to: 1,
      duration,
      easing,
    },
    {
      property: "transform" as const,
      from: "scale(0.8)",
      to: "scale(1)",
      duration,
      easing,
    },
  ],
};

// 기본 내보내기는 제거 - named exports만 사용
