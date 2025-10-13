/**
 * Rally Animation Utilities
 * 중복 코드 제거 및 공통 로직을 위한 유틸리티 함수들
 */

import type {
  AnimationPropertySpec,
  NumericPropertySpec,
  StringPropertySpec,
  MotionSpec,
  RallySpec,
  TimelineSpec,
  TimelineOptions,
  ReversePropertyFunction,
} from "./types";
import { TimelineEndBehavior } from "./types";
import { EasingType } from "./enums";

/**
 * 애니메이션 속성의 from과 to를 뒤바꾸는 유틸리티 함수
 * 중복 코드 제거를 위해 공통 로직으로 추출
 */
export const reverseProperty: ReversePropertyFunction = <
  T extends AnimationPropertySpec,
>(
  property: T | undefined
) => {
  if (!property) return undefined;

  return {
    from: property.to,
    to: property.from ?? (typeof property.to === "number" ? 0 : ""),
  } as any;
};

/**
 * 숫자형 속성의 기본값을 반환하는 함수
 */
export const getNumericDefault = (value: number): number => {
  return value === 0 ? 0 : 1;
};

/**
 * 문자열형 속성의 기본값을 반환하는 함수
 */
export const getStringDefault = (value: string): string => {
  return value === "" ? "" : "transparent";
};

/**
 * MotionSpec의 모든 속성을 역방향으로 변환하는 함수
 */
export const reverseMotionSpec = (motion: MotionSpec): MotionSpec => {
  return {
    ...motion,
    translateX: reverseProperty(motion.translateX) as
      | NumericPropertySpec
      | undefined,
    translateY: reverseProperty(motion.translateY) as
      | NumericPropertySpec
      | undefined,
    scale: reverseProperty(motion.scale) as NumericPropertySpec | undefined,
    opacity: reverseProperty(motion.opacity) as NumericPropertySpec | undefined,
    rotate: reverseProperty(motion.rotate) as NumericPropertySpec | undefined,
    backgroundColor: reverseProperty(motion.backgroundColor) as
      | StringPropertySpec
      | undefined,
    color: reverseProperty(motion.color) as StringPropertySpec | undefined,
    width: reverseProperty(motion.width) as NumericPropertySpec | undefined,
    height: reverseProperty(motion.height) as NumericPropertySpec | undefined,
    borderRadius: reverseProperty(motion.borderRadius) as
      | StringPropertySpec
      | undefined,
  };
};

/**
 * RallySpec의 모든 motions를 역방향으로 변환하는 함수
 */
export const reverseRallySpec = (rally: RallySpec): RallySpec => {
  return {
    ...rally,
    motions: rally.motions.slice().reverse().map(reverseMotionSpec),
  };
};

/**
 * TimelineSpec의 모든 rallies를 역방향으로 변환하는 함수
 */
export const reverseTimelineSpec = (timeline: TimelineSpec): TimelineSpec => {
  return {
    ...timeline,
    rallies: timeline.rallies
      .slice()
      .reverse()
      .map((rally) => {
        if ("rallies" in rally) {
          // 중첩된 Timeline인 경우
          return reverseTimelineSpec(rally);
        } else {
          // Rally인 경우
          return reverseRallySpec(rally);
        }
      }),
  };
};

/**
 * DOM 요소를 안전하게 찾는 함수
 * 에러 처리 및 타입 안전성 강화
 */
export const findElement = (
  target: string | HTMLElement
): HTMLElement | null => {
  if (typeof target === "string") {
    const element = document.querySelector(target) as HTMLElement;
    if (!element) {
      console.warn(`Target element not found: ${target}`);
      return null;
    }
    return element;
  }
  return target;
};

/**
 * 요소의 초기 상태를 저장하는 함수
 */
