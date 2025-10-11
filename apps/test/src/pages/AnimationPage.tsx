import { useRef, useEffect, useState } from "react";
import { rallyEngine, RallyPresets } from "@acme/react";

export default function AnimationPage() {
  // 페이드 인 refs
  const fadeInMaintainRef = useRef<HTMLDivElement>(null);
  const fadeInResetRef = useRef<HTMLDivElement>(null);
  const fadeInReverseRef = useRef<HTMLDivElement>(null);

  // 슬라이드 업 refs
  const slideUpMaintainRef = useRef<HTMLDivElement>(null);
  const slideUpResetRef = useRef<HTMLDivElement>(null);
  const slideUpReverseRef = useRef<HTMLDivElement>(null);

  // 스케일 refs
  const scaleMaintainRef = useRef<HTMLDivElement>(null);
  const scaleResetRef = useRef<HTMLDivElement>(null);
  const scaleReverseRef = useRef<HTMLDivElement>(null);

  // 회전 refs
  const rotateMaintainRef = useRef<HTMLDivElement>(null);
  const rotateResetRef = useRef<HTMLDivElement>(null);
  const rotateReverseRef = useRef<HTMLDivElement>(null);

  const [, setIsReady] = useState(false);

  useEffect(() => {
    if (
      fadeInMaintainRef.current &&
      fadeInResetRef.current &&
      fadeInReverseRef.current &&
      slideUpMaintainRef.current &&
      slideUpResetRef.current &&
      slideUpReverseRef.current &&
      scaleMaintainRef.current &&
      scaleResetRef.current &&
      scaleReverseRef.current &&
      rotateMaintainRef.current &&
      rotateResetRef.current &&
      rotateReverseRef.current
    ) {
      setIsReady(true);
    }
  }, []);

  // 페이드 인 애니메이션 함수들
  const playFadeInMaintain = () => {
    if (fadeInMaintainRef.current) {
      const rally = rallyEngine.createRally({
        target: fadeInMaintainRef.current,
        motions: [RallyPresets.fadeIn(600, "ease-out")],
        endBehavior: "maintain",
      });
      rally.start();
    }
  };

  const playFadeInReset = () => {
    if (fadeInResetRef.current) {
      const rally = rallyEngine.createRally({
        target: fadeInResetRef.current,
        motions: [RallyPresets.fadeIn(600, "ease-out")],
        endBehavior: "reset",
      });
      rally.start();
    }
  };

  const playFadeInReverse = () => {
    if (fadeInReverseRef.current) {
      const rally = rallyEngine.createRally({
        target: fadeInReverseRef.current,
        motions: [RallyPresets.fadeIn(600, "ease-out")],
        endBehavior: "reverse",
      });
      rally.start();
    }
  };

  // 슬라이드 업 애니메이션 함수들
  const playSlideUpMaintain = () => {
    if (slideUpMaintainRef.current) {
      const rally = rallyEngine.createRally({
        target: slideUpMaintainRef.current,
        motions: [RallyPresets.slideUp(600, "ease-out")],
        endBehavior: "maintain",
      });
      rally.start();
    }
  };

  const playSlideUpReset = () => {
    if (slideUpResetRef.current) {
      const rally = rallyEngine.createRally({
        target: slideUpResetRef.current,
        motions: [RallyPresets.slideUp(600, "ease-out")],
        endBehavior: "reset",
      });
      rally.start();
    }
  };

  const playSlideUpReverse = () => {
    if (slideUpReverseRef.current) {
      const rally = rallyEngine.createRally({
        target: slideUpReverseRef.current,
        motions: [RallyPresets.slideUp(600, "ease-out")],
        endBehavior: "reverse",
      });
      rally.start();
    }
  };

  // 스케일 애니메이션 함수들
  const playScaleMaintain = () => {
    if (scaleMaintainRef.current) {
      const rally = rallyEngine.createRally({
        target: scaleMaintainRef.current,
        motions: [RallyPresets.scaleIn(600, "ease-out")],
        endBehavior: "maintain",
      });
      rally.start();
    }
  };

  const playScaleReset = () => {
    if (scaleResetRef.current) {
      const rally = rallyEngine.createRally({
        target: scaleResetRef.current,
        motions: [RallyPresets.scaleIn(600, "ease-out")],
        endBehavior: "reset",
      });
      rally.start();
    }
  };

  const playScaleReverse = () => {
    if (scaleReverseRef.current) {
      const rally = rallyEngine.createRally({
        target: scaleReverseRef.current,
        motions: [RallyPresets.scaleIn(600, "ease-out")],
        endBehavior: "reverse",
      });
      rally.start();
    }
  };

  // 회전 애니메이션 함수들
  const playRotateMaintain = () => {
    if (rotateMaintainRef.current) {
      const rally = rallyEngine.createRally({
        target: rotateMaintainRef.current,
        motions: [
          {
            property: "transform" as const,
            from: "rotate(0deg)",
            to: "rotate(360deg)",
            duration: 600,
            easing: "ease-in-out",
          },
        ],
        endBehavior: "maintain",
      });
      rally.start();
    }
  };

  const playRotateReset = () => {
    if (rotateResetRef.current) {
      const rally = rallyEngine.createRally({
        target: rotateResetRef.current,
        motions: [
          {
            property: "transform" as const,
            from: "rotate(0deg)",
            to: "rotate(360deg)",
            duration: 600,
            easing: "ease-in-out",
          },
        ],
        endBehavior: "reset",
      });
      rally.start();
    }
  };

  const playRotateReverse = () => {
    if (rotateReverseRef.current) {
      const rally = rallyEngine.createRally({
        target: rotateReverseRef.current,
        motions: [
          {
            property: "transform" as const,
            from: "rotate(0deg)",
            to: "rotate(360deg)",
            duration: 600,
            easing: "ease-in-out",
          },
        ],
        endBehavior: "reverse",
      });
      rally.start();
    }
  };

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 data-[theme=dark]:text-gray-100">
        🎬 Rally 애니메이션 시스템
      </h1>
      <p className="text-xl opacity-80 mb-12 text-center text-gray-600 data-[theme=dark]:text-gray-400">
        Rally 애니메이션 시스템을 활용한 다양한 애니메이션 효과들을
        체험해보세요.
      </p>

      {/* 페이드 인 애니메이션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-blue-500 data-[theme=dark]:text-blue-400">
          페이드 인 애니메이션
        </h2>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={playFadeInMaintain}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
          >
            유지
          </button>
          <button
            onClick={playFadeInReset}
            className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
          >
            리셋
          </button>
          <button
            onClick={playFadeInReverse}
            className="px-6 py-3 bg-blue-300 hover:bg-blue-400 text-white rounded-xl font-medium transition-colors"
          >
            역재생
          </button>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center">
            <div
              ref={fadeInMaintainRef}
              className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ opacity: 0 }}
            >
              유지
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              유지
            </p>
          </div>
          <div className="text-center">
            <div
              ref={fadeInResetRef}
              className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ opacity: 0 }}
            >
              리셋
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              리셋
            </p>
          </div>
          <div className="text-center">
            <div
              ref={fadeInReverseRef}
              className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ opacity: 0 }}
            >
              역재생
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              역재생
            </p>
          </div>
        </div>
      </section>

      {/* 슬라이드 업 애니메이션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-pink-500 data-[theme=dark]:text-pink-400">
          슬라이드 업 애니메이션
        </h2>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={playSlideUpMaintain}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition-colors"
          >
            유지
          </button>
          <button
            onClick={playSlideUpReset}
            className="px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-medium transition-colors"
          >
            리셋
          </button>
          <button
            onClick={playSlideUpReverse}
            className="px-6 py-3 bg-pink-300 hover:bg-pink-400 text-white rounded-xl font-medium transition-colors"
          >
            역재생
          </button>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center">
            <div
              ref={slideUpMaintainRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "translateY(20px)" }}
            >
              유지
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              유지
            </p>
          </div>
          <div className="text-center">
            <div
              ref={slideUpResetRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "translateY(20px)" }}
            >
              리셋
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              리셋
            </p>
          </div>
          <div className="text-center">
            <div
              ref={slideUpReverseRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "translateY(20px)" }}
            >
              역재생
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              역재생
            </p>
          </div>
        </div>
      </section>

      {/* 스케일 인 애니메이션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-purple-500 data-[theme=dark]:text-purple-400">
          스케일 인 애니메이션
        </h2>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={playScaleMaintain}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
          >
            유지
          </button>
          <button
            onClick={playScaleReset}
            className="px-6 py-3 bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
          >
            리셋
          </button>
          <button
            onClick={playScaleReverse}
            className="px-6 py-3 bg-purple-300 hover:bg-purple-400 text-white rounded-xl font-medium transition-colors"
          >
            역재생
          </button>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center">
            <div
              ref={scaleMaintainRef}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "scale(0.8)" }}
            >
              유지
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              유지
            </p>
          </div>
          <div className="text-center">
            <div
              ref={scaleResetRef}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "scale(0.8)" }}
            >
              리셋
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              리셋
            </p>
          </div>
          <div className="text-center">
            <div
              ref={scaleReverseRef}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "scale(0.8)" }}
            >
              역재생
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              역재생
            </p>
          </div>
        </div>
      </section>

      {/* 회전 애니메이션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-red-500 data-[theme=dark]:text-red-400">
          회전 애니메이션
        </h2>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={playRotateMaintain}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            유지
          </button>
          <button
            onClick={playRotateReset}
            className="px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl font-medium transition-colors"
          >
            리셋
          </button>
          <button
            onClick={playRotateReverse}
            className="px-6 py-3 bg-red-300 hover:bg-red-400 text-white rounded-xl font-medium transition-colors"
          >
            역재생
          </button>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center">
            <div
              ref={rotateMaintainRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "rotate(0deg)" }}
            >
              유지
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              유지
            </p>
          </div>
          <div className="text-center">
            <div
              ref={rotateResetRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "rotate(0deg)" }}
            >
              리셋
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              리셋
            </p>
          </div>
          <div className="text-center">
            <div
              ref={rotateReverseRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "rotate(0deg)" }}
            >
              역재생
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              역재생
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
