/**
 * Rally Animation System Types
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 타입 정의
 */

import {
  EasingType,
  TimelineMode,
  AnimationEndBehavior,
  AnimationState,
} from "./enums";

// 기본 애니메이션 속성 타입
export type AnimationProperty =
  | "opacity"
  | "transform"
  | "backgroundColor"
  | "color"
  | "width"
  | "height"
  | "scale"
  | "translateX"
  | "translateY"
  | "rotate"
  | "scaleX"
  | "scaleY"
  | "borderRadius";

// 애니메이션 속성 값 타입 정의
export type AnimationPropertyValue = number | string;

// 애니메이션 속성 정의를 위한 제네릭 타입
export interface AnimationPropertySpec<
  T extends AnimationPropertyValue = AnimationPropertyValue,
> {
  from?: T;
  to: T;
}

// 숫자형 애니메이션 속성
export type NumericAnimationProperty =
  | "translateX"
  | "translateY"
  | "scale"
  | "opacity"
  | "rotate"
  | "width"
  | "height";

// 문자열형 애니메이션 속성
export type StringAnimationProperty =
  | "backgroundColor"
  | "color"
  | "borderRadius";

// 숫자형 속성 스펙
export type NumericPropertySpec = AnimationPropertySpec<number>;

// 문자열형 속성 스펙
export type StringPropertySpec = AnimationPropertySpec<string>;

// 스프링 설정
export interface SpringConfig {
  type: "spring";
  tension: number;
  friction: number;
  mass?: number;
}

// 베지어 곡선 설정
export interface BezierConfig {
  type: "cubic-bezier";
  values: [number, number, number, number];
}

// 이징 설정
export type EasingConfig = SpringConfig | BezierConfig | { type: EasingType };

// Toss 스타일 모션 스펙 - 타입 안전성 강화
export interface MotionSpec {
  /** 지속 시간 (초) */
  duration: number;
  /** 이징 함수 */
  easing: EasingType;
  /** 지연 시간 (초) */
  delay?: number;
  /** CSS transition 속성 */
  transition?: string;

  // 숫자형 속성들 - 타입 안전성 강화
  /** X축 이동 */
  translateX?: NumericPropertySpec;
  /** Y축 이동 */
  translateY?: NumericPropertySpec;
  /** 스케일 */
  scale?: NumericPropertySpec;
  /** 투명도 */
  opacity?: NumericPropertySpec;
  /** 회전 */
  rotate?: NumericPropertySpec;
  /** 너비 */
  width?: NumericPropertySpec;
  /** 높이 */
  height?: NumericPropertySpec;

  // 문자열형 속성들 - 타입 안전성 강화
  /** 배경색 */
  backgroundColor?: StringPropertySpec;
  /** 색상 */
  color?: StringPropertySpec;
  /** 테두리 반지름 */
  borderRadius?: StringPropertySpec;
}

// 애니메이션 종료 시 동작 타입 (enum에서 import)

// Toss 스타일 랠리 스펙
export interface RallySpec {
  /** 대상 식별자 (CSS 선택자 또는 HTMLElement) */
  target: string | HTMLElement;
  /** 반복 횟수 */
  playCount?: number | "infinite";
  /** 실행할 모션들 */
  motions: MotionSpec[];
  /** 애니메이션 종료 시 동작 */
  endBehavior?: AnimationEndBehavior;
}

// Timeline 완료 후 동작 옵션
export enum TimelineEndBehavior {
  /** 모든 Rally를 초기 상태로 리셋 */
  RESET = "reset",
  /** 모든 Rally를 현재 상태로 유지 */
  MAINTAIN = "maintain",
  /** 부드럽게 페이드아웃 후 리셋 */
  FADE_OUT_AND_RESET = "fadeOutAndReset",
  /** 부드럽게 페이드아웃 후 유지 */
  FADE_OUT_AND_MAINTAIN = "fadeOutAndMaintain",
}

// Timeline 옵션
export interface TimelineOptions {
  /** Timeline 완료 후 동작 */
  endBehavior?: TimelineEndBehavior;
  /** 페이드아웃 애니메이션 지속시간 (초) */
  fadeOutDuration?: number;
  /** 페이드아웃 애니메이션 이징 */
  fadeOutEasing?: EasingType;
  /** Timeline 완료 후 콜백 */
  onComplete?: () => void;
  /** Timeline 시작 시 콜백 */
  onStart?: () => void;
}