export const saveInitialState = (
  element: HTMLElement
): Record<string, string> => {
  const computedStyle = getComputedStyle(element);
  const initialState: Record<string, string> = {};

  // 중요한 CSS 속성들을 저장
  const importantProperties = [
    "opacity",
    "transform",
    "transition",
    "backgroundColor",
    "color",
    "width",
    "height",
    "borderRadius",
    "scale",
    "translateX",
    "translateY",
    "rotate",
  ];

  importantProperties.forEach((prop) => {
    initialState[prop] = computedStyle.getPropertyValue(prop) || "";
  });

  // 현재 인라인 스타일도 저장
  initialState._inlineStyles = element.style.cssText;

  return initialState;
};

/**
 * 요소를 초기 상태로 복원하는 함수
 */
export const restoreInitialState = (
  element: HTMLElement,
  initialState: Record<string, string>
): void => {
  if (!element || !initialState) return;

  // 인라인 스타일을 초기 상태로 복원
  element.style.cssText = initialState._inlineStyles || "";

  // 각 속성을 초기값으로 복원
  Object.entries(initialState).forEach(([prop, value]) => {
    if (prop !== "_inlineStyles" && value !== "") {
      element.style.setProperty(prop, value);
    }
  });
};

/**
 * 애니메이션 진행률을 계산하는 순수 함수
 * 테스트 가능성을 위해 DOM에 의존하지 않음
 */
export const calculateProgress = (
  startTime: number,
  duration: number,
  currentTime: number
): number => {
  return Math.min(Math.max((currentTime - startTime) / duration, 0), 1);
};

/**
 * 이징 함수를 적용하여 값을 보간하는 함수
 */
export const interpolate = (
  from: number,
  to: number,
  progress: number,
  easing: (t: number) => number = (t) => t
): number => {
  const easedProgress = easing(progress);
  return from + (to - from) * easedProgress;
};

/**
 * CSS transform 값을 파싱하는 함수
 * 중복된 파싱 로직을 공통화
 */
export const parseTransform = (transform: string): Record<string, number> => {
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
};

/**
 * Transform 속성을 안전하게 병합하는 함수
 */
export const mergeTransforms = (
  existingTransforms: Record<string, number>,
  newTransforms: Record<string, number>
): Record<string, number> => {
  return {
    ...existingTransforms,
    ...newTransforms,
  };
};

/**
 * CSS 속성을 안전하게 적용하는 함수
 */
export const applyCSSProperty = (
  element: HTMLElement,
  property: string,
  value: string | number
): void => {
  if (!element) return;

  switch (property) {
    case "opacity":
      element.style.opacity = value.toString();
      break;
    case "transform":
      element.style.transform = value.toString();
      break;
    case "backgroundColor":
      element.style.backgroundColor = value.toString();
      break;
    case "color":
      element.style.color = value.toString();
      break;
    case "width":
      element.style.width =
        typeof value === "number" ? `${value}px` : value.toString();
      break;
    case "height":
      element.style.height =
        typeof value === "number" ? `${value}px` : value.toString();
      break;
    default:
      (element.style as any)[property] = value;
  }
};

/**
 * 애니메이션 상수들
 * 매직 넘버 제거를 위한 상수 정의
 */
export const ANIMATION_CONSTANTS = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.5,
    SLOW: 0.8,
    VERY_SLOW: 1.2,
  },
  DELAY: {
    NONE: 0,
    FAST: 0.1,
    NORMAL: 0.2,
    SLOW: 0.3,
  },
  STAGGER: {
    FAST: 0.05,
    NORMAL: 0.1,
    SLOW: 0.2,
    VERY_SLOW: 0.3,
  },
} as const;

/**
 * 타입 가드 함수들
 */
export const isNumericProperty = (
  property: any
): property is NumericPropertySpec => {
  return property && typeof property.to === "number";
};

export const isStringProperty = (
  property: any
): property is StringPropertySpec => {
  return property && typeof property.to === "string";
};

export const isRallySpec = (spec: any): spec is RallySpec => {
  return spec && "motions" in spec && Array.isArray(spec.motions);
};

export const isTimelineSpec = (spec: any): spec is TimelineSpec => {
  return spec && "rallies" in spec && Array.isArray(spec.rallies);
};

