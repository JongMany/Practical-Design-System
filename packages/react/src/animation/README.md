# Rally Animation System

토스의 Rally 시스템을 기반으로 한 React 애니메이션 라이브러리입니다.

## 주요 특징

- **토스 Rally 시스템 기반**: 토스에서 실제 사용하는 애니메이션 시스템을 React로 구현
- **타입 안전성**: TypeScript로 완전히 작성되어 타입 안전성 보장
- **프리셋 시스템**: 자주 사용되는 애니메이션 패턴을 프리셋으로 제공
- **React 훅 기반**: React의 훅 시스템을 활용한 직관적인 API
- **컴포넌트 기반**: 선언적 방식으로 애니메이션 구현
- **성능 최적화**: requestAnimationFrame 기반의 부드러운 애니메이션

## 기본 사용법

### 1. 컴포넌트 기반 사용

```tsx
import { FadeIn, SlideUp, ScaleIn } from "@your-org/react";

function App() {
  return (
    <div>
      <FadeIn duration={500} easing="spring.quick">
        <h1>페이드 인 애니메이션</h1>
      </FadeIn>

      <SlideUp delay={200}>
        <p>슬라이드 업 애니메이션</p>
      </SlideUp>

      <ScaleIn easing="spring.bouncy">
        <button>스케일 인 애니메이션</button>
      </ScaleIn>
    </div>
  );
}
```

### 2. 훅 기반 사용

```tsx
import { useMotion, useRally, useTimeline } from "@your-org/react";

function AnimatedComponent() {
  const fadeIn = useMotion(
    {
      property: "opacity",
      from: 0,
      to: 1,
      duration: 300,
      easing: "spring.quick",
    },
    { autoPlay: true }
  );

  const slideUp = useMotion(
    {
      property: "transform",
      from: "translateY(20px)",
      to: "translateY(0)",
      duration: 300,
      easing: "spring.quick",
    },
    { autoPlay: true, delay: 100 }
  );

  return (
    <div>
      <div ref={fadeIn.ref}>페이드 인</div>
      <div ref={slideUp.ref}>슬라이드 업</div>
    </div>
  );
}
```

### 3. 복합 애니메이션 (Rally)

```tsx
import { useRally } from "@your-org/react";

function ComplexAnimation() {
  const rally = useRally(
    {
      target: ".my-element",
      motions: [
        {
          property: "opacity",
          from: 0,
          to: 1,
          duration: 300,
          easing: "spring.quick",
        },
        {
          property: "transform",
          from: "scale(0.8)",
          to: "scale(1)",
          duration: 300,
          easing: "spring.quick",
        },
      ],
      parallel: true, // 병렬 실행
    },
    { autoPlay: true }
  );

  return <div className="my-element">복합 애니메이션</div>;
}
```

### 4. 타임라인 애니메이션

```tsx
import { useTimeline } from "@your-org/react";

function TimelineAnimation() {
  const timeline = useTimeline(
    {
      rallies: [
        {
          target: ".element1",
          motions: [
            {
              property: "opacity",
              from: 0,
              to: 1,
              duration: 300,
              easing: "spring.quick",
            },
          ],
        },
        {
          target: ".element2",
          motions: [
            {
              property: "opacity",
              from: 0,
              to: 1,
              duration: 300,
              easing: "spring.quick",
            },
          ],
        },
      ],
      sequence: "staggered",
      staggerDelay: 100,
    },
    { autoPlay: true }
  );

  return (
    <div>
      <div className="element1">첫 번째 요소</div>
      <div className="element2">두 번째 요소</div>
    </div>
  );
}
```

## 프리셋 사용법

### 이징 프리셋

```tsx
import { EASING_PRESETS } from "@your-org/react";

// 사용 가능한 이징 프리셋들
console.log(EASING_PRESETS);
// {
//   'spring.quick': { type: 'spring', tension: 300, friction: 20 },
//   'spring.basic': { type: 'spring', tension: 200, friction: 25 },
//   'bezier.expo': { type: 'cubic-bezier', values: [0.19, 1, 0.22, 1] },
//   ...
// }
```

### 모션 프리셋

```tsx
import { createMotionSpec, MOTION_PRESETS } from "@your-org/react";

// 프리셋을 사용한 모션 생성
const fadeInMotion = createMotionSpec("opacity", "fadeIn");
const slideUpMotion = createMotionSpec("transform", "slideUp");

// 사용 가능한 모션 프리셋들
console.log(MOTION_PRESETS);
// {
//   'fadeIn': { from: 0, to: 1, duration: 300, easing: 'spring.quick' },
//   'slideUp': { from: 'translateY(20px)', to: 'translateY(0)', duration: 300, easing: 'spring.quick' },
//   ...
// }
```

