import { Link } from "@tanstack/react-router";

export default function HomePage() {
  return (
    <div className="p-12 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 text-center text-gray-900 data-[theme=dark]:text-gray-100">
        🎨 Design System Demo
      </h1>
      <p className="text-xl text-center mb-12 opacity-80 text-gray-600 data-[theme=dark]:text-gray-400">
        다양한 컴포넌트와 애니메이션 시스템을 체험해보세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기본 컴포넌트 섹션 */}
        <div className="bg-blue-50 data-[theme=dark]:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 data-[theme=dark]:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 data-[theme=dark]:text-blue-400">
            🧩 기본 컴포넌트
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/button"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 버튼 컴포넌트
            </Link>
            <Link
              to="/card"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 카드 컴포넌트
            </Link>
            <Link
              to="/checkbox"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 체크박스 컴포넌트
            </Link>
            <Link
              to="/dialog"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 다이얼로그 컴포넌트
            </Link>
            <Link
              to="/form"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 폼 컴포넌트
            </Link>
            <Link
              to="/typography"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-blue-600 data-[theme=dark]:hover:text-blue-400 no-underline py-2 px-3 rounded-lg hover:bg-blue-100 data-[theme=dark]:hover:bg-blue-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 타이포그래피
            </Link>
          </div>
        </div>

        {/* 애니메이션 섹션 */}
        <div className="bg-pink-50 data-[theme=dark]:bg-pink-900/20 rounded-2xl p-6 border border-pink-200 data-[theme=dark]:border-pink-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <h2 className="text-2xl font-bold mb-4 text-pink-600 data-[theme=dark]:text-pink-400">
            🎬 애니메이션 시스템
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              to="/animation"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-pink-600 data-[theme=dark]:hover:text-pink-400 no-underline py-2 px-3 rounded-lg hover:bg-pink-100 data-[theme=dark]:hover:bg-pink-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 기본 애니메이션
            </Link>
            <Link
              to="/interactive-animation"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-pink-600 data-[theme=dark]:hover:text-pink-400 no-underline py-2 px-3 rounded-lg hover:bg-pink-100 data-[theme=dark]:hover:bg-pink-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 인터랙티브 애니메이션
            </Link>
            <Link
              to="/timeline-animation"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-pink-600 data-[theme=dark]:hover:text-pink-400 no-underline py-2 px-3 rounded-lg hover:bg-pink-100 data-[theme=dark]:hover:bg-pink-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 타임라인 애니메이션
            </Link>
            <Link
              to="/chained-animation"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-pink-600 data-[theme=dark]:hover:text-pink-400 no-underline py-2 px-3 rounded-lg hover:bg-pink-100 data-[theme=dark]:hover:bg-pink-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 연쇄 애니메이션
            </Link>
            <Link
              to="/interactive-timeline"
              className="text-gray-700 data-[theme=dark]:text-gray-300 hover:text-pink-600 data-[theme=dark]:hover:text-pink-400 no-underline py-2 px-3 rounded-lg hover:bg-pink-100 data-[theme=dark]:hover:bg-pink-800/30 transition-all duration-200 hover:translate-x-1"
            >
              → 인터랙션 대기 타임라인
            </Link>
          </div>
        </div>
      </div>

      {/* 색상 토큰 테스트 섹션 */}
      <div className="mt-12 bg-gray-100 data-[theme=dark]:bg-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 data-[theme=dark]:text-gray-100">
          🎨 색상 토큰 테스트
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-00 p-4 rounded-lg border">
            <p className="text-gray-00 font-medium">text-gray-00</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #ffffff (라이트) / #000000 (다크)
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border">
            <p className="text-gray-100 font-medium">text-gray-100</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #f7f8f9 (라이트) / #16171b (다크)
            </p>
          </div>
          <div className="bg-gray-500 p-4 rounded-lg border">
            <p className="text-gray-500 font-medium">text-gray-500</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #d1d3d8 (라이트) / #5b606a (다크)
            </p>
          </div>
          <div className="bg-gray-1000 p-4 rounded-lg border">
            <p className="text-gray-1000 font-medium">text-gray-1000</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #1a1c20 (라이트) / #f3f4f5 (다크)
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-carrot-600 p-4 rounded-lg border">
            <p className="text-carrot-600 font-medium">text-carrot-600</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #ff6600 (라이트) / #e65200 (다크)
            </p>
          </div>
          <div className="bg-blue-600 p-4 rounded-lg border">
            <p className="text-blue-600 font-medium">text-blue-600</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #5e98fe (라이트) / #1e82eb (다크)
            </p>
          </div>
          <div className="bg-green-600 p-4 rounded-lg border">
            <p className="text-green-600 font-medium">text-green-600</p>
            <p className="text-xs text-gray-600 data-[theme=dark]:text-gray-400 mt-1">
              #10ab7d (라이트) / #1b946d (다크)
            </p>
          </div>
        </div>
      </div>

      {/* 다른 토큰 타입들 테스트 섹션 */}
      <div className="mt-8 bg-gray-100 data-[theme=dark]:bg-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 data-[theme=dark]:text-gray-100">
          🎛️ 다른 토큰 타입들
        </h3>

        {/* 스페이싱 테스트 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-800 data-[theme=dark]:text-gray-200">
            Spacing
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
              p-2
            </div>
            <div className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
              p-4
            </div>
            <div className="bg-blue-500 text-white px-6 py-1 rounded text-sm">
              p-6
            </div>
            <div className="bg-blue-500 text-white px-8 py-1 rounded text-sm">
              p-8
            </div>
          </div>
        </div>

        {/* 반지름 테스트 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-800 data-[theme=dark]:text-gray-200">
            Border Radius
          </h4>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-purple-500 text-white px-4 py-2 rounded-sm">
              rounded-sm
            </div>
            <div className="bg-purple-500 text-white px-4 py-2 rounded">
              rounded
            </div>
            <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              rounded-lg
            </div>
            <div className="bg-purple-500 text-white px-4 py-2 rounded-xl">
              rounded-xl
            </div>
          </div>
        </div>

        {/* 타이포그래피 테스트 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-800 data-[theme=dark]:text-gray-200">
            Typography
          </h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700 data-[theme=dark]:text-gray-300">
              text-sm - 작은 텍스트
            </p>
            <p className="text-base text-gray-700 data-[theme=dark]:text-gray-300">
              text-base - 기본 텍스트
            </p>
            <p className="text-lg text-gray-700 data-[theme=dark]:text-gray-300">
              text-lg - 큰 텍스트
            </p>
            <p className="text-xl text-gray-700 data-[theme=dark]:text-gray-300">
              text-xl - 더 큰 텍스트
            </p>
          </div>
        </div>

        {/* 애니메이션 테스트 */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-800 data-[theme=dark]:text-gray-200">
            Animation & Timing
          </h4>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-green-500 text-white px-4 py-2 rounded transition-all duration-150 hover:scale-105">
              duration-150
            </div>
            <div className="bg-green-500 text-white px-4 py-2 rounded transition-all duration-300 hover:scale-105">
              duration-300
            </div>
            <div className="bg-green-500 text-white px-4 py-2 rounded transition-all duration-500 hover:scale-105">
              duration-500
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 data-[theme=dark]:text-gray-100">
          🚀 시작하기
        </h3>
        <p className="opacity-80 mb-6 text-gray-600 data-[theme=dark]:text-gray-400">
          위의 링크를 클릭하여 각 컴포넌트와 애니메이션을 체험해보세요.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/button"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            버튼 시작하기
          </Link>
          <Link
            to="/animation"
            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            애니메이션 시작하기
          </Link>
          <Link
            to="/preset-animation"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            프리셋 애니메이션
          </Link>
        </div>
      </div>
    </div>
  );
}
