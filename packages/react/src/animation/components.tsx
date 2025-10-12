/**
 * Rally Animation Components
 * Toss 스타일 React 컴포넌트 기반 애니메이션
 */

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { ReactNode } from "react";
import type {
  MotionSpec,
  RallySpec,
  TimelineSpec,
  UseAnimationOptions,
} from "./types";
import { TimelineMode } from "./enums";
import { useMotion, useRally, useTimeline, useAnimationRef } from "./hooks";

// 애니메이션 컴포넌트의 ref 타입
export interface AnimationRef {
  play: () => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  cancel: () => void;
  reset: () => void;
  restart: () => Promise<void>;
}

// Toss 스타일 Motion 컴포넌트 props
export interface MotionProps extends UseAnimationOptions {
  /** 애니메이션 완료 후 콜백 (onComplete의 별칭) */
  onEnd?: () => void;
  /** 지속 시간 (초) */
  duration: number;
  /** 이징 함수 */
  easing: string;
  /** 지연 시간 (초) */
  delay?: number;

  // Toss 스타일 속성들
  /** X축 이동 */
  translateX?: { from?: number; to: number };
  /** Y축 이동 */
  translateY?: { from?: number; to: number };
  /** 스케일 */
  scale?: { from?: number; to: number };
  /** 투명도 */
  opacity?: { from?: number; to: number };
  /** 회전 */
  rotate?: { from?: number; to: number };
  /** 배경색 */
  backgroundColor?: { from?: string; to: string };
  /** 색상 */
  color?: { from?: string; to: string };
  /** 너비 */
  width?: { from?: number; to: number };
  /** 높이 */
  height?: { from?: number; to: number };

  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
}

// Toss 스타일 Rally 컴포넌트 props
export interface RallyProps extends UseAnimationOptions {
  /** 애니메이션 완료 후 콜백 (onComplete의 별칭) */
  onEnd?: () => void;
  /** 대상 식별자 (CSS 선택자 또는 HTMLElement) */
  target: string | HTMLElement;
  /** 반복 횟수 */
  playCount?: number | "infinite";
  /** 실행할 모션들 */
  motions: MotionSpec[];
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
}

// Toss 스타일 Timeline 컴포넌트 props
export interface TimelineProps extends UseAnimationOptions {
  /** 애니메이션 완료 후 콜백 (onComplete의 별칭) */
  onEnd?: () => void;
  /** 재생 방식 */
  playback: TimelineMode | { type: "stagger"; staggerDelay: number };
  /** 실행할 랠리들 */
  rallies: RallySpec[];
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
}

// Toss 스타일 Motion 컴포넌트
export const Motion = forwardRef<AnimationRef, MotionProps>(
  (
    {
      duration,
      easing,
      delay = 0,
      translateX,
      translateY,
      scale,
      opacity,
      rotate,
      backgroundColor,
      color,
      width,
      height,
      autoPlay = false,
      children,
      onStart,
      onEnd,
      onPause,
      onResume,
      onCancel,
      onComplete = onEnd,
      ...rest
    },
    ref
  ) => {
    const motionRef = useRef<HTMLDivElement>(null);
    const motionSpec: MotionSpec = {
      duration,
      easing: easing as any,
      delay,
      translateX,
      translateY,
      scale,
      opacity,
      rotate,
      backgroundColor,
      color,
      width,
      height,
    };

    const motion = useMotion(motionSpec, { onComplete });

    useImperativeHandle(ref, () => ({
      play: () => motion.play(),
      pause: () => motion.pause(),
      resume: () => motion.resume(),
      stop: () => motion.stop(),
      cancel: () => motion.cancel(),
      reset: () => motion.reset(),
      restart: async () => {
        motion.stop();
        await motion.play();
      },
    }));

    useEffect(() => {
      if (autoPlay) {
        motion.play();
      }
    }, [autoPlay, motion]);

    // 이벤트 핸들러는 UseAnimationOptions를 통해 처리됨

    return (
      <div ref={motionRef} {...rest}>
        {children}
      </div>
    );
  }
);

Motion.displayName = "Motion";

// Toss 스타일 Rally 컴포넌트
export const Rally = forwardRef<AnimationRef, RallyProps>(
  (
    {
      target,
      playCount,
      motions,
      autoPlay = false,
      children,
      onStart,
      onEnd,
      onPause,
      onResume,
      onCancel,
      onComplete = onEnd,
      ...rest
    },
    ref
  ) => {
    const rallyRef = useRef<HTMLDivElement>(null);
    const rallySpec: RallySpec = {
      target,
      playCount,
      motions,
    };

    const rally = useRally(rallySpec, { onComplete });

    useImperativeHandle(ref, () => ({
      play: () => rally.play(),
      pause: () => rally.pause(),
      resume: () => rally.resume(),
      stop: () => rally.stop(),
      cancel: () => rally.cancel(),
      reset: () => rally.reset(),
      restart: async () => {
        rally.stop();
        await rally.play();
      },
    }));

    useEffect(() => {
      if (autoPlay) {
        rally.play();
      }
    }, [autoPlay, rally]);

    // 이벤트 핸들러는 UseAnimationOptions를 통해 처리됨

    return (
      <div ref={rallyRef} {...rest}>
        {children}
      </div>
    );
  }
);

Rally.displayName = "Rally";

// Toss 스타일 Timeline 컴포넌트
export const Timeline = forwardRef<AnimationRef, TimelineProps>(
  (
    {
      playback,
      rallies,
      autoPlay = false,
      children,
      onStart,
      onEnd,
      onPause,
      onResume,
      onCancel,
      onComplete = onEnd,
      ...rest
    },
    ref
  ) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineSpec: TimelineSpec = {
      playback,
      rallies,
    };

    const timeline = useTimeline(timelineSpec, { onComplete });

    useImperativeHandle(ref, () => ({
      play: () => timeline.play(),
      pause: () => timeline.pause(),
      resume: () => timeline.resume(),
      stop: () => timeline.stop(),
      cancel: () => timeline.cancel(),
      reset: () => timeline.reset(),
      restart: async () => {
        timeline.stop();
        await timeline.play();
      },
    }));

    useEffect(() => {
      if (autoPlay) {
        timeline.play();
      }
    }, [autoPlay, timeline]);

    // 이벤트 핸들러는 UseAnimationOptions를 통해 처리됨

    return (
      <div ref={timelineRef} {...rest}>
        {children}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";
