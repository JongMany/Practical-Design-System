/**
 * Rally Animation Components
 * React 컴포넌트 기반 애니메이션
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
  EasingConfig,
} from "./types";
import { useMotion, useRally, useTimeline, useAnimationRef } from "./hooks";
import { createMotionSpec } from "./presets";

// 애니메이션 컴포넌트의 ref 타입
export interface AnimationRef {
  play: () => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  cancel: () => void;
  restart: () => Promise<void>;
}

// Motion 컴포넌트 props
export interface MotionProps extends UseAnimationOptions {
  /** 애니메이션할 속성 */
  property: MotionSpec["property"];
  /** 시작 값 */
  from: any;
  /** 끝 값 */
  to: any;
  /** 지속 시간 (ms) */
  duration: number;
  /** 이징 함수 */
  easing?: string | EasingConfig;
  /** 지연 시간 (ms) */
  delay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

// Motion 컴포넌트
export const Motion = forwardRef<AnimationRef, MotionProps>(
  (
    {
      property,
      from,
      to,
      duration,
      easing = "spring.quick",
      delay,
      autoPlay = false,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    const { ref: elementRef, getElement } = useAnimationRef<HTMLDivElement>();

    const motionSpec: MotionSpec = {
      property,
      from,
      to,
      duration,
      easing,
      delay,
    };

    const animation = useMotion(motionSpec, {
      ...options,
      autoPlay,
    });

    useImperativeHandle(ref, () => ({
      play: animation.play,
      pause: animation.pause,
      resume: animation.resume,
      stop: animation.stop,
      cancel: animation.cancel,
      restart: animation.restart,
    }));

    // 애니메이션 실행 시 요소에 적용
    useEffect(() => {
      if (getElement()) {
        // 애니메이션 엔진에 요소 전달
        const motion = animation as any;
        if (motion.animationRef?.current) {
          motion.animationRef.current.element = getElement();
        }
      }
    }, [getElement, animation]);

    return (
      <div ref={elementRef} style={style} className={className}>
        {children}
      </div>
    );
  }
);

Motion.displayName = "Motion";

// Rally 컴포넌트 props
export interface RallyProps extends UseAnimationOptions {
  /** 대상 선택자 */
  target: string;
  /** 모션 스펙들 */
  motions: MotionSpec[];
  /** 병렬 실행 여부 */
  parallel?: boolean;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

// Rally 컴포넌트
export const Rally = forwardRef<AnimationRef, RallyProps>(
  (
    {
      target,
      motions,
      parallel = false,
      autoPlay = false,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    const rallySpec: RallySpec = {
      target,
      motions,
      parallel,
    };

    const animation = useRally(rallySpec, {
      ...options,
      autoPlay,
    });

    useImperativeHandle(ref, () => ({
      play: animation.play,
      pause: animation.pause,
      resume: animation.resume,
      stop: animation.stop,
      cancel: animation.cancel,
      restart: animation.restart,
    }));

    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }
);

Rally.displayName = "Rally";

// Timeline 컴포넌트 props
export interface TimelineProps extends UseAnimationOptions {
  /** 랠리 스펙들 */
  rallies: RallySpec[];
  /** 실행 방식 */
  sequence: "parallel" | "sequential" | "staggered";
  /** 순차 실행 시 지연 시간 */
  staggerDelay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

// Timeline 컴포넌트
export const Timeline = forwardRef<AnimationRef, TimelineProps>(
  (
    {
      rallies,
      sequence,
      staggerDelay,
      autoPlay = false,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    const timelineSpec: TimelineSpec = {
      rallies,
      sequence,
      staggerDelay,
    };

    const animation = useTimeline(timelineSpec, {
      ...options,
      autoPlay,
    });

    useImperativeHandle(ref, () => ({
      play: animation.play,
      pause: animation.pause,
      resume: animation.resume,
      stop: animation.stop,
      cancel: animation.cancel,
      restart: animation.restart,
    }));

    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }
);

Timeline.displayName = "Timeline";

// Animate 컴포넌트 props - 프리셋 기반
export interface AnimateProps extends UseAnimationOptions {
  /** 프리셋 이름 */
  preset: string;
  /** 애니메이션할 속성 */
  property?: MotionSpec["property"];
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

// Animate 컴포넌트 - 프리셋 기반 애니메이션
export const Animate = forwardRef<AnimationRef, AnimateProps>(
  (
    {
      preset,
      property = "opacity",
      autoPlay = false,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    const motionSpec = createMotionSpec(property, preset);

    return (
      <Motion
        ref={ref}
        {...motionSpec}
        autoPlay={autoPlay}
        style={style}
        className={className}
        {...options}
      >
        {children}
      </Motion>
    );
  }
);

Animate.displayName = "Animate";

// FadeIn 컴포넌트
export interface FadeInProps extends UseAnimationOptions {
  /** 지속 시간 */
  duration?: number;
  /** 이징 함수 */
  easing?: string;
  /** 지연 시간 */
  delay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

export const FadeIn = forwardRef<AnimationRef, FadeInProps>(
  (
    {
      duration = 300,
      easing = "spring.quick",
      delay,
      autoPlay = true,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    return (
      <Motion
        ref={ref}
        property="opacity"
        from={0}
        to={1}
        duration={duration}
        easing={easing}
        delay={delay}
        autoPlay={autoPlay}
        style={style}
        className={className}
        {...options}
      >
        {children}
      </Motion>
    );
  }
);

FadeIn.displayName = "FadeIn";

// FadeOut 컴포넌트
export interface FadeOutProps extends UseAnimationOptions {
  /** 지속 시간 */
  duration?: number;
  /** 이징 함수 */
  easing?: string;
  /** 지연 시간 */
  delay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

export const FadeOut = forwardRef<AnimationRef, FadeOutProps>(
  (
    {
      duration = 300,
      easing = "spring.quick",
      delay,
      autoPlay = false,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    return (
      <Motion
        ref={ref}
        property="opacity"
        from={1}
        to={0}
        duration={duration}
        easing={easing}
        delay={delay}
        autoPlay={autoPlay}
        style={style}
        className={className}
        {...options}
      >
        {children}
      </Motion>
    );
  }
);

FadeOut.displayName = "FadeOut";

// SlideUp 컴포넌트
export interface SlideUpProps extends UseAnimationOptions {
  /** 지속 시간 */
  duration?: number;
  /** 이징 함수 */
  easing?: string;
  /** 지연 시간 */
  delay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

export const SlideUp = forwardRef<AnimationRef, SlideUpProps>(
  (
    {
      duration = 300,
      easing = "spring.quick",
      delay,
      autoPlay = true,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    return (
      <Motion
        ref={ref}
        property="transform"
        from="translateY(20px)"
        to="translateY(0)"
        duration={duration}
        easing={easing}
        delay={delay}
        autoPlay={autoPlay}
        style={style}
        className={className}
        {...options}
      >
        {children}
      </Motion>
    );
  }
);

SlideUp.displayName = "SlideUp";

// ScaleIn 컴포넌트
export interface ScaleInProps extends UseAnimationOptions {
  /** 지속 시간 */
  duration?: number;
  /** 이징 함수 */
  easing?: string;
  /** 지연 시간 */
  delay?: number;
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** CSS 클래스 */
  className?: string;
}

export const ScaleIn = forwardRef<AnimationRef, ScaleInProps>(
  (
    {
      duration = 300,
      easing = "spring.quick",
      delay,
      autoPlay = true,
      children,
      style,
      className,
      ...options
    },
    ref
  ) => {
    return (
      <Motion
        ref={ref}
        property="transform"
        from="scale(0.8)"
        to="scale(1)"
        duration={duration}
        easing={easing}
        delay={delay}
        autoPlay={autoPlay}
        style={style}
        className={className}
        {...options}
      >
        {children}
      </Motion>
    );
  }
);

ScaleIn.displayName = "ScaleIn";
