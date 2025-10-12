import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import RootComponent from "./components/RootComponent";

// 페이지 컴포넌트들 import
import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import CardPage from "./pages/CardPage";
import CheckboxPage from "./pages/CheckboxPage";
import DialogPage from "./pages/DialogPage";
import FormPage from "./pages/FormPage";
import TypographyPage from "./pages/TypographyPage";
import AnimationPage from "./pages/AnimationPage";
import AdvancedAnimationPage from "./pages/AdvancedAnimationPage";
import PresetAnimationPage from "./pages/PresetAnimationPage";
import InteractiveAnimationPage from "./pages/InteractiveAnimationPage";
import TimelineAnimationPage from "./pages/TimelineAnimationPage";
import ChainedAnimationPage from "./pages/ChainedAnimationPage";
import InteractiveTimelinePage from "./pages/InteractiveTimelinePage";
import "./App.css";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// 루트 라우트 생성
const rootRoute = createRootRoute({
  component: () => <RootComponent queryClient={queryClient} />,
});

// 인덱스 라우트
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// 버튼 페이지 라우트
const buttonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/button",
  component: ButtonPage,
});

// 카드 페이지 라우트
const cardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/card",
  component: CardPage,
});

// 체크박스 페이지 라우트
const checkboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkbox",
  component: CheckboxPage,
});

// 다이얼로그 페이지 라우트
const dialogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dialog",
  component: DialogPage,
});

// 폼 페이지 라우트
const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: FormPage,
});

// 타이포그래피 페이지 라우트
const typographyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/typography",
  component: TypographyPage,
});

// 애니메이션 페이지 라우트
const animationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/animation",
  component: AnimationPage,
});

// 고급 애니메이션 페이지 라우트
const advancedAnimationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advanced-animation",
  component: AdvancedAnimationPage,
});

// 인터랙티브 애니메이션 페이지 라우트
const interactiveAnimationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/interactive-animation",
  component: InteractiveAnimationPage,
});

// 타임라인 애니메이션 페이지 라우트
const timelineAnimationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline-animation",
  component: TimelineAnimationPage,
});

// 연쇄 애니메이션 페이지 라우트
const chainedAnimationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chained-animation",
  component: ChainedAnimationPage,
});

// 프리셋 애니메이션 페이지 라우트
const presetAnimationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/preset-animation",
  component: PresetAnimationPage,
});

// 인터랙션 대기 타임라인 페이지 라우트
const interactiveTimelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/interactive-timeline",
  component: InteractiveTimelinePage,
});

// 라우트 트리 생성
const routeTree = rootRoute.addChildren([
  indexRoute,
  buttonRoute,
  cardRoute,
  checkboxRoute,
  dialogRoute,
  formRoute,
  typographyRoute,
  animationRoute,
  advancedAnimationRoute,
  presetAnimationRoute,
  interactiveAnimationRoute,
  timelineAnimationRoute,
  chainedAnimationRoute,
  interactiveTimelineRoute,
]);

// 라우터 생성
export const router = createRouter({ routeTree });

// 라우터 타입 등록
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
