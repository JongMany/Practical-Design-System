import React, { useRef } from "react";
import {
  Rally,
  Timeline,
  AnimationPresets,
  AnimationEffects,
  AnimationEndBehavior,
  TimelineMode,
  TimelineEndBehavior,
  EasingType,
} from "@acme/react";

// 애니메이션 상수 정의 - 매직 넘버 제거
const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
} as const;

// ANIMATION_DELAY는 향후 사용을 위해 보존
// const ANIMATION_DELAY = {
//   NONE: 0,
//   FAST: 0.1,
//   NORMAL: 0.2,
// } as const;

const ComplexInteractionPage = () => {
  // 컨테이너와 내부 요소들에 대한 ref
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 애니메이션 상태 관리
  const [isAnimationRunning, setIsAnimationRunning] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);

  // Timeline 인스턴스를 ref로 관리
  const timelineRef = useRef<ReturnType<typeof Timeline> | null>(null);

  // 애니메이션 리셋
  const resetAnimation = () => {
    if (isResetting) return; // 이미 리셋 중이면 무시

    setIsResetting(true);

    try {
      // 현재 실행 중인 Timeline이 있다면 중지하고 리셋
      if (timelineRef.current) {
        // Timeline의 reset API를 호출하면 내부적으로 모든 Rally가 리셋됩니다
        timelineRef.current.reset();
        timelineRef.current = null;
      }

      // 개별 Rally들도 중지하고 리셋 (메인 Timeline에 포함되지 않은 개별 카드 애니메이션들)
      // 주의: 메인 Timeline의 reset()은 Timeline 내부의 Rally들만 리셋하므로,
      // 별도로 실행된 개별 카드 애니메이션들은 별도로 리셋해야 합니다.
      const rallyRefs = [
        card1WiggleRef,
        card1BounceRef,
        card2WiggleRef,
        card2FloatRef,
        card3BounceRef,
        card3FloatRef,
      ];

      rallyRefs.forEach((rallyRef) => {
        if (rallyRef.current) {
          // Rally의 reset API를 호출하면 애니메이션이 완전히 중지되고 초기 상태로 리셋됩니다
          rallyRef.current.reset();
          rallyRef.current = null;
        }
      });

      // DOM 요소들은 Rally의 reset API가 내부적으로 처리하므로 별도 처리 불필요
      // Rally.reset()이 호출되면 각 Rally가 자신의 타겟 요소를 초기 상태로 복원합니다
    } catch (error) {
      console.error("애니메이션 리셋 중 오류 발생:", error);
    } finally {
      // 상태 리셋
      setIsAnimationRunning(false);
      setIsResetting(false);
    }
  };

  // 복합 인터랙션 애니메이션 실행
  const playComplexInteraction = async () => {
    if (!containerRef.current) return;

    // 이미 애니메이션이 실행 중이거나 리셋 중이면 무시
    if (isAnimationRunning || isResetting) {
      console.log("애니메이션이 이미 실행 중이거나 리셋 중입니다.");
      return;
    }

    setIsAnimationRunning(true);

    try {
      // Timeline을 사용하여 순차적 애니메이션 실행
      const timeline = Timeline(
        [
          // 1단계: 컨테이너가 아래에서 위로 슬라이드업
          Rally(
            containerRef.current,
            1,
            AnimationPresets.slide("up"),
            AnimationEndBehavior.MAINTAIN
          ),

          // 2단계: 제목이 페이드인과 함께 스케일업
          Rally(
            titleRef.current!,
            1,
            AnimationPresets.scale("in"),
            AnimationEndBehavior.MAINTAIN
          ),

          // 3단계: 부제목이 슬라이드인
          Rally(
            subtitleRef.current!,
            1,
            AnimationPresets.slide("left"),
            AnimationEndBehavior.MAINTAIN
          ),

          // 4단계: 카드들이 순차적으로 나타남 (stagger)
          Rally(
            card1Ref.current!,
            1,
            [
              {
                duration: ANIMATION_DURATION.NORMAL,
                easing: EasingType.EASE_OUT,
                opacity: { from: 0, to: 1 },
                scale: { from: 0.8, to: 1 },
                translateY: { from: 20, to: 0 },
              },
            ],
            AnimationEndBehavior.MAINTAIN
          ),

          Rally(
            card2Ref.current!,
            1,
            [
              {
                duration: ANIMATION_DURATION.NORMAL,
                easing: EasingType.EASE_OUT,
                opacity: { from: 0, to: 1 },
                scale: { from: 0.8, to: 1 },
                translateY: { from: 20, to: 0 },
              },
            ],
            AnimationEndBehavior.MAINTAIN
          ),

          Rally(
            card3Ref.current!,
            1,
            [
              {
                duration: ANIMATION_DURATION.NORMAL,
                easing: EasingType.EASE_OUT,
                opacity: { from: 0, to: 1 },
                scale: { from: 0.8, to: 1 },
                translateY: { from: 20, to: 0 },
              },
            ],
            AnimationEndBehavior.MAINTAIN
          ),

          // 5단계: 버튼이 바운스하며 나타남
          Rally(
            buttonRef.current!,
            1,
            AnimationPresets.scale("bounce"),
            AnimationEndBehavior.MAINTAIN
          ),

          // 6단계: 모든 카드들이 wiggle 효과
          Rally(
            card1Ref.current!,
            1,
            AnimationEffects.wiggle(),
            AnimationEndBehavior.MAINTAIN
          ),

          Rally(
            card2Ref.current!,
            1,
            AnimationEffects.wiggle(),
            AnimationEndBehavior.MAINTAIN
          ),

          Rally(
            card3Ref.current!,
            1,
            AnimationEffects.wiggle(),
            AnimationEndBehavior.MAINTAIN
          ),

          // 7단계: 모든 요소들이 페이드아웃하며 사라짐
          Rally(
            containerRef.current,
            1,
            [
              {
                duration: ANIMATION_DURATION.SLOW,
                easing: EasingType.EASE_IN,
                opacity: { from: 1, to: 0 },
                scale: { from: 1, to: 0.9 },
                translateY: { from: 0, to: -20 },
              },
            ],
            AnimationEndBehavior.MAINTAIN
          ),
        ],
        TimelineMode.SERIAL,
        {
          endBehavior: TimelineEndBehavior.FADE_OUT_AND_RESET,
          fadeOutDuration: ANIMATION_DURATION.SLOW,
          fadeOutEasing: EasingType.EASE_IN,
          onComplete: () => {
            console.log(
              "🎬 Timeline 완료! 부드럽게 페이드아웃 후 리셋되었습니다."
            );
          },
        }
      );

      // Timeline을 ref에 저장하여 나중에 리셋할 수 있도록 함
      timelineRef.current = timeline;

      await timeline.play();
    } catch (error) {
      console.error("애니메이션 실행 중 오류 발생:", error);
    } finally {
      // 애니메이션 완료 후 상태 리셋
      setIsAnimationRunning(false);
      timelineRef.current = null;
    }
  };

  // 개별 요소 애니메이션들을 ref로 관리
  const card1WiggleRef = useRef<ReturnType<typeof Rally> | null>(null);
  const card1BounceRef = useRef<ReturnType<typeof Rally> | null>(null);
  const card2WiggleRef = useRef<ReturnType<typeof Rally> | null>(null);
  const card2FloatRef = useRef<ReturnType<typeof Rally> | null>(null);
  const card3BounceRef = useRef<ReturnType<typeof Rally> | null>(null);
  const card3FloatRef = useRef<ReturnType<typeof Rally> | null>(null);

  // 공통 애니메이션 함수 - 중복 코드 제거
  const playCardAnimation = async (
    cardRef: React.RefObject<HTMLDivElement | null>,
    rallyRef: React.RefObject<ReturnType<typeof Rally> | null>,
    animationEffect: ReturnType<typeof AnimationEffects.wiggle>,
    animationName: string
  ) => {
    if (!cardRef.current || isAnimationRunning) return;

    try {
      const animation = Rally(
        cardRef.current,
        1,
        animationEffect,
        AnimationEndBehavior.MAINTAIN
      );
      rallyRef.current = animation;
      await animation.play();
    } catch (error) {
      console.error(`${animationName} 애니메이션 실행 중 오류:`, error);
    } finally {
      rallyRef.current = null;
    }
  };

  // 개별 애니메이션 함수들 - 공통 함수 사용
  const playCardWiggle = async (
    cardRef: React.RefObject<HTMLDivElement | null>,
    rallyRef: React.RefObject<ReturnType<typeof Rally> | null>
  ) => {
    await playCardAnimation(
      cardRef,
      rallyRef,
      AnimationEffects.wiggle(),
      "Wiggle"
    );
  };

  const playCardBounce = async (
    cardRef: React.RefObject<HTMLDivElement | null>,
    rallyRef: React.RefObject<ReturnType<typeof Rally> | null>
  ) => {
    await playCardAnimation(
      cardRef,
      rallyRef,
      AnimationEffects.bounce(),
      "Bounce"
    );
  };

  const playCardFloat = async (
    cardRef: React.RefObject<HTMLDivElement | null>,
    rallyRef: React.RefObject<ReturnType<typeof Rally> | null>
  ) => {
    await playCardAnimation(
      cardRef,
      rallyRef,
      AnimationEffects.float(),
      "Float"
    );
  };

  return (
    <div className="p-8 bg-gray-50 data-[theme=dark]:bg-gray-900 min-h-screen text-gray-900 data-[theme=dark]:text-white">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-600 data-[theme=dark]:text-blue-400">
        🎭 복합 인터랙션 애니메이션
      </h1>

      {/* 메인 컨트롤 */}
      <div className="text-center mb-12">
        <div className="flex gap-4 justify-center">
          <button
            onClick={playComplexInteraction}
            disabled={isAnimationRunning || isResetting}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isAnimationRunning || isResetting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:-translate-y-1 hover:shadow-lg"
            }`}
          >
            {isAnimationRunning
              ? "🎬 애니메이션 실행 중..."
              : "🚀 복합 인터랙션 시작"}
          </button>
          <button
            onClick={resetAnimation}
            disabled={isResetting}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isResetting
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white hover:-translate-y-1 hover:shadow-lg"
            }`}
          >
            {isResetting ? "🔄 리셋 중..." : "🔄 애니메이션 리셋"}
          </button>
        </div>
      </div>

      {/* 애니메이션 컨테이너 */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto bg-white data-[theme=dark]:bg-gray-800 rounded-2xl shadow-2xl p-8 opacity-0 transform translate-y-20"
      >
        {/* 제목 섹션 */}
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-3xl font-bold text-gray-800 data-[theme=dark]:text-white mb-4 opacity-0 scale-75"
          >
            ✨ 멀티 요소 인터랙션
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-gray-600 data-[theme=dark]:text-gray-300 opacity-0 transform -translate-x-10"
          >
            여러 요소들이 조화롭게 움직이는 복합 애니메이션을 경험해보세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 카드 1 */}
          <div
            ref={card1Ref}
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white opacity-0 transform scale-75 translate-y-5"
          >
            <div className="text-2xl mb-3">🎨</div>
            <h3 className="text-xl font-semibold mb-2">디자인</h3>
            <p className="text-blue-100">
              아름다운 UI/UX 디자인으로 사용자 경험을 향상시킵니다.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => playCardWiggle(card1Ref, card1WiggleRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Wiggle
              </button>
              <button
                onClick={() => playCardBounce(card1Ref, card1BounceRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Bounce
              </button>
            </div>
          </div>

          {/* 카드 2 */}
          <div
            ref={card2Ref}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white opacity-0 transform scale-75 translate-y-5"
          >
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2">성능</h3>
            <p className="text-green-100">
              최적화된 코드로 빠르고 효율적인 애니메이션을 제공합니다.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => playCardWiggle(card2Ref, card2WiggleRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Wiggle
              </button>
              <button
                onClick={() => playCardFloat(card2Ref, card2FloatRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Float
              </button>
            </div>
          </div>

          {/* 카드 3 */}
          <div
            ref={card3Ref}
            className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white opacity-0 transform scale-75 translate-y-5"
          >
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2">정확성</h3>
            <p className="text-purple-100">
              정밀한 타이밍과 부드러운 전환으로 완벽한 애니메이션을 구현합니다.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => playCardBounce(card3Ref, card3BounceRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Bounce
              </button>
              <button
                onClick={() => playCardFloat(card3Ref, card3FloatRef)}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
              >
                Float
              </button>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="text-center">
          <button
            ref={buttonRef}
            className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg opacity-0 scale-50"
          >
            🎉 인터랙션 완료!
          </button>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-100 data-[theme=dark]:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 data-[theme=dark]:text-white">
          🎬 애니메이션 시퀀스
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 data-[theme=dark]:text-gray-300">
          <div>
            <h4 className="font-semibold mb-2">1단계: 컨테이너 등장</h4>
            <p>컨테이너가 아래에서 위로 슬라이드업하며 나타납니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">2단계: 제목 애니메이션</h4>
            <p>제목이 페이드인과 함께 스케일업 효과로 강조됩니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">3단계: 부제목 슬라이드</h4>
            <p>부제목이 왼쪽에서 슬라이드인하며 등장합니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">4단계: 카드들 순차 등장</h4>
            <p>세 개의 카드가 순차적으로 나타나며 stagger 효과를 보여줍니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">5단계: 버튼 바운스</h4>
            <p>액션 버튼이 바운스 효과와 함께 등장합니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">6단계: Wiggle 효과</h4>
            <p>모든 카드들이 wiggle 효과로 생동감을 더합니다.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">7단계: 페이드아웃</h4>
            <p>
              전체 컨테이너가 페이드아웃하며 사라지고 투명한 상태를 유지합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">개별 인터랙션</h4>
            <p>
              각 카드의 버튼을 클릭하여 개별 애니메이션을 경험할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexInteractionPage;
