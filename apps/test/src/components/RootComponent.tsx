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
      <div className="app">
        <header className="flex justify-between items-center p-ds-md border-b border-ds-border bg-ds-bg-subtle">
          <h1 className="text-ds-heading font-bold text-gray-00">
            Design System Demo
          </h1>
          <div className="flex items-center gap-ds-lg">
            <nav className="flex gap-2 flex-wrap">
              <Link
                to="/"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                홈
              </Link>
              <Link
                to="/button"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                버튼
              </Link>
              <Link
                to="/card"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                카드
              </Link>
              <Link
                to="/checkbox"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                체크박스
              </Link>
              <Link
                to="/dialog"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                다이얼로그
              </Link>
              <Link
                to="/form"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                폼
              </Link>
              <Link
                to="/typography"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                타이포그래피
              </Link>
              <Link
                to="/animation"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                애니메이션
              </Link>
              <Link
                to="/interactive-animation"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                인터랙티브 애니메이션
              </Link>
              <Link
                to="/timeline-animation"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                타임라인 애니메이션
              </Link>
              <Link
                to="/chained-animation"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                연쇄 애니메이션
              </Link>
              <Link
                to="/interactive-timeline"
                className="text-ds-text-subtle hover:text-ds-text hover:bg-ds-bg px-ds-sm py-ds-xs rounded-ds text-ds-caption font-medium transition-colors"
              >
                인터랙션 대기 타임라인
              </Link>
            </nav>
            <Button
              onClick={toggleTheme}
              className="bg-ds-primary-bg hover:opacity-90 text-white px-ds-md py-ds-sm rounded-ds font-semibold transition-all rounded-0-5"
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
