import { useRef } from "react";
import {
  Rally,
  Timeline,
  Ease,
  Spring,
  Bezier,
  Stagger,
  AnimationEndBehavior,
  TimelineMode,
} from "@acme/react";

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

  // 복합 애니메이션 refs
  const complexRef1 = useRef<HTMLDivElement>(null);
  const complexRef2 = useRef<HTMLDivElement>(null);
  const complexRef3 = useRef<HTMLDivElement>(null);

  // 페이드 인 애니메이션 함수들
  const playFadeInMaintain = async () => {
    if (fadeInMaintainRef.current) {
      const rally = Rally(
        fadeInMaintainRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            opacity: { from: 0, to: 1 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playFadeInReset = async () => {
    if (fadeInResetRef.current) {
      const rally = Rally(
        fadeInResetRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            opacity: { from: 0, to: 1 },
          },
        ],
        AnimationEndBehavior.RESET
      );
      await rally.play();
    }
  };

  const playFadeInReverse = async () => {
    if (fadeInReverseRef.current) {
      const rally = Rally(
        fadeInReverseRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            opacity: { from: 0, to: 1 },
          },
        ],
        AnimationEndBehavior.REVERSE
      );
      await rally.play();
    }
  };

  // 슬라이드 업 애니메이션 함수들
  const playSlideUpMaintain = async () => {
    if (slideUpMaintainRef.current) {
      const rally = Rally(
        slideUpMaintainRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            translateY: { from: 20, to: 0 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playSlideUpReset = async () => {
    if (slideUpResetRef.current) {
      const rally = Rally(
        slideUpResetRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            translateY: { from: 20, to: 0 },
          },
        ],
        AnimationEndBehavior.RESET
      );
      await rally.play();
    }
  };

  const playSlideUpReverse = async () => {
    if (slideUpReverseRef.current) {
      const rally = Rally(
        slideUpReverseRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            translateY: { from: 20, to: 0 },
          },
        ],
        AnimationEndBehavior.REVERSE
      );
      await rally.play();
    }
  };

  // 스케일 애니메이션 함수들
  const playScaleMaintain = async () => {
    if (scaleMaintainRef.current) {
      const rally = Rally(
        scaleMaintainRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            scale: { from: 0.8, to: 1 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playScaleReset = async () => {
    if (scaleResetRef.current) {
      const rally = Rally(
        scaleResetRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            scale: { from: 0.8, to: 1 },
          },
        ],
        AnimationEndBehavior.RESET
      );
      await rally.play();
    }
  };

  const playScaleReverse = async () => {
    if (scaleReverseRef.current) {
      const rally = Rally(
        scaleReverseRef.current,
        1,
        [
          {
            easing: Ease.easeOut,
            duration: 0.6,
            scale: { from: 0.8, to: 1 },
          },
        ],
        AnimationEndBehavior.REVERSE
      );
      await rally.play();
    }
  };

  // 회전 애니메이션 함수들
  const playRotateMaintain = async () => {
    if (rotateMaintainRef.current) {
      const rally = Rally(
        rotateMaintainRef.current,
        1,
        [
          {
            easing: Ease.easeInOut,
            duration: 0.6,
            rotate: { from: 0, to: 360 },
          },
        ],
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playRotateReset = async () => {
    if (rotateResetRef.current) {
      const rally = Rally(
        rotateResetRef.current,
        1,
        [
          {
            easing: Ease.easeInOut,
            duration: 0.6,
            rotate: { from: 0, to: 360 },
          },
        ],
        AnimationEndBehavior.RESET
      );
      await rally.play();
    }
  };

  const playRotateReverse = async () => {
    if (rotateReverseRef.current) {
      const rally = Rally(
        rotateReverseRef.current,
        1,
        [
          {
            easing: Ease.easeInOut,
            duration: 0.6,
            rotate: { from: 0, to: 360 },
          },
        ],
        AnimationEndBehavior.REVERSE
      );
      await rally.play();
    }
  };

  // 복합 애니메이션 함수들
  const playComplexAnimation = async () => {
    if (complexRef1.current && complexRef2.current && complexRef3.current) {
      const timeline = Timeline([
        Rally(complexRef1.current, 1, [
          {
            easing: Ease.easeOut,
            duration: 0.4,
            opacity: { from: 0, to: 1 },
            translateY: { from: 20, to: 0 },
          },
        ]),
        Rally(complexRef2.current, 1, [
          {
            easing: Spring.basic,
            duration: 0.5,
            scale: { from: 0.8, to: 1 },
            rotate: { from: 0, to: 180 },
          },
        ]),
        Rally(complexRef3.current, 1, [
          {
            easing: Ease.easeInOut,
            duration: 0.4,
            backgroundColor: { from: "#3B82F6", to: "#EF4444" },
            translateX: { from: 20, to: 0 },
          },
        ]),
      ]);
      await timeline.play();
    }
  };

  const playStaggerAnimation = async () => {
    if (complexRef1.current && complexRef2.current && complexRef3.current) {
      const timeline = Timeline(
        [
          Rally(complexRef1.current, 1, [
            {
              easing: Ease.easeOut,
              duration: 0.4,
              opacity: { from: 0, to: 1 },
            },
          ]),
          Rally(complexRef2.current, 1, [
            {
              easing: Ease.easeOut,
              duration: 0.4,
              translateY: { from: 20, to: 0 },
            },
          ]),
          Rally(complexRef3.current, 1, [
            {
              easing: Ease.easeOut,
              duration: 0.4,
              scale: { from: 0.8, to: 1 },
            },
          ]),
        ],
        { type: "stagger", staggerDelay: Stagger.normal }
      );
      await timeline.play();
    }
  };

  const playParallelAnimation = async () => {
    if (complexRef1.current && complexRef2.current && complexRef3.current) {
      const timeline = Timeline(
        [
          Rally(complexRef1.current, 1, [
            {
              easing: Bezier.out,
              duration: 0.6,
              opacity: { from: 0, to: 1 },
              translateY: { from: 30, to: 0 },
            },
          ]),
          Rally(complexRef2.current, 1, [
            {
              easing: Spring.wobbly,
              duration: 0.8,
              scale: { from: 0.5, to: 1 },
              rotate: { from: 0, to: 180 },
            },
          ]),
          Rally(complexRef3.current, 1, [
            {
              easing: Spring.gentle,
              duration: 0.7,
              backgroundColor: { from: "#3B82F6", to: "#EF4444" },
              translateX: { from: -50, to: 0 },
            },
          ]),
        ],
        TimelineMode.PARALLEL
      );
      await timeline.play();
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

      {/* 복합 애니메이션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-green-500 data-[theme=dark]:text-green-400">
          복합 애니메이션
        </h2>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={playComplexAnimation}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
          >
            순차 실행
          </button>
          <button
            onClick={playStaggerAnimation}
            className="px-6 py-3 bg-green-400 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
          >
            지연 실행
          </button>
          <button
            onClick={playParallelAnimation}
            className="px-6 py-3 bg-green-300 hover:bg-green-400 text-white rounded-xl font-medium transition-colors"
          >
            병렬 실행
          </button>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="text-center">
            <div
              ref={complexRef1}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              1
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              순차
            </p>
          </div>
          <div className="text-center">
            <div
              ref={complexRef2}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{ transform: "scale(0.8) rotate(0deg)" }}
            >
              2
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              지연
            </p>
          </div>
          <div className="text-center">
            <div
              ref={complexRef3}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mb-2"
              style={{
                backgroundColor: "#3B82F6",
                transform: "translateX(20px)",
              }}
            >
              3
            </div>
            <p className="text-sm text-gray-600 data-[theme=dark]:text-gray-400">
              병렬
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
