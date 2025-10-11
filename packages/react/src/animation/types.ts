/**
 * Rally Animation System Types
 * 토스의 Rally 시스템을 기반으로 한 애니메이션 타입 정의
 */

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
  | "scaleY";

// 이징 함수 타입
export type EasingType =
  | "spring"
  | "cubic-bezier"
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

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

// 모션 스펙 - 애니메이션의 최소 단위
export interface MotionSpec {
  /** 애니메이션할 속성 */
  property: AnimationProperty;
  /** 시작 값 */
  from: any;
  /** 끝 값 */
  to: any;
  /** 지속 시간 (ms) */
  duration: number;
  /** 이징 함수 */
  easing: string | EasingConfig;
  /** 지연 시간 (ms) */
  delay?: number;
  /** 반복 횟수 */
  iterationCount?: number | "infinite";
  /** 반복 방향 */
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
}

// 애니메이션 종료 시 동작 타입
export type AnimationEndBehavior =
  | "maintain" // 최종 상태 유지
  | "reset" // 초기 상태로 리셋
  | "reverse"; // 역재생으로 되돌아가기

// 랠리 스펙 - 하나의 대상에 대한 애니메이션 시퀀스
export interface RallySpec {
  /** 대상 식별자 (CSS 선택자, HTMLElement) */
  target: string | HTMLElement;
  /** 실행할 모션들 */
  motions: MotionSpec[];
  /** 모션들을 병렬로 실행할지 여부 */
  parallel?: boolean;
  /** 전체 랠리의 지연 시간 */
  delay?: number;
  /** 랠리 반복 횟수 */
  iterationCount?: number | "infinite";
  /** 애니메이션 종료 시 동작 */
  endBehavior?: AnimationEndBehavior;
}

// 타임라인 스펙 - 여러 랠리의 스케줄링
export interface TimelineSpec {
  /** 실행할 랠리들 */
  rallies: RallySpec[];
  /** 실행 방식 */
  sequence: "parallel" | "sequential" | "staggered";
  /** 순차 실행 시 지연 시간 (ms) */
  staggerDelay?: number;
  /** 전체 타임라인의 지연 시간 */
  delay?: number;
  /** 타임라인 반복 횟수 */
  iterationCount?: number | "infinite";
}

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

// 애니메이션 상태
export type AnimationState =
  | "idle"
  | "running"
  | "paused"
  | "finished"
  | "cancelled";

// 애니메이션 이벤트
export interface AnimationEvent {
  type: "start" | "end" | "pause" | "resume" | "cancel";
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
  on(event: string, callback: (event: AnimationEvent) => void): void;
  off(event: string, callback: (event: AnimationEvent) => void): void;
}

// 타임라인 인스턴스
export interface Timeline {
  spec: TimelineSpec;
  state: AnimationState;
  rallies: Rally[];
  start(): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
  cancel(): void;
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