## 유틸리티 함수

```tsx
import { RallyUtils, RallyPresets } from "@your-org/react";

// 애니메이션 빌더
const motion = RallyUtils.createMotion("opacity", 0, 1, 300, "spring.quick");
const rally = RallyUtils.createRally(".target", [motion]);
const timeline = RallyUtils.createTimeline([rally], "sequential");

// 체이닝
const chained = RallyUtils.chain(rally1, rally2, rally3);

// 병렬 실행
const parallel = RallyUtils.parallel(rally1, rally2, rally3);

// 지연 실행
const staggered = RallyUtils.stagger([rally1, rally2, rally3], 100);

// 프리셋 사용
const fadeIn = RallyPresets.fadeIn(500, "spring.basic");
const slideUp = RallyPresets.slideUp(300, "spring.quick");
const complex = RallyPresets.slideUpFadeIn(400, "spring.bouncy");
```

## 고급 사용법

### 애니메이션 제어

```tsx
import { useMotion } from "@your-org/react";

function ControlledAnimation() {
  const animation = useMotion(
    {
      property: "opacity",
      from: 0,
      to: 1,
      duration: 1000,
      easing: "spring.quick",
    },
    {
      onStart: () => console.log("애니메이션 시작"),
      onComplete: () => console.log("애니메이션 완료"),
      onPause: () => console.log("애니메이션 일시정지"),
    }
  );

  return (
    <div>
      <div ref={animation.ref}>애니메이션 요소</div>
      <button onClick={animation.play}>재생</button>
      <button onClick={animation.pause}>일시정지</button>
      <button onClick={animation.resume}>재개</button>
      <button onClick={animation.stop}>중지</button>
      <button onClick={animation.restart}>재시작</button>
    </div>
  );
}
```

### 조건부 애니메이션

```tsx
import { useAnimationTrigger } from "@your-org/react";

function ConditionalAnimation({ isVisible }: { isVisible: boolean }) {
  const animation = useAnimationTrigger(
    {
      property: "opacity",
      from: 0,
      to: 1,
      duration: 300,
      easing: "spring.quick",
    },
    isVisible
  );

  return <div ref={animation.ref}>조건부 애니메이션</div>;
}
```

### 반복 애니메이션

```tsx
import { useAnimationLoop } from "@your-org/react";

function LoopAnimation() {
  const animation = useAnimationLoop(
    {
      property: "transform",
      from: "rotate(0deg)",
      to: "rotate(360deg)",
      duration: 1000,
      easing: "linear",
    },
    {
      loopCount: 3,
      loopDelay: 500,
    }
  );

  return <div ref={animation.ref}>회전하는 요소</div>;
}
```

## API 레퍼런스

### 컴포넌트

- `Motion`: 기본 모션 애니메이션 컴포넌트
- `Rally`: 복합 애니메이션 컴포넌트
- `Timeline`: 타임라인 애니메이션 컴포넌트
- `Animate`: 프리셋 기반 애니메이션 컴포넌트
- `FadeIn`, `FadeOut`: 페이드 애니메이션 컴포넌트
- `SlideUp`, `SlideDown`, `SlideLeft`, `SlideRight`: 슬라이드 애니메이션 컴포넌트
- `ScaleIn`, `ScaleOut`: 스케일 애니메이션 컴포넌트

### 훅

- `useAnimation`: 기본 애니메이션 훅
- `useMotion`: 모션 애니메이션 훅
- `useRally`: 랠리 애니메이션 훅
- `useTimeline`: 타임라인 애니메이션 훅
- `useAnimationSequence`: 순차 애니메이션 훅
- `useAnimationParallel`: 병렬 애니메이션 훅
- `useAnimationTrigger`: 트리거 기반 애니메이션 훅
- `useAnimationLoop`: 반복 애니메이션 훅

### 유틸리티

- `RallyUtils`: 애니메이션 빌더 유틸리티
- `RallyPresets`: 기본 애니메이션 프리셋
- `EASING_PRESETS`: 이징 함수 프리셋
- `MOTION_PRESETS`: 모션 프리셋

이 라이브러리를 통해 토스와 같은 수준의 부드럽고 일관된 애니메이션을 쉽게 구현할 수 있습니다.
