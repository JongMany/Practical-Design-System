import React, { useRef, useState } from "react";
import {
  Rally,
  Timeline,
  AnimationPresets,
  AnimationEffects,
  AnimationEndBehavior,
  TimelineMode,
  EasingType,
} from "@acme/react";

export default function AdvancedAnimationPage() {
  // 고급 애니메이션 refs
  const morphingRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const elasticRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const gravityRef = useRef<HTMLDivElement>(null);

  // 상태 관리
  const [isAnimating, setIsAnimating] = useState(false);

  // 모핑 애니메이션 (모양 변화)
  const playMorphingAnimation = async () => {
    if (!morphingRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const morphing = Rally(
        morphingRef.current,
        1,
        [
          // 원형으로 변형
          {
            duration: 0.8,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 1, to: 1.2 },
            borderRadius: { from: "12px", to: "50%" },
            backgroundColor: { from: "#3B82F6", to: "#EF4444" },
          },
          // 사각형으로 복원
          {
            duration: 0.8,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 1.2, to: 1 },
            borderRadius: { from: "50%", to: "12px" },
            backgroundColor: { from: "#EF4444", to: "#10B981" },
          },
          // 다이아몬드로 변형
          {
            duration: 0.8,
            easing: EasingType.EASE_IN_OUT,
            rotate: { from: 0, to: 45 },
            borderRadius: { from: "12px", to: "0px" },
            backgroundColor: { from: "#10B981", to: "#8B5CF6" },
          },
          // 원래대로 복원
          {
            duration: 0.8,
            easing: EasingType.EASE_IN_OUT,
            rotate: { from: 45, to: 0 },
            borderRadius: { from: "0px", to: "12px" },
            backgroundColor: { from: "#8B5CF6", to: "#3B82F6" },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await morphing.play();
    } catch (error) {
      console.error("모핑 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 파티클 애니메이션
  const playParticleAnimation = async () => {
    if (!particleRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const particle = Rally(
        particleRef.current,
        1,
        [
          // 폭발 효과
          {
            duration: 0.3,
            easing: EasingType.SPRING_WOBBLY,
            scale: { from: 1, to: 1.5 },
            opacity: { from: 1, to: 0.8 },
          },
          // 파티클 분산
          {
            duration: 0.6,
            easing: EasingType.EASE_OUT,
            scale: { from: 1.5, to: 0.1 },
            opacity: { from: 0.8, to: 0 },
            translateY: { from: 0, to: -100 },
          },
          // 재집합
          {
            duration: 0.8,
            easing: EasingType.SPRING_GENTLE,
            scale: { from: 0.1, to: 1 },
            opacity: { from: 0, to: 1 },
            translateY: { from: -100, to: 0 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await particle.play();
    } catch (error) {
      console.error("파티클 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 웨이브 애니메이션
  const playWaveAnimation = async () => {
    if (!waveRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const wave = Rally(
        waveRef.current,
        3, // 3번 반복
        [
          {
            duration: 0.4,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 1, to: 1.1 },
            rotate: { from: 0, to: 5 },
          },
          {
            duration: 0.4,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 1.1, to: 0.9 },
            rotate: { from: 5, to: -5 },
          },
          {
            duration: 0.4,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 0.9, to: 1 },
            rotate: { from: -5, to: 0 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await wave.play();
    } catch (error) {
      console.error("웨이브 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 탄성 애니메이션
  const playElasticAnimation = async () => {
    if (!elasticRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const elastic = Rally(
        elasticRef.current,
        1,
        [
          // 압축
          {
            duration: 0.2,
            easing: EasingType.EASE_IN,
            scale: { from: 1, to: 0.7 },
            translateY: { from: 0, to: 20 },
          },
          // 확장
          {
            duration: 0.4,
            easing: EasingType.SPRING_WOBBLY,
            scale: { from: 0.7, to: 1.3 },
            translateY: { from: 20, to: -30 },
          },
          // 안정화
          {
            duration: 0.6,
            easing: EasingType.SPRING_GENTLE,
            scale: { from: 1.3, to: 1 },
            translateY: { from: -30, to: 0 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await elastic.play();
    } catch (error) {
      console.error("탄성 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 자기장 애니메이션
  const playMagneticAnimation = async () => {
    if (!magneticRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const magnetic = Rally(
        magneticRef.current,
        1,
        [
          // 자기장 생성
          {
            duration: 0.5,
            easing: EasingType.EASE_OUT,
            scale: { from: 1, to: 1.2 },
            rotate: { from: 0, to: 180 },
            backgroundColor: { from: "#3B82F6", to: "#8B5CF6" },
          },
          // 자기장 강화
          {
            duration: 0.3,
            easing: EasingType.EASE_IN_OUT,
            scale: { from: 1.2, to: 1.4 },
            rotate: { from: 180, to: 360 },
            backgroundColor: { from: "#8B5CF6", to: "#EF4444" },
          },
          // 자기장 해제
          {
            duration: 0.7,
            easing: EasingType.SPRING_GENTLE,
            scale: { from: 1.4, to: 1 },
            rotate: { from: 360, to: 0 },
            backgroundColor: { from: "#EF4444", to: "#3B82F6" },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await magnetic.play();
    } catch (error) {
      console.error("자기장 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 중력 애니메이션
  const playGravityAnimation = async () => {
    if (!gravityRef.current || isAnimating) return;

    setIsAnimating(true);
    try {
      const gravity = Rally(
        gravityRef.current,
        1,
        [
          // 떨어짐
          {
            duration: 0.4,
            easing: EasingType.EASE_IN,
            translateY: { from: 0, to: 100 },
            scale: { from: 1, to: 0.8 },
          },
          // 바운스
          {
            duration: 0.3,
            easing: EasingType.SPRING_WOBBLY,
            translateY: { from: 100, to: -20 },
            scale: { from: 0.8, to: 1.1 },
          },
          // 안정화
          {
            duration: 0.5,
            easing: EasingType.SPRING_GENTLE,
            translateY: { from: -20, to: 0 },
            scale: { from: 1.1, to: 1 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await gravity.play();
    } catch (error) {
      console.error("중력 애니메이션 오류:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  // 모든 애니메이션 리셋
  const resetAllAnimations = () => {
    const elements = [
      morphingRef,
      particleRef,
      waveRef,
      elasticRef,
      magneticRef,
      gravityRef,
    ];

    elements.forEach((ref) => {
      if (ref.current) {
        const element = ref.current;
        element.style.transition = "none";
        element.style.transform = "";
        element.style.opacity = "1";
        element.style.backgroundColor = "#3B82F6";
        element.style.borderRadius = "12px";
        void element.offsetHeight; // 강제 리플로우
        element.style.transition = "";
      }
    });
  };

  return (
    <div className="p-8 bg-gray-50 data-[theme=dark]:bg-gray-900 min-h-screen text-gray-900 data-[theme=dark]:text-white">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-purple-600 data-[theme=dark]:text-purple-400">
        🚀 고급 애니메이션 시스템
      </h1>

      <p className="text-xl opacity-80 mb-12 text-center text-gray-600 data-[theme=dark]:text-gray-400 max-w-4xl mx-auto">
        Rally 애니메이션 시스템의 고급 기능들을 활용한 복잡하고 매력적인
        애니메이션 효과들을 체험해보세요.
      </p>

      {/* 컨트롤 버튼 */}
      <div className="text-center mb-12">
        <button
          onClick={resetAllAnimations}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          🔄 모든 애니메이션 리셋
        </button>
      </div>

      {/* 애니메이션 그리드 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 모핑 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-purple-600 data-[theme=dark]:text-purple-400">
            🌀 모핑 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            모양과 색상이 부드럽게 변화하는 모핑 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={morphingRef}
              className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              🌀
            </div>
          </div>
          <button
            onClick={playMorphingAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "모핑 시작"}
          </button>
        </div>

        {/* 파티클 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-orange-600 data-[theme=dark]:text-orange-400">
            ✨ 파티클 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            폭발하고 재집합하는 파티클 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={particleRef}
              className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              ✨
            </div>
          </div>
          <button
            onClick={playParticleAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "파티클 시작"}
          </button>
        </div>

        {/* 웨이브 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-cyan-600 data-[theme=dark]:text-cyan-400">
            🌊 웨이브 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            물결치듯 흔들리는 웨이브 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={waveRef}
              className="w-20 h-20 bg-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              🌊
            </div>
          </div>
          <button
            onClick={playWaveAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "웨이브 시작"}
          </button>
        </div>

        {/* 탄성 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-600 data-[theme=dark]:text-green-400">
            🏀 탄성 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            공처럼 튀는 탄성 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={elasticRef}
              className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              🏀
            </div>
          </div>
          <button
            onClick={playElasticAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "탄성 시작"}
          </button>
        </div>

        {/* 자기장 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-pink-600 data-[theme=dark]:text-pink-400">
            🧲 자기장 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            자기장에 끌리는 듯한 회전 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={magneticRef}
              className="w-20 h-20 bg-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              🧲
            </div>
          </div>
          <button
            onClick={playMagneticAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "자기장 시작"}
          </button>
        </div>

        {/* 중력 애니메이션 */}
        <div className="bg-white data-[theme=dark]:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-red-600 data-[theme=dark]:text-red-400">
            🌍 중력 애니메이션
          </h3>
          <p className="text-gray-600 data-[theme=dark]:text-gray-400 mb-6">
            중력에 의해 떨어지고 바운스하는 효과
          </p>
          <div className="flex justify-center mb-4">
            <div
              ref={gravityRef}
              className="w-20 h-20 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
            >
              🌍
            </div>
          </div>
          <button
            onClick={playGravityAnimation}
            disabled={isAnimating}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              isAnimating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isAnimating ? "실행 중..." : "중력 시작"}
          </button>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className="max-w-4xl mx-auto mt-16 p-6 bg-white data-[theme=dark]:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600 data-[theme=dark]:text-purple-400">
          고급 애니메이션 특징
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 data-[theme=dark]:text-gray-300">
          <div>
            <h4 className="font-semibold mb-2 text-purple-600 data-[theme=dark]:text-purple-400">
              🌀 모핑
            </h4>
            <p>모양, 색상, 크기가 부드럽게 변화하는 고급 모핑 효과</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-orange-600 data-[theme=dark]:text-orange-400">
              ✨ 파티클
            </h4>
            <p>폭발과 재집합을 통한 역동적인 파티클 시스템</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-cyan-600 data-[theme=dark]:text-cyan-400">
              🌊 웨이브
            </h4>
            <p>반복적인 웨이브 패턴으로 자연스러운 흔들림 효과</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-green-600 data-[theme=dark]:text-green-400">
              🏀 탄성
            </h4>
            <p>물리 기반의 탄성 효과로 현실적인 바운스 애니메이션</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-pink-600 data-[theme=dark]:text-pink-400">
              🧲 자기장
            </h4>
            <p>자기장에 끌리는 듯한 회전과 색상 변화 효과</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-red-600 data-[theme=dark]:text-red-400">
              🌍 중력
            </h4>
            <p>중력과 바운스를 시뮬레이션한 물리 기반 애니메이션</p>
          </div>
        </div>
      </div>
    </div>
  );
}
