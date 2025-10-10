/**
 * Rally Animation Presets
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 프리셋
 */

import type { EasingConfig, MotionSpec } from "./types";

// 이징 프리셋 - 토스에서 사용하는 이징 함수들
export const EASING_PRESETS: Record<string, EasingConfig> = {
  // 스프링 이징
  "spring.quick": {
    type: "spring",
    tension: 300,
    friction: 20,
  },
  "spring.basic": {
    type: "spring",
    tension: 200,
    friction: 25,
  },
  "spring.slow": {
    type: "spring",
    tension: 100,
    friction: 30,
  },
  "spring.bouncy": {
    type: "spring",
    tension: 400,
    friction: 10,
  },

  // 베지어 곡선 이징
  "bezier.expo": {
    type: "cubic-bezier",
    values: [0.19, 1, 0.22, 1],
  },
  "bezier.ease": {
    type: "cubic-bezier",
    values: [0.25, 0.1, 0.25, 1],
  },
  "bezier.ease-in": {
    type: "cubic-bezier",
    values: [0.42, 0, 1, 1],
  },
  "bezier.ease-out": {
    type: "cubic-bezier",
    values: [0, 0, 0.58, 1],
  },
  "bezier.ease-in-out": {
    type: "cubic-bezier",
    values: [0.42, 0, 0.58, 1],
  },

  // 기본 이징
  linear: { type: "linear" },
  ease: { type: "ease" },
  "ease-in": { type: "ease-in" },
  "ease-out": { type: "ease-out" },
  "ease-in-out": { type: "ease-in-out" },
};

// 모션 프리셋 - 자주 사용되는 애니메이션 패턴들
export const MOTION_PRESETS: Record<string, Omit<MotionSpec, "property">> = {
  // 페이드 애니메이션
  fadeIn: {
    from: 0,
    to: 1,
    duration: 300,
    easing: "spring.quick",
  },
  fadeOut: {
    from: 1,
    to: 0,
    duration: 300,
    easing: "spring.quick",
  },
  fadeInSlow: {
    from: 0,
    to: 1,
    duration: 500,
    easing: "spring.basic",
  },
  fadeOutSlow: {
    from: 1,
    to: 0,
    duration: 500,
    easing: "spring.basic",
  },

  // 슬라이드 애니메이션
  slideUp: {
    from: "translateY(20px)",
    to: "translateY(0)",
    duration: 300,
    easing: "spring.quick",
  },
  slideDown: {
    from: "translateY(-20px)",
    to: "translateY(0)",
    duration: 300,
    easing: "spring.quick",
  },
  slideLeft: {
    from: "translateX(20px)",
    to: "translateX(0)",
    duration: 300,
    easing: "spring.quick",
  },
  slideRight: {
    from: "translateX(-20px)",
    to: "translateX(0)",
    duration: 300,
    easing: "spring.quick",
  },
  slideUpOut: {
    from: "translateY(0)",
    to: "translateY(-20px)",
    duration: 300,
    easing: "spring.quick",
  },
  slideDownOut: {
    from: "translateY(0)",
    to: "translateY(20px)",
    duration: 300,
    easing: "spring.quick",
  },
  slideLeftOut: {
    from: "translateX(0)",
    to: "translateX(-20px)",
    duration: 300,
    easing: "spring.quick",
  },
  slideRightOut: {
    from: "translateX(0)",
    to: "translateX(20px)",
    duration: 300,
    easing: "spring.quick",
  },

  // 스케일 애니메이션
  scaleIn: {
    from: "scale(0.8)",
    to: "scale(1)",
    duration: 300,
    easing: "spring.quick",
  },
  scaleOut: {
    from: "scale(1)",
    to: "scale(0.8)",
    duration: 300,
    easing: "spring.quick",
  },
  scaleInBouncy: {
    from: "scale(0.5)",
    to: "scale(1)",
    duration: 400,
    easing: "spring.bouncy",
  },
  scaleOutBouncy: {
    from: "scale(1)",
    to: "scale(0.5)",
    duration: 400,
    easing: "spring.bouncy",
  },

  // 회전 애니메이션
  rotateIn: {
    from: "rotate(-180deg)",
    to: "rotate(0deg)",
    duration: 400,
    easing: "spring.basic",
  },
  rotateOut: {
    from: "rotate(0deg)",
    to: "rotate(180deg)",
    duration: 400,
    easing: "spring.basic",
  },
  rotate360: {
    from: "rotate(0deg)",
    to: "rotate(360deg)",
    duration: 600,
    easing: "linear",
  },

  // 복합 애니메이션
  slideUpFadeIn: {
    from: "translateY(20px)",
    to: "translateY(0)",
    duration: 300,
    easing: "spring.quick",
  },
  slideDownFadeOut: {
    from: "translateY(0)",
    to: "translateY(20px)",
    duration: 300,
    easing: "spring.quick",
  },
  scaleInFadeIn: {
    from: "scale(0.8)",
    to: "scale(1)",
    duration: 300,
    easing: "spring.quick",
  },
  scaleOutFadeOut: {
    from: "scale(1)",
    to: "scale(0.8)",
    duration: 300,
    easing: "spring.quick",
  },
};

// 완전한 모션 스펙을 생성하는 헬퍼 함수
export function createMotionSpec(
  property: MotionSpec["property"],
  preset: string,
  overrides?: Partial<MotionSpec>
): MotionSpec {
  const presetConfig = MOTION_PRESETS[preset];
  if (!presetConfig) {
    throw new Error(`Motion preset "${preset}" not found`);
  }

  return {
    property,
    ...presetConfig,
    ...overrides,
  };
}

// 이징 설정을 가져오는 헬퍼 함수
export function getEasingConfig(easing: string): EasingConfig {
  const preset = EASING_PRESETS[easing];
  if (!preset) {
    throw new Error(`Easing preset "${easing}" not found`);
  }
  return preset;
}

// 프리셋이 존재하는지 확인하는 헬퍼 함수
export function hasMotionPreset(preset: string): boolean {
  return preset in MOTION_PRESETS;
}

export function hasEasingPreset(easing: string): boolean {
  return easing in EASING_PRESETS;
}

// 사용 가능한 프리셋 목록을 반환하는 헬퍼 함수
export function getAvailableMotionPresets(): string[] {
  return Object.keys(MOTION_PRESETS);
}

export function getAvailableEasingPresets(): string[] {
  return Object.keys(EASING_PRESETS);
}
