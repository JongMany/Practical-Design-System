import { MotionSpec } from "./types";
import { EasingType } from "./enums";

/**
 * 애니메이션 프리셋 타입
 */
export enum AnimationPreset {
  SLIDE = "slide",
  ROLL = "roll",
  SCALE = "scale",
  FLIP = "flip",
  SNAP = "snap",
  ZOOM = "zoom",
}

/**
 * 애니메이션 이펙트 타입
 */
export enum AnimationEffect {
  WIGGLE = "wiggle",
  WIGGLE3D = "wiggle3d",
  SHIVER = "shiver",
  BOUNCE = "bounce",
  FLOAT = "float",
  PULSE = "pulse",
}

/**
 * 애니메이션 프리셋 클래스
 */
export class AnimationPresets {
  /**
   * 슬라이드 애니메이션 프리셋
   */
  static slide(
    direction: "left" | "right" | "up" | "down" = "up"
  ): MotionSpec[] {
    const distance = 100;
    const baseSpec: MotionSpec = {
      easing: EasingType.EASE_OUT,
      duration: 0.6,
      opacity: { from: 0, to: 1 },
    };

    switch (direction) {
      case "left":
        return [
          {
            ...baseSpec,
            translateX: { from: distance, to: 0 },
          },
        ];
      case "right":
        return [
          {
            ...baseSpec,
            translateX: { from: -distance, to: 0 },
          },
        ];
      case "up":
        return [
          {
            ...baseSpec,
            translateY: { from: distance, to: 0 },
          },
        ];
      case "down":
        return [
          {
            ...baseSpec,
            translateY: { from: -distance, to: 0 },
          },
        ];
    }
  }

  /**
   * 롤 애니메이션 프리셋
   */
  static roll(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.8,
        rotate: { from: 0, to: 360 },
        scale: { from: 0.8, to: 1 },
      },
    ];
  }

  /**
   * 스케일 애니메이션 프리셋
   */
  static scale(type: "in" | "out" | "bounce" = "in"): MotionSpec[] {
    switch (type) {
      case "in":
        return [
          {
            easing: EasingType.EASE_OUT,
            duration: 0.5,
            scale: { from: 0, to: 1 },
            opacity: { from: 0, to: 1 },
          },
        ];
      case "out":
        return [
          {
            easing: EasingType.EASE_IN,
            duration: 0.5,
            scale: { from: 1, to: 0 },
            opacity: { from: 1, to: 0 },
          },
        ];
      case "bounce":
        return [
          {
            easing: EasingType.SPRING_WOBBLY,
            duration: 0.6,
            scale: { from: 0, to: 1.2 },
          },
          {
            easing: EasingType.SPRING_GENTLE,
            duration: 0.3,
            scale: { from: 1.2, to: 1 },
          },
        ];
    }
  }

  /**
   * 플립 애니메이션 프리셋
   */
  static flip(axis: "x" | "y" = "y"): MotionSpec[] {
    const rotation = axis === "x" ? 180 : 180;
    return [
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.8,
        rotate: { from: 0, to: rotation },
        scale: { from: 0.8, to: 1 },
      },
    ];
  }

  /**
   * 스냅 애니메이션 프리셋
   */
  static snap(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.2,
        scale: { from: 1, to: 0.9 },
      },
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.2,
        scale: { from: 0.9, to: 1.1 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.3,
        scale: { from: 1.1, to: 1 },
      },
    ];
  }

  /**
   * 줌 애니메이션 프리셋
   */
  static zoom(type: "in" | "out" = "in"): MotionSpec[] {
    const scale = type === "in" ? { from: 0.5, to: 1 } : { from: 1, to: 0.5 };
    return [
      {
        easing: EasingType.EASE_OUT,
        duration: 0.6,
        scale,
        opacity: { from: 0, to: 1 },
      },
    ];
  }
}

/**
 * 애니메이션 이펙트 클래스
 */
export class AnimationEffects {
  /**
   * 위글 애니메이션 이펙트
   */
  static wiggle(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.1,
        rotate: { from: 0, to: 5 },
      },
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.1,
        rotate: { from: 5, to: -5 },
      },
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.1,
        rotate: { from: -5, to: 5 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.2,
        rotate: { from: 5, to: 0 },
      },
    ];
  }

  /**
   * 3D 위글 애니메이션 이펙트
   */
  static wiggle3d(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.15,
        rotate: { from: 0, to: 10 },
        scale: { from: 1, to: 1.05 },
      },
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.15,
        rotate: { from: 10, to: -10 },
        scale: { from: 1.05, to: 0.95 },
      },
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.15,
        rotate: { from: -10, to: 10 },
        scale: { from: 0.95, to: 1.05 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.3,
        rotate: { from: 10, to: 0 },
        scale: { from: 1.05, to: 1 },
      },
    ];
  }

  /**
   * 시버 애니메이션 이펙트
   */
  static shiver(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.05,
        translateX: { from: 0, to: 2 },
      },
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.05,
        translateX: { from: 2, to: -2 },
      },
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.05,
        translateX: { from: -2, to: 2 },
      },
      {
        easing: EasingType.SPRING_STIFF,
        duration: 0.05,
        translateX: { from: 2, to: -2 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.1,
        translateX: { from: -2, to: 0 },
      },
    ];
  }

  /**
   * 바운스 애니메이션 이펙트
   */
  static bounce(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.4,
        translateY: { from: 0, to: -20 },
        scale: { from: 1, to: 1.1 },
      },
      {
        easing: EasingType.SPRING_WOBBLY,
        duration: 0.4,
        translateY: { from: -20, to: 0 },
        scale: { from: 1.1, to: 1 },
      },
    ];
  }

  /**
   * 플로트 애니메이션 이펙트
   */
  static float(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 1.0,
        translateY: { from: 0, to: -10 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 1.0,
        translateY: { from: -10, to: 0 },
      },
    ];
  }

  /**
   * 펄스 애니메이션 이펙트
   */
  static pulse(): MotionSpec[] {
    return [
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.5,
        scale: { from: 1, to: 1.1 },
      },
      {
        easing: EasingType.SPRING_GENTLE,
        duration: 0.5,
        scale: { from: 1.1, to: 1 },
      },
    ];
  }
}