// Toss 스타일 타임라인 스펙
export interface TimelineSpec {
  /** 재생 방식 */
  playback: TimelineMode | { type: "stagger"; staggerDelay: number };
  /** 실행할 랠리들 (중첩된 Timeline 지원) */
  rallies: (RallySpec | TimelineSpec)[];
  /** Timeline 옵션 */
  options?: TimelineOptions;
}

// Toss 스타일 API 함수들
export type RallyFunction = (spec: RallySpec) => Rally;
export type TimelineFunction = (spec: TimelineSpec) => Timeline;

// 조건부 타임라인 스펙
export interface ConditionalTimelineSpec {
  /** 조건 함수 - true를 반환하면 해당 타임라인 실행 */
  condition: () => boolean;
  /** 조건이 true일 때 실행할 타임라인 */
  timeline: TimelineSpec;
  /** 조건이 false일 때 실행할 타임라인 (선택사항) */
  fallbackTimeline?: TimelineSpec;
}

// 조건부 랠리 스펙
export interface ConditionalRallySpec {
  /** 조건 함수 */
  condition: () => boolean;
  /** 조건이 true일 때 실행할 랠리 */
  rally: RallySpec;
  /** 조건이 false일 때 실행할 랠리 (선택사항) */
  fallbackRally?: RallySpec;
}

// 조건부 모션 스펙
export interface ConditionalMotionSpec {
  /** 조건 함수 */
  condition: () => boolean;
  /** 조건이 true일 때 실행할 모션 */
  motion: MotionSpec;
  /** 조건이 false일 때 실행할 모션 (선택사항) */
  fallbackMotion?: MotionSpec;
}

// 애니메이션 상태 (enum에서 import)

// 애니메이션 이벤트
export interface AnimationEvent {
  type: "start" | "end" | "pause" | "resume" | "cancel" | "reset";
  timestamp: number;
  target?: string;
}

// 애니메이션 엔진 인터페이스
export interface AnimationEngine {
  /** 모션 생성 */
  createMotion(spec: MotionSpec): Motion;
  /** 랠리 생성 */
  createRally(spec: RallySpec): Rally;
  /** 타임라인 생성 */
  createTimeline(spec: TimelineSpec): Timeline;
  /** 타임라인 실행 */
  play(timeline: Timeline): Promise<void>;
  /** 타임라인 일시정지 */
  pause(timeline: Timeline): void;
  /** 타임라인 재개 */
  resume(timeline: Timeline): void;
  /** 타임라인 중지 */
  stop(timeline: Timeline): void;
  /** 타임라인 취소 */
  cancel(timeline: Timeline): void;
  /** 타임라인 리셋 */
  reset(timeline: Timeline): void;
}

// 모션 인스턴스
export interface Motion {
  spec: MotionSpec;
  state: AnimationState;
  start(): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
  cancel(): void;
  on(event: string, callback: (event: AnimationEvent) => void): void;
  off(event: string, callback: (event: AnimationEvent) => void): void;
}

// 랠리 인스턴스
export interface Rally {
  spec: RallySpec;
  state: AnimationState;
  motions: Motion[];
  start(): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
  cancel(): void;
  reset(): void;
  backward(): Rally;
  on(event: string, callback: (event: AnimationEvent) => void): void;
  off(event: string, callback: (event: AnimationEvent) => void): void;
}

// 타임라인 인스턴스
export interface Timeline {
  spec: TimelineSpec;
  state: AnimationState;
  rallies: (Rally | Timeline)[];
  start(): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
  cancel(): void;
  reset(): void;
  backward(): Timeline;
  /** Timeline 완료 후 동작 실행 */
  executeEndBehavior(): Promise<void>;
  /** 부드러운 페이드아웃 애니메이션 실행 */
  fadeOut(duration?: number, easing?: EasingType): Promise<void>;
  on(event: string, callback: (event: AnimationEvent) => void): void;
  off(event: string, callback: (event: AnimationEvent) => void): void;
}

// React 훅을 위한 애니메이션 옵션
export interface UseAnimationOptions {
  /** 자동 실행 여부 */
  autoPlay?: boolean;
  /** 반복 횟수 */
  loop?: boolean | number;
  /** 애니메이션 완료 후 콜백 */
  onComplete?: () => void;
  /** 애니메이션 시작 시 콜백 */
  onStart?: () => void;
  /** 애니메이션 일시정지 시 콜백 */
  onPause?: () => void;
  /** 애니메이션 재개 시 콜백 */
  onResume?: () => void;
  /** 애니메이션 중지 시 콜백 */
  onStop?: () => void;
  /** 애니메이션 취소 시 콜백 */
  onCancel?: () => void;
}

