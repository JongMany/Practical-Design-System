import { useEffect } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@acme/react";

interface RootComponentProps {
  queryClient: QueryClient;
}

const RootComponent = ({ queryClient }: RootComponentProps) => {
  // 페이지 로드 시 저장된 테마 적용
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    html.setAttribute("data-theme", savedTheme || "light");
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 data-[theme=dark]:bg-gray-900">
        <header className="flex justify-between items-center p-4 border-b border-gray-200 data-[theme=dark]:border-gray-700 bg-white data-[theme=dark]:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 data-[theme=dark]:text-gray-100">
            Design System Demo
          </h1>
          <div className="flex items-center gap-6">
            <nav className="flex gap-4 flex-wrap">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                홈
              </Link>
              <Link
                to="/button"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                버튼
              </Link>
              <Link
                to="/card"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                카드
              </Link>
              <Link
                to="/checkbox"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                체크박스
              </Link>
              <Link
                to="/dialog"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                다이얼로그
              </Link>
              <Link
                to="/form"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                폼
              </Link>
              <Link
                to="/typography"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                타이포그래피
              </Link>
              <Link
                to="/animation"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                애니메이션
              </Link>
              <Link
                to="/interactive-animation"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                인터랙티브 애니메이션
              </Link>
              <Link
                to="/timeline-animation"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                타임라인 애니메이션
              </Link>
              <Link
                to="/chained-animation"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                연쇄 애니메이션
              </Link>
              <Link
                to="/interactive-timeline"
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 data-[theme=dark]:text-gray-400 hover:text-gray-900 data-[theme=dark]:hover:text-gray-100 hover:bg-gray-100 data-[theme=dark]:hover:bg-gray-700"
              >
                인터랙션 대기 타임라인
              </Link>
            </nav>
            <Button
              onClick={toggleTheme}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              🌙 Toggle Theme
            </Button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  );
};

export default RootComponent;
