/**
 * Rally Animation Hooks
 * React 훅 기반 애니메이션 API
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AnimationController,
  MotionSpec,
  RallySpec,
  TimelineSpec,
  UseAnimationOptions,
} from "./types";
import { AnimationState, TimelineMode } from "./enums";
import { rallyEngine } from "./engine";

// useAnimation 훅 - 기본 애니메이션 제어
export function useAnimation(
  spec: MotionSpec | RallySpec | TimelineSpec,
  options: UseAnimationOptions = {}
): AnimationController {
  const [state, setState] = useState<AnimationState>(AnimationState.IDLE);
  const animationRef = useRef<any>(null);
  const {
    autoPlay = false,
    loop = false,
    onComplete,
    onStart,
    onPause,
    onResume,
    onStop,
    onCancel,
  } = options;

  // 애니메이션 생성
  useEffect(() => {
    if ("motions" in spec) {
      // RallySpec
      animationRef.current = rallyEngine.createRally(spec);
    } else if ("rallies" in spec) {
      // TimelineSpec
      animationRef.current = rallyEngine.createTimeline(spec);
    } else {
      // MotionSpec
      animationRef.current = rallyEngine.createMotion(spec);
    }

    // 이벤트 리스너 등록
    const animation = animationRef.current;
    if (animation) {
      animation.on("start", () => {
        setState(AnimationState.RUNNING);
        onStart?.();
      });

      animation.on("end", () => {
        setState(AnimationState.FINISHED);
        onComplete?.();
      });

      animation.on("pause", () => {
        setState(AnimationState.PAUSED);
        onPause?.();
      });

      animation.on("resume", () => {
        setState(AnimationState.RUNNING);
        onResume?.();
      });

      animation.on("cancel", () => {
        setState(AnimationState.IDLE);
        onCancel?.();
      });
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [spec, onStart, onComplete, onPause, onResume, onCancel]);

  // 자동 실행
  useEffect(() => {
    if (autoPlay && animationRef.current) {
      play();
    }
  }, [autoPlay]);

  const play = useCallback(async () => {
    if (animationRef.current) {
      await animationRef.current.start();
    }
  }, []);

  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  }, []);

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  }, []);

  const cancel = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
    }
  }, []);

  const restart = useCallback(async () => {
    if (animationRef.current) {
      animationRef.current.stop();
      await animationRef.current.start();
    }
  }, []);

  return {
    state,
    play,
    pause,
    resume,
    stop,
    cancel,
    restart,
  };
}

// useMotion 훅 - 단일 모션 애니메이션
export function useMotion(
  spec: MotionSpec,
  options: UseAnimationOptions = {}
): AnimationController {
  return useAnimation(spec, options);
}

// useRally 훅 - 랠리 애니메이션
export function useRally(
  spec: RallySpec,
  options: UseAnimationOptions = {}
): AnimationController {
  return useAnimation(spec, options);
}

// useTimeline 훅 - 타임라인 애니메이션
export function useTimeline(
  spec: TimelineSpec,
  options: UseAnimationOptions = {}
): AnimationController {
  return useAnimation(spec, options);
}

// useAnimationSequence 훅 - 순차적 애니메이션 실행
export function useAnimationSequence(
  specs: (MotionSpec | RallySpec)[],
  options: UseAnimationOptions & {
    staggerDelay?: number;
  } = {}
): AnimationController {
  const { staggerDelay = 0, ...animationOptions } = options;

  const timelineSpec: TimelineSpec = {
    rallies: specs.map((spec) => {
      if ("motions" in spec) {
        return spec;
      } else {
        return {
          target: "body", // 기본 타겟
          motions: [spec],
        };
      }
    }),
    playback: { type: "stagger", staggerDelay },
  };

  return useTimeline(timelineSpec, animationOptions);
}

// useAnimationParallel 훅 - 병렬 애니메이션 실행
export function useAnimationParallel(
  specs: (MotionSpec | RallySpec)[],
  options: UseAnimationOptions = {}
): AnimationController {
  const timelineSpec: TimelineSpec = {
    rallies: specs.map((spec) => {
      if ("motions" in spec) {
        return spec;
      } else {
        return {
          target: "body", // 기본 타겟
          motions: [spec],
        };
      }
    }),
    playback: TimelineMode.PARALLEL,
  };

  return useTimeline(timelineSpec, options);
}

// useAnimationTrigger 훅 - 트리거 기반 애니메이션
export function useAnimationTrigger(
  spec: MotionSpec | RallySpec | TimelineSpec,
  trigger: boolean,
  options: UseAnimationOptions = {}
): AnimationController {
  const animation = useAnimation(spec, options);

  useEffect(() => {
    if (trigger) {
      animation.play();
    } else {
      animation.stop();
    }
  }, [trigger, animation]);

  return animation;
}

// useAnimationOnMount 훅 - 마운트 시 애니메이션
export function useAnimationOnMount(
  spec: MotionSpec | RallySpec | TimelineSpec,
  options: UseAnimationOptions = {}
): AnimationController {
  return useAnimation(spec, { ...options, autoPlay: true });
}

// useAnimationOnUnmount 훅 - 언마운트 시 애니메이션
export function useAnimationOnUnmount(
  spec: MotionSpec | RallySpec | TimelineSpec,
  options: UseAnimationOptions = {}
): AnimationController {
  const animation = useAnimation(spec, options);

  useEffect(() => {
    return () => {
      animation.play();
    };
  }, [animation]);

  return animation;
}

// useAnimationLoop 훅 - 반복 애니메이션
export function useAnimationLoop(
  spec: MotionSpec | RallySpec | TimelineSpec,
  options: UseAnimationOptions & {
    loopCount?: number;
    loopDelay?: number;
  } = {}
): AnimationController {
  const { loopCount = Infinity, loopDelay = 0, ...animationOptions } = options;
  const [currentLoop, setCurrentLoop] = useState(0);
  const animation = useAnimation(spec, {
    ...animationOptions,
    onComplete: () => {
      if (currentLoop < loopCount - 1) {
        setTimeout(() => {
          setCurrentLoop((prev) => prev + 1);
          animation.restart();
        }, loopDelay);
      } else {
        animationOptions.onComplete?.();
      }
    },
  });

  useEffect(() => {
    if (currentLoop === 0) {
      animation.play();
    }
  }, [currentLoop, animation]);

  return animation;
}

// useAnimationState 훅 - 애니메이션 상태 관리
export function useAnimationState(
  initialState: AnimationState = AnimationState.IDLE
) {
  const [state, setState] = useState<AnimationState>(initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsPlaying(state === AnimationState.RUNNING);
    setIsPaused(state === AnimationState.PAUSED);
    setIsFinished(state === AnimationState.FINISHED);
  }, [state]);

  const play = useCallback(() => {
    setState(AnimationState.RUNNING);
  }, []);

  const pause = useCallback(() => {
    setState(AnimationState.PAUSED);
  }, []);

  const stop = useCallback(() => {
    setState(AnimationState.IDLE);
  }, []);

  const finish = useCallback(() => {
    setState(AnimationState.FINISHED);
  }, []);

  return {
    state,
    isPlaying,
    isPaused,
    isFinished,
    play,
    pause,
    stop,
    finish,
  };
}

// useAnimationRef 훅 - 애니메이션 대상 요소 참조
export function useAnimationRef<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const getElement = useCallback(() => {
    return ref.current;
  }, []);

  const isReady = useCallback(() => {
    return ref.current !== null;
  }, []);

  return {
    ref,
    getElement,
    isReady,
  };
}