// 애니메이션 컨트롤러
export interface AnimationController {
  /** 애니메이션 상태 */
  state: AnimationState;
  /** 애니메이션 실행 */
  play(): Promise<void>;
  /** 애니메이션 일시정지 */
  pause(): void;
  /** 애니메이션 재개 */
  resume(): void;
  /** 애니메이션 중지 */
  stop(): void;
  /** 애니메이션 취소 */
  cancel(): void;
  /** 애니메이션 리셋 */
  reset(): void;
  /** 애니메이션 재시작 */
  restart(): Promise<void>;
}

// 인터랙션 타입
export type InteractionType =
  | "click"
  | "hover"
  | "focus"
  | "blur"
  | "keydown"
  | "keyup"
  | "scroll"
  | "resize"
  | "touchstart"
  | "touchend"
  | "custom";

// 인터랙티브 애니메이션 트리거
export interface InteractiveAnimationTrigger {
  /** 트리거 ID */
  id: string;
  /** 트리거 이름 */
  name: string;
  /** 트리거 타입 */
  type: InteractionType;
  /** 대상 요소 선택자 */
  target: string;
  /** 실행할 애니메이션 */
  animation: string;
  /** 트리거 조건 (선택사항) */
  condition?: () => boolean;
  /** 애니메이션 완료 후 콜백 */
  onComplete?: () => void;
  /** 트리거 활성화 여부 */
  enabled?: boolean;
  /** 키보드 이벤트 시 특정 키 (keydown/keyup 타입일 때) */
  key?: string;
  /** 스크롤 이벤트 시 임계값 (scroll 타입일 때) */
  scrollThreshold?: number;
}

// 인터랙티브 애니메이션 그룹
export interface InteractiveAnimationGroup {
  /** 그룹 ID */
  id: string;
  /** 그룹 이름 */
  name: string;
  /** 그룹 내 트리거들 */
  triggers: InteractiveAnimationTrigger[];
  /** 그룹 전체 활성화 여부 */
  enabled?: boolean;
  /** 그룹 레벨 콜백 */
  onGroupComplete?: () => void;
}

// 인터랙션 대기 타임라인 스텝
export interface InteractiveTimelineStep {
  /** 스텝 ID */
  id: string;
  /** 스텝 이름 */
  name: string;
  /** 실행할 애니메이션 (선택사항) */
  animation?: {
    elements: string;
    animation: string;
    delay?: number;
  };
  /** 인터랙션 대기 설정 (선택사항) */
  waitForInteraction?: {
    type: InteractionType;
    target: string;
    message?: string;
    timeout?: number;
  };
  /** 다음 스텝으로 넘어가는 조건 (선택사항) */
  nextCondition?: () => boolean;
  /** 스텝 완료 후 대기 시간 (ms) */
  delay?: number;
  /** 스텝이 완료되었는지 여부 */
  completed?: boolean;
}

// 인터랙션 대기 타임라인 스펙
export interface InteractiveTimelineSpec {
  /** 타임라인 ID */
  id: string;
  /** 타임라인 이름 */
  name: string;
  /** 실행할 스텝들 */
  steps: InteractiveTimelineStep[];
  /** 전체 타임라인 반복 횟수 */
  iterationCount?: number | "infinite";
  /** 스텝 간 기본 지연 시간 (ms) */
  defaultDelay?: number;
  /** 타임라인 완료 콜백 */
  onComplete?: () => void;
  /** 각 스텝 완료 콜백 */
  onStepComplete?: (stepId: string) => void;
  /** 인터랙션 대기 콜백 */
  onWaitForInteraction?: (
    stepId: string,
    interactionType: InteractionType
  ) => void;
}

// 애니메이션 속성 역방향 변환을 위한 유틸리티 타입
export type ReversedPropertySpec<T extends AnimationPropertySpec> = {
  from: T["to"];
  to: T["from"] extends undefined
    ? T["to"] extends number
      ? 0
      : ""
    : T["from"];
} & AnimationPropertySpec<T["to"] extends number ? number : string>;

// 애니메이션 속성 역방향 변환 함수 타입
export type ReversePropertyFunction = <T extends AnimationPropertySpec>(
  property: T | undefined
) => ReversedPropertySpec<T> | undefined;
