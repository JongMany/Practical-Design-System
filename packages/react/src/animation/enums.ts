/**
 * Easing 함수 타입
 */
export enum EasingType {
  // Linear
  LINEAR = "linear",

  // Ease
  EASE = "ease",
  EASE_IN = "ease-in",
  EASE_OUT = "ease-out",
  EASE_IN_OUT = "ease-in-out",

  // Spring
  SPRING_BASIC = "spring-basic",
  SPRING_LARGE = "spring-large",
  SPRING_QUICK = "spring-quick",
  SPRING_GENTLE = "spring-gentle",
  SPRING_WOBBLY = "spring-wobbly",
  SPRING_STIFF = "spring-stiff",

  // Bezier
  BEZIER_OUT = "bezier-out",
  BEZIER_IN = "bezier-in",
  BEZIER_IN_OUT = "bezier-in-out",
}

/**
 * Timeline 모드 타입
 */
export enum TimelineMode {
  SERIAL = "serial",
  PARALLEL = "parallel",
  STAGGER = "stagger",
}

/**
 * 애니메이션 종료 동작 타입
 */
export enum AnimationEndBehavior {
  MAINTAIN = "maintain",
  RESET = "reset",
  REVERSE = "reverse",
}

/**
 * 애니메이션 상태 타입
 */
export enum AnimationState {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
  FINISHED = "finished",
}

/**
 * Easing 함수 매핑
 */
export const EasingMap = {
  [EasingType.LINEAR]: "linear",
  [EasingType.EASE]: "ease",
  [EasingType.EASE_IN]: "ease-in",
  [EasingType.EASE_OUT]: "ease-out",
  [EasingType.EASE_IN_OUT]: "ease-in-out",
  [EasingType.SPRING_BASIC]: "spring-basic",
  [EasingType.SPRING_LARGE]: "spring-large",
  [EasingType.SPRING_QUICK]: "spring-quick",
  [EasingType.SPRING_GENTLE]: "spring-gentle",
  [EasingType.SPRING_WOBBLY]: "spring-wobbly",
  [EasingType.SPRING_STIFF]: "spring-stiff",
  [EasingType.BEZIER_OUT]: "bezier-out",
  [EasingType.BEZIER_IN]: "bezier-in",
  [EasingType.BEZIER_IN_OUT]: "bezier-in-out",
} as const;

/**
 * Timeline 모드 매핑
 */
export const TimelineModeMap = {
  [TimelineMode.SERIAL]: "serial",
  [TimelineMode.PARALLEL]: "parallel",
  [TimelineMode.STAGGER]: "stagger",
} as const;

/**
 * 애니메이션 종료 동작 매핑
 */
export const AnimationEndBehaviorMap = {
  [AnimationEndBehavior.MAINTAIN]: "maintain",
  [AnimationEndBehavior.RESET]: "reset",
  [AnimationEndBehavior.REVERSE]: "reverse",
} as const;
