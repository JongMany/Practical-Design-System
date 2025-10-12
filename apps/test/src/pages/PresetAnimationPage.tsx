import { useRef } from "react";
import {
  Rally,
  AnimationEndBehavior,
  AnimationPresets,
  AnimationEffects,
} from "@acme/react";

export default function PresetAnimationPage() {
  // 프리셋 애니메이션 refs
  const slideRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const snapRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  // 이펙트 애니메이션 refs
  const wiggleRef = useRef<HTMLDivElement>(null);
  const wiggle3dRef = useRef<HTMLDivElement>(null);
  const shiverRef = useRef<HTMLDivElement>(null);
  const bounceRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  // 프리셋 애니메이션 함수들
  const playSlide = async () => {
    if (slideRef.current) {
      const rally = Rally(
        slideRef.current,
        1,
        AnimationPresets.slide("up"),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playRoll = async () => {
    if (rollRef.current) {
      const rally = Rally(
        rollRef.current,
        1,
        AnimationPresets.roll(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playScale = async () => {
    if (scaleRef.current) {
      const rally = Rally(
        scaleRef.current,
        1,
        AnimationPresets.scale("bounce"),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playFlip = async () => {
    if (flipRef.current) {
      const rally = Rally(
        flipRef.current,
        1,
        AnimationPresets.flip("y"),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playSnap = async () => {
    if (snapRef.current) {
      const rally = Rally(
        snapRef.current,
        1,
        AnimationPresets.snap(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playZoom = async () => {
    if (zoomRef.current) {
      const rally = Rally(
        zoomRef.current,
        1,
        AnimationPresets.zoom("in"),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  // 이펙트 애니메이션 함수들
  const playWiggle = async () => {
    if (wiggleRef.current) {
      const rally = Rally(
        wiggleRef.current,
        1,
        AnimationEffects.wiggle(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playWiggle3d = async () => {
    if (wiggle3dRef.current) {
      const rally = Rally(
        wiggle3dRef.current,
        1,
        AnimationEffects.wiggle3d(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playShiver = async () => {
    if (shiverRef.current) {
      const rally = Rally(
        shiverRef.current,
        1,
        AnimationEffects.shiver(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playBounce = async () => {
    if (bounceRef.current) {
      const rally = Rally(
        bounceRef.current,
        1,
        AnimationEffects.bounce(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playFloat = async () => {
    if (floatRef.current) {
      const rally = Rally(
        floatRef.current,
        1,
        AnimationEffects.float(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  const playPulse = async () => {
    if (pulseRef.current) {
      const rally = Rally(
        pulseRef.current,
        1,
        AnimationEffects.pulse(),
        AnimationEndBehavior.MAINTAIN
      );
      await rally.play();
    }
  };

  return (
    <div className="p-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 data-[theme=dark]:text-gray-100">
        🎨 Rally 애니메이션 프리셋 & 이펙트
      </h1>
      <p className="text-xl opacity-80 mb-12 text-center text-gray-600 data-[theme=dark]:text-gray-400">
        새로운 프리셋과 이펙트 시스템을 사용한 애니메이션 예제
      </p>

      {/* 애니메이션 프리셋 섹션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-blue-500 data-[theme=dark]:text-blue-400">
          🎬 애니메이션 프리셋
        </h2>
        <p className="text-lg mb-6 text-gray-600 data-[theme=dark]:text-gray-400">
          미리 정의된 애니메이션 프리셋들
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Slide */}
          <div className="text-center">
            <button
              onClick={playSlide}
              className="w-full mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Slide
            </button>
            <div
              ref={slideRef}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
              style={{ opacity: 0, transform: "translateY(100px)" }}
            >
              📱
            </div>
          </div>

          {/* Roll */}
          <div className="text-center">
            <button
              onClick={playRoll}
              className="w-full mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Roll
            </button>
            <div
              ref={rollRef}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
              style={{ transform: "scale(0.8)" }}
            >
              🎲
            </div>
          </div>

          {/* Scale */}
          <div className="text-center">
            <button
              onClick={playScale}
              className="w-full mb-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Scale
            </button>
            <div
              ref={scaleRef}
              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
              style={{ transform: "scale(0)" }}
            >
              📏
            </div>
          </div>

          {/* Flip */}
          <div className="text-center">
            <button
              onClick={playFlip}
              className="w-full mb-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Flip
            </button>
            <div
              ref={flipRef}
              className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
              style={{ transform: "scale(0.8)" }}
            >
              🔄
            </div>
          </div>

          {/* Snap */}
          <div className="text-center">
            <button
              onClick={playSnap}
              className="w-full mb-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
            >
              Snap
            </button>
            <div
              ref={snapRef}
              className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              ⚡
            </div>
          </div>

          {/* Zoom */}
          <div className="text-center">
            <button
              onClick={playZoom}
              className="w-full mb-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
            >
              Zoom
            </button>
            <div
              ref={zoomRef}
              className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
              style={{ opacity: 0, transform: "scale(0.5)" }}
            >
              🔍
            </div>
          </div>
        </div>
      </section>

      {/* 애니메이션 이펙트 섹션 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-pink-500 data-[theme=dark]:text-pink-400">
          ✨ 애니메이션 이펙트
        </h2>
        <p className="text-lg mb-6 text-gray-600 data-[theme=dark]:text-gray-400">
          특별한 이펙트 애니메이션들
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Wiggle */}
          <div className="text-center">
            <button
              onClick={playWiggle}
              className="w-full mb-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors"
            >
              Wiggle
            </button>
            <div
              ref={wiggleRef}
              className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              🎪
            </div>
          </div>

          {/* Wiggle 3D */}
          <div className="text-center">
            <button
              onClick={playWiggle3d}
              className="w-full mb-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium transition-colors"
            >
              Wiggle 3D
            </button>
            <div
              ref={wiggle3dRef}
              className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              🎭
            </div>
          </div>

          {/* Shiver */}
          <div className="text-center">
            <button
              onClick={playShiver}
              className="w-full mb-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
            >
              Shiver
            </button>
            <div
              ref={shiverRef}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              🥶
            </div>
          </div>

          {/* Bounce */}
          <div className="text-center">
            <button
              onClick={playBounce}
              className="w-full mb-4 px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg font-medium transition-colors"
            >
              Bounce
            </button>
            <div
              ref={bounceRef}
              className="w-20 h-20 bg-gradient-to-br from-lime-400 to-green-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              🏀
            </div>
          </div>

          {/* Float */}
          <div className="text-center">
            <button
              onClick={playFloat}
              className="w-full mb-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
            >
              Float
            </button>
            <div
              ref={floatRef}
              className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              🎈
            </div>
          </div>

          {/* Pulse */}
          <div className="text-center">
            <button
              onClick={playPulse}
              className="w-full mb-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors"
            >
              Pulse
            </button>
            <div
              ref={pulseRef}
              className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg mx-auto"
            >
              💓
            </div>
          </div>
        </div>
      </section>

      {/* 사용법 예제 */}
      <section className="mb-12">
        <h2 className="text-3xl mb-6 text-gray-700 data-[theme=dark]:text-gray-300">
          📚 사용법 예제
        </h2>
        <div className="bg-gray-100 data-[theme=dark]:bg-gray-800 rounded-lg p-6">
          <pre className="text-sm text-gray-800 data-[theme=dark]:text-gray-200 overflow-x-auto">
            {`// 프리셋 사용 예제
import { Rally, AnimationPresets, AnimationEndBehavior } from "@acme/react";

const rally = Rally(
  elementRef.current,
  1,
  AnimationPresets.slide("up"), // 슬라이드 프리셋
  AnimationEndBehavior.MAINTAIN
);
await rally.play();

// 이펙트 사용 예제
const effectRally = Rally(
  elementRef.current,
  1,
  AnimationEffects.wiggle(), // 위글 이펙트
  AnimationEndBehavior.MAINTAIN
);
await effectRally.play();

// Timeline과 함께 사용
const timeline = Timeline(TimelineMode.PARALLEL, [
  Rally(element1, 1, AnimationPresets.scale("bounce")),
  Rally(element2, 1, AnimationEffects.pulse()),
  Rally(element3, 1, AnimationPresets.flip("y"))
]);
await timeline.play();`}
          </pre>
        </div>
      </section>
    </div>
  );
}