/**
 * Timeline의 모든 Rally들을 수집하는 함수
 */
export const collectAllRallies = (timeline: TimelineSpec): RallySpec[] => {
  const rallies: RallySpec[] = [];

  const collect = (items: (RallySpec | TimelineSpec)[]) => {
    items.forEach((item) => {
      if ("rallies" in item) {
        // Timeline인 경우 재귀적으로 수집
        collect(item.rallies);
      } else {
        // Rally인 경우 추가
        rallies.push(item);
      }
    });
  };

  collect(timeline.rallies);
  return rallies;
};

/**
 * Timeline 완료 후 동작을 실행하는 함수
 */
export const executeTimelineEndBehavior = async (
  rallies: RallySpec[],
  options: TimelineOptions = {},
  initialStates?: Map<string | HTMLElement, Record<string, string>>
): Promise<void> => {
  const {
    endBehavior = TimelineEndBehavior.MAINTAIN,
    fadeOutDuration = ANIMATION_CONSTANTS.DURATION.NORMAL,
    fadeOutEasing = EasingType.EASE_OUT,
  } = options;

  switch (endBehavior) {
    case TimelineEndBehavior.RESET:
      // 모든 Rally를 초기 상태로 즉시 리셋
      rallies.forEach((rally) => {
        const element = findElement(rally.target);
        if (element && initialStates) {
          const initialState = initialStates.get(rally.target);
          if (initialState) {
            restoreInitialState(element, initialState);
          } else {
            // 초기 상태가 없으면 기본값으로 리셋
            element.style.opacity = "1";
            element.style.transform = "";
            element.style.transition = "";
          }
        }
      });
      break;

    case TimelineEndBehavior.MAINTAIN:
      // 현재 상태 유지 (아무것도 하지 않음)
      break;

    case TimelineEndBehavior.FADE_OUT_AND_RESET:
      // 부드럽게 페이드아웃 후 초기 상태로 리셋
      await fadeOutRallies(rallies, fadeOutDuration, fadeOutEasing);
      // 페이드아웃 완료 후 초기 상태로 복원
      rallies.forEach((rally) => {
        const element = findElement(rally.target);
        if (element && initialStates) {
          const initialState = initialStates.get(rally.target);
          if (initialState) {
            restoreInitialState(element, initialState);
          } else {
            // 초기 상태가 없으면 기본값으로 리셋
            element.style.opacity = "1";
            element.style.transform = "";
            element.style.transition = "";
          }
        }
      });
      break;

    case TimelineEndBehavior.FADE_OUT_AND_MAINTAIN:
      // 부드럽게 페이드아웃 후 유지
      await fadeOutRallies(rallies, fadeOutDuration, fadeOutEasing);
      break;
  }
};

/**
 * Rally들을 부드럽게 페이드아웃하는 함수
 */
export const fadeOutRallies = async (
  rallies: RallySpec[],
  duration: number = ANIMATION_CONSTANTS.DURATION.NORMAL,
  easing: EasingType = EasingType.EASE_OUT
): Promise<void> => {
  const fadeOutPromises = rallies.map((rally) => {
    return new Promise<void>((resolve) => {
      const element = findElement(rally.target);
      if (!element) {
        resolve();
        return;
      }

      // 현재 opacity 값 저장
      const currentOpacity = parseFloat(getComputedStyle(element).opacity) || 1;

      // 페이드아웃 애니메이션 설정
      element.style.transition = `opacity ${duration}s ${easing}`;
      element.style.opacity = "0";

      // 애니메이션 완료 후 resolve
      setTimeout(() => {
        resolve();
      }, duration * 1000);
    });
  });

  await Promise.all(fadeOutPromises);
};

/**
 * Timeline 옵션의 기본값을 설정하는 함수
 */
export const getDefaultTimelineOptions = (): TimelineOptions => ({
  endBehavior: TimelineEndBehavior.MAINTAIN,
  fadeOutDuration: ANIMATION_CONSTANTS.DURATION.NORMAL,
  fadeOutEasing: EasingType.EASE_OUT,
});
