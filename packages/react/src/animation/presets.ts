/**
 * Rally Animation Presets
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 프리셋들
 */

import type { EasingType } from "./types";

// 이징 프리셋 - Toss 스타일
export const EASING_PRESETS: Record<string, EasingType> = {
  // 기본 이징
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",

  // 스프링 이징
  springBasic: "spring.basic",
  springLarge: "spring.large",
  springQuick: "spring.quick",

  // 베지어 이징
  bezierIn: "bezier.in",
  bezierOut: "bezier.out",
  bezierInOut: "bezier.in-out",
};

// 이징 프리셋 유틸리티 함수들
export function getEasingConfig(easing: string): EasingType {
  return EASING_PRESETS[easing] || (easing as EasingType);
}

export function hasEasingPreset(name: string): boolean {
  return name in EASING_PRESETS;
}

export function getAvailableEasingPresets(): string[] {
  return Object.keys(EASING_PRESETS);
}

// Toss 스타일 모션 프리셋들 (기존 MOTION_PRESETS는 제거됨)
// 이제 RallyPresets를 사용하세요
