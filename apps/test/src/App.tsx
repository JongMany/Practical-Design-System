// import {
//   Button,
//   Card,
//   Dialog,
//   Checkbox,
//   type DialogRootRef,
// } from "@acme/react";
// import { Form } from "@acme/react";
// import { validators } from "@acme/core";
// import { useRef, useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   // 외부 제어를 위한 ref와 상태
//   const dialogRef = useRef<DialogRootRef>(null);
//   const [controlledDialogOpen, setControlledDialogOpen] = useState(false);

//   const toggleTheme = () => {
//     const html = document.documentElement;
//     const currentTheme = html.getAttribute("data-theme");
//     const newTheme = currentTheme === "dark" ? "light" : "dark";
//     html.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   // 외부에서 Dialog 제어하는 함수들
//   const openDialogExternally = () => {
//     dialogRef.current?.open();
//   };

//   const closeDialogExternally = () => {
//     dialogRef.current?.close();
//   };

//   const toggleDialogExternally = () => {
//     dialogRef.current?.toggle();
//   };

//   const setDialogStateExternally = (open: boolean) => {
//     dialogRef.current?.setOpen(open);
//   };

//   // Checkbox 상태 관리
//   const [checkboxStates, setCheckboxStates] = useState({
//     basic: false,
//     controlled: false,
//     disabled: false,
//   });

//   const handleCheckboxChange =
//     (key: keyof typeof checkboxStates) => (checked: boolean) => {
//       setCheckboxStates((prev) => ({ ...prev, [key]: checked }));
//     };

//   // 애니메이션 상태 관리
//   const [animationStates, setAnimationStates] = useState({
//     showDemo: false,
//     triggerAnimation: false,
//     loopAnimation: false,
//   });

//   // CSS 애니메이션 제어 함수들
//   const playFadeIn = () => {
//     const element = document.querySelector(".fade-in-target") as HTMLElement;
//     if (element) {
//       element.style.animation = "none";
//       element.offsetHeight; // 리플로우 강제
//       element.style.animation = "fadeIn 0.5s ease-out";
//     }
//   };

//   const playSlideUp = () => {
//     const element = document.querySelector(".slide-up-target") as HTMLElement;
//     if (element) {
//       element.style.animation = "none";
//       element.offsetHeight; // 리플로우 강제
//       element.style.animation = "slideUp 0.5s ease-out";
//     }
//   };

//   const playScale = () => {
//     const element = document.querySelector(".scale-target") as HTMLElement;
//     if (element) {
//       element.style.animation = "none";
//       element.offsetHeight; // 리플로우 강제
//       element.style.animation = "scaleIn 0.5s ease-out";
//     }
//   };

//   const playComplex = () => {
//     const element = document.querySelector(
//       ".complex-animation-target"
//     ) as HTMLElement;
//     if (element) {
//       element.style.animation = "none";
//       element.offsetHeight; // 리플로우 강제
//       element.style.animation = "fadeIn 0.4s ease-out, slideUp 0.4s ease-out";
//     }
//   };

//   const playSequential = () => {
//     const elements = document.querySelectorAll(".seq-1, .seq-2, .seq-3");
//     elements.forEach((element, index) => {
//       setTimeout(() => {
//         (element as HTMLElement).style.animation = "none";
//         (element as HTMLElement).offsetHeight; // 리플로우 강제
//         (element as HTMLElement).style.animation = "fadeIn 0.3s ease-out";
//       }, index * 150);
//     });
//   };

//   // 타임라인 애니메이션 제어 함수들
//   const playTimelineParallel = () => {
//     // 병렬 실행 - 모든 요소가 동시에 애니메이션
//     const elements = document.querySelectorAll(
//       ".timeline-parallel .timeline-item"
//     );
//     elements.forEach((element) => {
//       (element as HTMLElement).style.animation = "none";
//       (element as HTMLElement).offsetHeight;
//       (element as HTMLElement).style.animation =
//         "fadeIn 0.5s ease-out, slideUp 0.5s ease-out";
//     });
//   };

//   const playTimelineSequential = () => {
//     // 순차 실행 - 하나씩 차례대로 애니메이션
//     const elements = document.querySelectorAll(
//       ".timeline-sequential .timeline-item"
//     );
//     elements.forEach((element, index) => {
//       setTimeout(() => {
//         (element as HTMLElement).style.animation = "none";
//         (element as HTMLElement).offsetHeight;
//         (element as HTMLElement).style.animation = "scaleIn 0.4s ease-out";
//       }, index * 200);
//     });
//   };

//   const playTimelineStaggered = () => {
//     // 지연 실행 - 짧은 간격으로 연속 실행
//     const elements = document.querySelectorAll(
//       ".timeline-staggered .timeline-item"
//     );
//     elements.forEach((element, index) => {
//       setTimeout(() => {
//         (element as HTMLElement).style.animation = "none";
//         (element as HTMLElement).offsetHeight;
//         (element as HTMLElement).style.animation =
//           "fadeIn 0.3s ease-out, slideUp 0.3s ease-out";
//       }, index * 100);
//     });
//   };

//   const playComplexTimeline = () => {
//     // 복합 타임라인 - 여러 단계로 구성된 애니메이션
//     const stage1 = document.querySelectorAll(".complex-timeline .stage-1");
//     const stage2 = document.querySelectorAll(".complex-timeline .stage-2");
//     const stage3 = document.querySelectorAll(".complex-timeline .stage-3");

//     // 1단계: 페이드 인
//     stage1.forEach((element) => {
//       (element as HTMLElement).style.animation = "fadeIn 0.4s ease-out";
//     });

//     // 2단계: 400ms 후 슬라이드 업
//     setTimeout(() => {
//       stage2.forEach((element) => {
//         (element as HTMLElement).style.animation = "slideUp 0.4s ease-out";
//       });
//     }, 400);

//     // 3단계: 800ms 후 스케일 인
//     setTimeout(() => {
//       stage3.forEach((element) => {
//         (element as HTMLElement).style.animation = "scaleIn 0.4s ease-out";
//       });
//     }, 800);
//   };

//   // 조건부 타임라인 실행 함수들
//   const playConditionalTimeline = (condition: () => boolean) => {
//     const successElements = document.querySelectorAll(
//       ".conditional-timeline .success-item"
//     );
//     const errorElements = document.querySelectorAll(
//       ".conditional-timeline .error-item"
//     );

//     if (condition()) {
//       // 성공 조건: 초록색 애니메이션
//       successElements.forEach((element, index) => {
//         setTimeout(() => {
//           (element as HTMLElement).style.animation = "none";
//           (element as HTMLElement).offsetHeight;
//           (element as HTMLElement).style.animation =
//             "fadeIn 0.3s ease-out, scaleIn 0.3s ease-out";
//         }, index * 100);
//       });
//     } else {
//       // 실패 조건: 빨간색 애니메이션
//       errorElements.forEach((element, index) => {
//         setTimeout(() => {
//           (element as HTMLElement).style.animation = "none";
//           (element as HTMLElement).offsetHeight;
//           (element as HTMLElement).style.animation =
//             "fadeIn 0.3s ease-out, slideUp 0.3s ease-out";
//         }, index * 100);
//       });
//     }
//   };

//   const playUserRoleTimeline = (userRole: "admin" | "user" | "guest") => {
//     const adminElements = document.querySelectorAll(
//       ".role-timeline .admin-item"
//     );
//     const userElements = document.querySelectorAll(".role-timeline .user-item");
//     const guestElements = document.querySelectorAll(
//       ".role-timeline .guest-item"
//     );

//     // 모든 요소 초기화
//     [adminElements, userElements, guestElements].forEach((elements) => {
//       elements.forEach((element) => {
//         (element as HTMLElement).style.animation = "none";
//         (element as HTMLElement).style.opacity = "0.3";
//       });
//     });

//     // 역할에 따른 애니메이션 실행
//     switch (userRole) {
//       case "admin":
//         adminElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation =
//               "fadeIn 0.4s ease-out, scaleIn 0.4s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 150);
//         });
//         break;
//       case "user":
//         userElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation =
//               "fadeIn 0.4s ease-out, slideUp 0.4s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 150);
//         });
//         break;
//       case "guest":
//         guestElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation = "fadeIn 0.4s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 150);
//         });
//         break;
//     }
//   };

//   const playDeviceTimeline = (deviceType: "mobile" | "tablet" | "desktop") => {
//     const mobileElements = document.querySelectorAll(
//       ".device-timeline .mobile-item"
//     );
//     const tabletElements = document.querySelectorAll(
//       ".device-timeline .tablet-item"
//     );
//     const desktopElements = document.querySelectorAll(
//       ".device-timeline .desktop-item"
//     );

//     // 모든 요소 초기화
//     [mobileElements, tabletElements, desktopElements].forEach((elements) => {
//       elements.forEach((element) => {
//         (element as HTMLElement).style.animation = "none";
//         (element as HTMLElement).style.opacity = "0.3";
//       });
//     });

//     // 디바이스 타입에 따른 애니메이션 실행
//     switch (deviceType) {
//       case "mobile":
//         mobileElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation =
//               "fadeIn 0.3s ease-out, scaleIn 0.3s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 80);
//         });
//         break;
//       case "tablet":
//         tabletElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation =
//               "fadeIn 0.3s ease-out, slideUp 0.3s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 80);
//         });
//         break;
//       case "desktop":
//         desktopElements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation =
//               "fadeIn 0.3s ease-out, rotateIn 0.3s ease-out";
//             (element as HTMLElement).style.opacity = "1";
//           }, index * 80);
//         });
//         break;
//     }
//   };

//   const playTimeBasedTimeline = () => {
//     const hour = new Date().getHours();
//     const timeElements = document.querySelectorAll(".time-timeline .time-item");

//     // 시간대에 따른 다른 애니메이션
//     if (hour >= 6 && hour < 12) {
//       // 아침: 부드러운 페이드 인
//       timeElements.forEach((element, index) => {
//         setTimeout(() => {
//           (element as HTMLElement).style.animation = "fadeIn 0.5s ease-out";
//         }, index * 200);
//       });
//     } else if (hour >= 12 && hour < 18) {
//       // 오후: 활발한 스케일 인
//       timeElements.forEach((element, index) => {
//         setTimeout(() => {
//           (element as HTMLElement).style.animation = "scaleIn 0.4s ease-out";
//         }, index * 150);
//       });
//     } else {
//       // 저녁/밤: 차분한 슬라이드 업
//       timeElements.forEach((element, index) => {
//         setTimeout(() => {
//           (element as HTMLElement).style.animation = "slideUp 0.6s ease-out";
//         }, index * 250);
//       });
//     }
//   };

//   const toggleTrigger = () => {
//     setAnimationStates((prev) => ({
//       ...prev,
//       triggerAnimation: !prev.triggerAnimation,
//     }));
//   };

//   // 인터랙션 대기 타임라인 상태
//   const [interactiveTimelineState, setInteractiveTimelineState] = useState({
//     currentStep: 0,
//     isWaitingForInteraction: false,
//     waitingForStep: null as string | null,
//   });

//   // 이벤트 리스너 참조를 저장하기 위한 ref
//   const eventListenersRef = useRef<{
//     click?: (e: Event) => void;
//     mouseenter?: (e: Event) => void;
//     keydown?: (e: KeyboardEvent) => void;
//   }>({});

//   // 이벤트 리스너 정리 함수
//   const cleanupEventListeners = () => {
//     // 기존 이벤트 리스너 제거
//     if (eventListenersRef.current.click) {
//       document.removeEventListener("click", eventListenersRef.current.click);
//     }
//     if (eventListenersRef.current.mouseenter) {
//       document.removeEventListener(
//         "mouseenter",
//         eventListenersRef.current.mouseenter
//       );
//     }
//     if (eventListenersRef.current.keydown) {
//       window.removeEventListener("keydown", eventListenersRef.current.keydown);
//     }

//     // ref 초기화
//     eventListenersRef.current = {};
//   };

//   // 인터랙션 대기 타임라인 실행 함수
//   const playInteractiveTimeline = async (
//     steps: Array<{
//       id: string;
//       name: string;
//       animation?: {
//         elements: string;
//         animation: string;
//         delay?: number;
//       };
//       waitForInteraction?: {
//         type: "click" | "hover" | "keydown";
//         target: string;
//         message?: string;
//       };
//       delay?: number;
//     }>
//   ) => {
//     // 시작 전 기존 이벤트 리스너 정리
//     cleanupEventListeners();

//     for (let i = 0; i < steps.length; i++) {
//       const step = steps[i];

//       // 애니메이션 실행
//       if (step.animation) {
//         const elements = document.querySelectorAll(step.animation.elements);
//         elements.forEach((element, index) => {
//           setTimeout(() => {
//             (element as HTMLElement).style.animation = "none";
//             (element as HTMLElement).offsetHeight;
//             (element as HTMLElement).style.animation =
//               step.animation!.animation;
//           }, index * 100);
//         });
//       }

//       // 인터랙션 대기
//       if (step.waitForInteraction) {
//         setInteractiveTimelineState({
//           currentStep: i,
//           isWaitingForInteraction: true,
//           waitingForStep: step.id,
//         });

//         // 인터랙션 대기 메시지 표시
//         if (step.waitForInteraction.message) {
//           const messageElement = document.querySelector(".interactive-message");
//           if (messageElement) {
//             (messageElement as HTMLElement).textContent =
//               step.waitForInteraction.message;
//             (messageElement as HTMLElement).style.display = "block";
//           }
//         }

//         // 인터랙션 대기 Promise
//         await new Promise<void>((resolve) => {
//           const handleInteraction = () => {
//             setInteractiveTimelineState({
//               currentStep: i,
//               isWaitingForInteraction: false,
//               waitingForStep: null,
//             });

//             // 메시지 숨기기
//             const messageElement = document.querySelector(
//               ".interactive-message"
//             );
//             if (messageElement) {
//               (messageElement as HTMLElement).style.display = "none";
//             }

//             resolve();
//           };

//           // 인터랙션 타입에 따른 이벤트 리스너 등록
//           const targetElement = document.querySelector(
//             step.waitForInteraction!.target
//           );

//           if (targetElement) {
//             if (step.waitForInteraction!.type === "click") {
//               const clickHandler = (e: Event) => {
//                 if (e.target === targetElement) {
//                   handleInteraction();
//                 }
//               };
//               eventListenersRef.current.click = clickHandler;
//               document.addEventListener("click", clickHandler, { once: true });
//             } else if (step.waitForInteraction!.type === "hover") {
//               const hoverHandler = (e: Event) => {
//                 if (e.target === targetElement) {
//                   handleInteraction();
//                 }
//               };
//               eventListenersRef.current.mouseenter = hoverHandler;
//               document.addEventListener("mouseenter", hoverHandler, {
//                 once: true,
//               });
//             } else if (step.waitForInteraction!.type === "keydown") {
//               const keyHandler = (event: KeyboardEvent) => {
//                 if (event.key === "Enter" || event.key === " ") {
//                   handleInteraction();
//                 }
//               };
//               eventListenersRef.current.keydown = keyHandler;
//               window.addEventListener("keydown", keyHandler, { once: true });
//             }
//           }
//         });
//       }

//       // 스텝 완료 대기
//       const stepDelay = step.delay || 800;
//       await new Promise((resolve) => setTimeout(resolve, stepDelay));
//     }
//   };

//   // A → 클릭 대기 → B 노출 타임라인
//   const playClickWaitTimeline = () => {
//     const steps = [
//       {
//         id: "step1",
//         name: "A 애니메이션 실행",
//         animation: {
//           elements: ".interactive-wait-timeline .step-a",
//           animation: "fadeIn 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//       {
//         id: "step2",
//         name: "클릭 대기",
//         waitForInteraction: {
//           type: "click" as const,
//           target: ".interactive-wait-timeline .wait-button",
//           message: "버튼을 클릭하세요!",
//         },
//         delay: 500,
//       },
//       {
//         id: "step3",
//         name: "B 애니메이션 실행",
//         animation: {
//           elements: ".interactive-wait-timeline .step-b",
//           animation: "slideUp 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//     ];

//     playInteractiveTimeline(steps);
//   };

//   // A → 호버 대기 → B 노출 타임라인
//   const playHoverWaitTimeline = () => {
//     const steps = [
//       {
//         id: "step1",
//         name: "A 애니메이션 실행",
//         animation: {
//           elements: ".interactive-hover-wait .step-a",
//           animation: "scaleIn 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//       {
//         id: "step2",
//         name: "호버 대기",
//         waitForInteraction: {
//           type: "hover" as const,
//           target: ".interactive-hover-wait .wait-target",
//           message: "타겟에 마우스를 올려보세요!",
//         },
//         delay: 500,
//       },
//       {
//         id: "step3",
//         name: "B 애니메이션 실행",
//         animation: {
//           elements: ".interactive-hover-wait .step-b",
//           animation: "rotateIn 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//     ];

//     playInteractiveTimeline(steps);
//   };

//   // A → 키보드 대기 → B 노출 타임라인
//   const playKeyWaitTimeline = () => {
//     const steps = [
//       {
//         id: "step1",
//         name: "A 애니메이션 실행",
//         animation: {
//           elements: ".interactive-key-wait .step-a",
//           animation: "fadeIn 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//       {
//         id: "step2",
//         name: "키보드 대기",
//         waitForInteraction: {
//           type: "keydown" as const,
//           target: "body",
//           message: "Enter 또는 Space 키를 눌러보세요!",
//         },
//         delay: 500,
//       },
//       {
//         id: "step3",
//         name: "B 애니메이션 실행",
//         animation: {
//           elements: ".interactive-key-wait .step-b",
//           animation: "scaleIn 0.5s ease-out",
//         },
//         delay: 1000,
//       },
//     ];

//     playInteractiveTimeline(steps);
//   };

//   // 복합 인터랙션 대기 타임라인
//   const playComplexInteractiveTimeline = () => {
//     const steps = [
//       {
//         id: "step1",
//         name: "1단계: 시작",
//         animation: {
//           elements: ".interactive-complex .step-1",
//           animation: "fadeIn 0.4s ease-out",
//         },
//         delay: 800,
//       },
//       {
//         id: "step2",
//         name: "2단계: 클릭 대기",
//         waitForInteraction: {
//           type: "click" as const,
//           target: ".interactive-complex .wait-button-1",
//           message: "첫 번째 버튼을 클릭하세요!",
//         },
//         delay: 500,
//       },
//       {
//         id: "step3",
//         name: "3단계: 중간 애니메이션",
//         animation: {
//           elements: ".interactive-complex .step-2",
//           animation: "slideUp 0.4s ease-out",
//         },
//         delay: 800,
//       },
//       {
//         id: "step4",
//         name: "4단계: 호버 대기",
//         waitForInteraction: {
//           type: "hover" as const,
//           target: ".interactive-complex .wait-target",
//           message: "타겟에 마우스를 올려보세요!",
//         },
//         delay: 500,
//       },
//       {
//         id: "step5",
//         name: "5단계: 최종 애니메이션",
//         animation: {
//           elements: ".interactive-complex .step-3",
//           animation: "rotateIn 0.4s ease-out",
//         },
//         delay: 1000,
//       },
//     ];

//     playInteractiveTimeline(steps);
//   };

//   // 컴포넌트 언마운트 시 이벤트 리스너 정리
//   useEffect(() => {
//     return () => {
//       cleanupEventListeners();
//     };
//   }, []);

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Design System Demo</h1>
//         <button onClick={toggleTheme} className="theme-toggle">
//           🌙 Toggle Theme
//         </button>
//       </header>

//       <main className="app-main">
//         {/* Button Component */}
//         <section className="demo-section">
//           <h2>Button Component</h2>
//           <div className="button-showcase">
//             <Button onClick={() => console.log("React button clicked")}>
//               버튼 컴포넌트
//             </Button>
//             <Button>d</Button>
//           </div>
//         </section>
//         {/* Color Palette */}
//         <section className="demo-section">
//           <h2>Color Palette</h2>
//           <div className="color-showcase">
//             <div className="color-group">
//               <h3>Carrot (Brand)</h3>
//               <div className="color-scale">
//                 {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
//                   (shade) => (
//                     <div
//                       key={shade}
//                       className="color-swatch"
//                       style={{
//                         backgroundColor: `var(--ds-color-carrot-${shade})`,
//                       }}
//                       title={`carrot-${shade}`}
//                     >
//                       <span className="color-label">{shade}</span>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="color-group">
//               <h3>Gray (Neutral)</h3>
//               <div className="color-scale">
//                 {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
//                   (shade) => (
//                     <div
//                       key={shade}
//                       className="color-swatch"
//                       style={{
//                         backgroundColor: `var(--ds-color-gray-${shade})`,
//                       }}
//                       title={`gray-${shade}`}
//                     >
//                       <span className="color-label">{shade}</span>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="color-group">
//               <h3>Semantic Colors</h3>
//               <div className="semantic-colors">
//                 <div
//                   className="semantic-swatch"
//                   style={{
//                     backgroundColor: "var(--ds-semantic-color-fg-brand)",
//                   }}
//                 >
//                   Brand
//                 </div>
//                 <div
//                   className="semantic-swatch"
//                   style={{
//                     backgroundColor: "var(--ds-semantic-color-fg-informative)",
//                   }}
//                 >
//                   Info
//                 </div>
//                 <div
//                   className="semantic-swatch"
//                   style={{
//                     backgroundColor: "var(--ds-semantic-color-fg-positive)",
//                   }}
//                 >
//                   Success
//                 </div>
//                 <div
//                   className="semantic-swatch"
//                   style={{
//                     backgroundColor: "var(--ds-semantic-color-fg-warning)",
//                   }}
//                 >
//                   Warning
//                 </div>
//                 <div
//                   className="semantic-swatch"
//                   style={{
//                     backgroundColor: "var(--ds-semantic-color-fg-critical)",
//                   }}
//                 >
//                   Error
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Typography */}
//         <section className="demo-section">
//           <h2>Typography</h2>
//           <div className="typography-showcase">
//             <div className="typography-item">
//               <h1 className="typography-h1">Heading 1</h1>
//               <code>
//                 var(--ds-semantic-typography-h1-font-size) /
//                 var(--ds-semantic-typography-h1-line-height) /
//                 var(--ds-font-weight-bold)
//               </code>
//             </div>
//             <div className="typography-item">
//               <h2 className="typography-h2">Heading 2</h2>
//               <code>
//                 var(--ds-font-size-t8-static) / var(--ds-line-height-t8-static)
//                 / var(--ds-font-weight-medium)
//               </code>
//             </div>
//             <div className="typography-item">
//               <h3 className="typography-h3">Heading 3</h3>
//               <code>
//                 var(--ds-font-size-t7-static) / var(--ds-line-height-t7-static)
//                 / var(--ds-font-weight-medium)
//               </code>
//             </div>
//             <div className="typography-item">
//               <p className="typography-body">
//                 This is body text using design tokens. It demonstrates how
//                 semantic tokens automatically adapt to light and dark themes.
//               </p>
//               <code>
//                 var(--ds-semantic-typography-body-font-size) /
//                 var(--ds-semantic-typography-body-line-height) /
//                 var(--ds-font-weight-regular)
//               </code>
//             </div>
//             <div className="typography-item">
//               <p className="typography-caption">
//                 This is caption text for smaller details and metadata.
//               </p>
//               <code>
//                 var(--ds-semantic-typography-caption-font-size) /
//                 var(--ds-semantic-typography-caption-line-height) /
//                 var(--ds-font-weight-regular)
//               </code>
//             </div>
//           </div>
//         </section>

//         {/* Buttons */}
//         <section className="demo-section">
//           <h2>Buttons</h2>
//           <div className="button-showcase">
//             <div className="button-group">
//               <button className="ds-btn ds-btn-primary">Primary</button>
//               <button className="ds-btn ds-btn-secondary">Secondary</button>
//               <button className="ds-btn ds-btn-ghost">Ghost</button>
//               <button className="ds-btn ds-btn-outline">Outline</button>
//             </div>
//             <div className="button-group">
//               <button className="ds-btn ds-btn-primary" disabled>
//                 Disabled
//               </button>
//               <button className="ds-btn ds-btn-secondary" disabled>
//                 Disabled
//               </button>
//             </div>
//             <div className="button-group">
//               <Button onClick={() => console.log("React button clicked")}>
//                 React Component
//               </Button>
//               <Button
//                 leftIcon="🔍"
//                 rightIcon="→"
//                 onClick={() => console.log("Button with icons clicked")}
//               >
//                 아이콘 버튼
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* Form Elements */}
//         <section className="demo-section">
//           <h2>Form Elements</h2>
//           <div className="form-showcase">
//             <div className="form-group">
//               <label htmlFor="input1">Input Field</label>
//               <input
//                 id="input1"
//                 type="text"
//                 placeholder="Enter text here..."
//                 className="ds-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="textarea1">Textarea</label>
//               <textarea
//                 id="textarea1"
//                 placeholder="Enter longer text here..."
//                 className="ds-textarea"
//                 rows={4}
//               />
//             </div>
//             <div className="form-group">
//               <label className="ds-checkbox">
//                 <input type="checkbox" />
//                 <span>Checkbox option</span>
//               </label>
//             </div>
//           </div>
//         </section>

//         {/* Cards */}
//         <section className="demo-section">
//           <h2>Cards</h2>
//           <div className="card-grid">
//             <div className="ds-card">
//               <h3>Card Title</h3>
//               <p>
//                 This is a card component using design tokens for consistent
//                 spacing and colors.
//               </p>
//               <button className="ds-btn ds-btn-primary">Action</button>
//             </div>
//             <div className="ds-card">
//               <h3>Another Card</h3>
//               <p>
//                 Cards automatically adapt to the current theme using semantic
//                 color tokens.
//               </p>
//               <button className="ds-btn ds-btn-ghost">Learn More</button>
//             </div>
//           </div>
//         </section>

//         {/* React Card Components */}
//         <section className="demo-section">
//           <h2>React Card Components</h2>

//           {/* Basic Card */}
//           <div className="card-showcase">
//             <h3>Basic Card</h3>
//             <Card.Root>
//               <Card.Header>
//                 <Card.Title>기본 카드</Card.Title>
//                 <Card.Description>
//                   이것은 기본적인 카드 컴포넌트입니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>카드의 본문 내용이 여기에 들어갑니다.</p>
//               </Card.Body>
//               <Card.Footer>
//                 <Button onClick={() => console.log("Card action clicked")}>
//                   액션 버튼
//                 </Button>
//               </Card.Footer>
//             </Card.Root>
//           </div>

//           {/* Interactive Button Card */}
//           <div className="card-showcase">
//             <h3>Interactive Button Card</h3>
//             <Card.Root action="button">
//               <Card.Header>
//                 <Card.Title>클릭 가능한 카드</Card.Title>
//                 <Card.Description>
//                   이 카드는 버튼처럼 동작합니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>카드를 클릭하거나 키보드로 활성화할 수 있습니다.</p>
//               </Card.Body>
//             </Card.Root>
//           </div>

//           {/* Toggle Card */}
//           <div className="card-showcase">
//             <h3>Toggle Card</h3>
//             <Card.Root action="button" pressed={false}>
//               <Card.Header>
//                 <Card.Title>토글 카드</Card.Title>
//                 <Card.Description>
//                   선택 상태를 표시할 수 있는 카드입니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>aria-pressed 속성으로 선택 상태를 관리합니다.</p>
//               </Card.Body>
//             </Card.Root>
//           </div>

//           {/* Disabled Card */}
//           <div className="card-showcase">
//             <h3>Disabled Card</h3>
//             <Card.Root action="button" disabled>
//               <Card.Header>
//                 <Card.Title>비활성화된 카드</Card.Title>
//                 <Card.Description>
//                   이 카드는 비활성화되어 있습니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>클릭해도 반응하지 않습니다.</p>
//               </Card.Body>
//             </Card.Root>
//           </div>

//           {/* Card with Media */}
//           <div className="card-showcase">
//             <h3>Card with Media</h3>
//             <Card.Root>
//               <Card.Media>
//                 <div
//                   style={{
//                     height: "200px",
//                     background:
//                       "linear-gradient(45deg, var(--ds-color-carrot-500), var(--ds-color-carrot-700))",
//                     borderRadius: "var(--ds-radius-2, 12px)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     fontSize: "1.5rem",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   미디어 영역
//                 </div>
//               </Card.Media>
//               <Card.Header>
//                 <Card.Title>미디어가 있는 카드</Card.Title>
//                 <Card.Description>
//                   이미지나 비디오를 포함할 수 있습니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>미디어 콘텐츠와 함께 사용되는 카드입니다.</p>
//               </Card.Body>
//             </Card.Root>
//           </div>

//           {/* Polymorphic Card */}
//           <div className="card-showcase">
//             <h3>Polymorphic Card (as="article")</h3>
//             <Card.Root as="article">
//               <Card.Header>
//                 <Card.Title as="h2">시맨틱 카드</Card.Title>
//                 <Card.Description>
//                   article 요소로 렌더링되는 카드입니다.
//                 </Card.Description>
//               </Card.Header>
//               <Card.Body>
//                 <p>시맨틱 HTML을 사용하여 접근성을 향상시킵니다.</p>
//               </Card.Body>
//             </Card.Root>
//           </div>

//           {/* AsChild Card */}
//           <div className="card-showcase">
//             <h3>AsChild Card</h3>
//             <Card.Root asChild>
//               <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
//                 <Card.Header>
//                   <Card.Title>링크로 동작하는 카드</Card.Title>
//                   <Card.Description>
//                     asChild prop을 사용하여 기존 요소를 확장합니다.
//                   </Card.Description>
//                 </Card.Header>
//                 <Card.Body>
//                   <p>이 카드는 링크 요소로 렌더링됩니다.</p>
//                 </Card.Body>
//               </a>
//             </Card.Root>
//           </div>
//         </section>

//         {/* Dialog Component */}
//         <section className="demo-section">
//           <h2>Dialog Component</h2>
//           <div className="dialog-showcase">
//             <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
//               {/* 기본 Dialog (오버레이 클릭으로 닫기 가능) */}
//               <Dialog.Root>
//                 <Dialog.Trigger>기본 다이얼로그</Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay>
//                     <Dialog.Content>
//                       <Dialog.Title>기본 다이얼로그</Dialog.Title>
//                       <Dialog.Description>
//                         오버레이를 클릭하면 닫힙니다.
//                       </Dialog.Description>
//                       <Dialog.Close>닫기</Dialog.Close>
//                     </Dialog.Content>
//                   </Dialog.Overlay>
//                 </Dialog.Portal>
//               </Dialog.Root>

//               {/* 오버레이 클릭으로 닫기 불가능한 Dialog */}
//               <Dialog.Root closeOnOutsideClick={false}>
//                 <Dialog.Trigger>오버레이 클릭 불가</Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay>
//                     <Dialog.Content>
//                       <Dialog.Title>오버레이 클릭 불가</Dialog.Title>
//                       <Dialog.Description>
//                         오버레이를 클릭해도 닫히지 않습니다. 닫기 버튼이나
//                         Escape 키를 사용하세요.
//                       </Dialog.Description>
//                       <Dialog.Close>닫기</Dialog.Close>
//                     </Dialog.Content>
//                   </Dialog.Overlay>
//                 </Dialog.Portal>
//               </Dialog.Root>

//               {/* Escape 키로도 닫기 불가능한 Dialog */}
//               <Dialog.Root closeOnOutsideClick={false} closeOnEscape={false}>
//                 <Dialog.Trigger>강제 다이얼로그</Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay>
//                     <Dialog.Content>
//                       <Dialog.Title>강제 다이얼로그</Dialog.Title>
//                       <Dialog.Description>
//                         오버레이 클릭과 Escape 키로 닫을 수 없습니다. 반드시
//                         닫기 버튼을 사용하세요.
//                       </Dialog.Description>
//                       <Dialog.Close>닫기</Dialog.Close>
//                     </Dialog.Content>
//                   </Dialog.Overlay>
//                 </Dialog.Portal>
//               </Dialog.Root>
//             </div>

//             {/* 외부 제어 Dialog 예제 */}
//             <div style={{ marginTop: "32px" }}>
//               <h3>외부 제어 Dialog</h3>

//               {/* ref를 통한 외부 제어 Dialog */}
//               <Dialog.Root ref={dialogRef}>
//                 <Dialog.Trigger>외부 제어 다이얼로그</Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay>
//                     <Dialog.Content>
//                       <Dialog.Title>외부 제어 다이얼로그</Dialog.Title>
//                       <Dialog.Description>
//                         이 다이얼로그는 내부 버튼들로 제어할 수 있습니다. ref를
//                         통해 직접 상태를 조작할 수 있습니다.
//                       </Dialog.Description>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "8px",
//                           marginTop: "16px",
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         <Dialog.Close>닫기</Dialog.Close>
//                         <button
//                           onClick={() => dialogRef.current?.toggle()}
//                           className="ds-btn ds-btn-secondary"
//                         >
//                           토글
//                         </button>
//                         <button
//                           onClick={openDialogExternally}
//                           className="ds-btn ds-btn-primary"
//                         >
//                           열기
//                         </button>
//                         <button
//                           onClick={closeDialogExternally}
//                           className="ds-btn ds-btn-secondary"
//                         >
//                           닫기
//                         </button>
//                         <button
//                           onClick={toggleDialogExternally}
//                           className="ds-btn ds-btn-ghost"
//                         >
//                           토글
//                         </button>
//                         <button
//                           onClick={() => setDialogStateExternally(true)}
//                           className="ds-btn ds-btn-outline"
//                         >
//                           강제 열기
//                         </button>
//                         <button
//                           onClick={() => setDialogStateExternally(false)}
//                           className="ds-btn ds-btn-outline"
//                         >
//                           강제 닫기
//                         </button>
//                       </div>
//                     </Dialog.Content>
//                   </Dialog.Overlay>
//                 </Dialog.Portal>
//               </Dialog.Root>
//             </div>

//             {/* Controlled Dialog 예제 */}
//             <div style={{ marginTop: "32px" }}>
//               <h3>Controlled Dialog (onOpenChange 사용)</h3>

//               <Dialog.Root
//                 open={controlledDialogOpen}
//                 onOpenChange={setControlledDialogOpen}
//               >
//                 <Dialog.Trigger>Controlled 다이얼로그</Dialog.Trigger>
//                 <Dialog.Portal>
//                   <Dialog.Overlay>
//                     <Dialog.Content>
//                       <Dialog.Title>Controlled 다이얼로그</Dialog.Title>
//                       <Dialog.Description>
//                         이 다이얼로그는 open prop과 onOpenChange로 제어됩니다.
//                         내부 버튼들로 상태를 조작할 수 있습니다.
//                       </Dialog.Description>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "8px",
//                           marginTop: "16px",
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         <Dialog.Close>닫기</Dialog.Close>
//                         <button
//                           onClick={() =>
//                             setControlledDialogOpen(!controlledDialogOpen)
//                           }
//                           className="ds-btn ds-btn-secondary"
//                         >
//                           토글
//                         </button>
//                         <button
//                           onClick={() => setControlledDialogOpen(true)}
//                           className="ds-btn ds-btn-primary"
//                         >
//                           열기
//                         </button>
//                         <button
//                           onClick={() => setControlledDialogOpen(false)}
//                           className="ds-btn ds-btn-secondary"
//                         >
//                           닫기
//                         </button>
//                         <button
//                           onClick={() =>
//                             setControlledDialogOpen(!controlledDialogOpen)
//                           }
//                           className="ds-btn ds-btn-ghost"
//                         >
//                           토글
//                         </button>
//                       </div>
//                     </Dialog.Content>
//                   </Dialog.Overlay>
//                 </Dialog.Portal>
//               </Dialog.Root>

//               <p
//                 style={{
//                   marginTop: "16px",
//                   color: "var(--ds-semantic-color-fg-secondary)",
//                 }}
//               >
//                 현재 상태: {controlledDialogOpen ? "열림" : "닫힘"}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Checkbox Component */}
//         <section className="demo-section">
//           <h2>Checkbox Component</h2>
//           <div className="checkbox-showcase">
//             <div
//               style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//             >
//               {/* 기본 Checkbox */}
//               <Checkbox.Root
//                 className="CheckboxRoot"
//                 checked={checkboxStates.basic}
//                 id="c1"
//                 onCheckedChange={handleCheckboxChange("basic")}
//               >
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   ✓
//                 </Checkbox.Indicator>
//                 <Checkbox.Label className="Label">
//                   Accept terms and conditions.
//                 </Checkbox.Label>
//               </Checkbox.Root>

//               {/* Controlled Checkbox */}
//               <Checkbox.Root
//                 className="CheckboxRoot"
//                 checked={checkboxStates.controlled}
//                 id="c2"
//                 onCheckedChange={handleCheckboxChange("controlled")}
//               >
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   ✓
//                 </Checkbox.Indicator>
//                 <Checkbox.Label className="Label">
//                   Controlled checkbox (현재 상태:{" "}
//                   {checkboxStates.controlled ? "체크됨" : "체크 안됨"})
//                 </Checkbox.Label>
//               </Checkbox.Root>

//               {/* Disabled Checkbox */}
//               <Checkbox.Root className="CheckboxRoot" disabled={true} id="c4">
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   ✓
//                 </Checkbox.Indicator>
//                 <Checkbox.Label className="Label">
//                   Disabled checkbox
//                 </Checkbox.Label>
//               </Checkbox.Root>

//               {/* ReadOnly Checkbox */}
//               <Checkbox.Root
//                 className="CheckboxRoot"
//                 readOnly={true}
//                 defaultChecked={true}
//                 id="c5"
//               >
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   ✓
//                 </Checkbox.Indicator>
//                 <Checkbox.Label className="Label">
//                   ReadOnly checkbox
//                 </Checkbox.Label>
//               </Checkbox.Root>

//               {/* Required Checkbox */}
//               <Checkbox.Root className="CheckboxRoot" required={true} id="c6">
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   ✓
//                 </Checkbox.Indicator>
//                 <Checkbox.Label className="Label">
//                   Required checkbox *
//                 </Checkbox.Label>
//               </Checkbox.Root>
//             </div>

//             {/* 상태 표시 */}
//             <div
//               style={{
//                 marginTop: "24px",
//                 padding: "16px",
//                 backgroundColor: "#f5f5f5",
//                 borderRadius: "8px",
//               }}
//             >
//               <h4>현재 Checkbox 상태들:</h4>
//               <ul>
//                 <li>Basic: {checkboxStates.basic ? "체크됨" : "체크 안됨"}</li>
//                 <li>
//                   Controlled:{" "}
//                   {checkboxStates.controlled ? "체크됨" : "체크 안됨"}
//                 </li>
//                 <li>Disabled: 항상 비활성화</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* Rally 애니메이션 시스템 데모 섹션 */}
//         <section
//           style={{
//             padding: "48px 32px",
//             borderBottom: "1px solid #e0e0e0",
//             background: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "16px",
//                 fontWeight: "700",
//                 textAlign: "center",
//               }}
//             >
//               🎬 Rally 애니메이션 시스템
//             </h2>
//             <p
//               style={{
//                 fontSize: "1.2rem",
//                 opacity: 0.9,
//                 marginBottom: "48px",
//                 textAlign: "center",
//               }}
//             >
//               토스의 Rally 시스템을 기반으로 한 React 애니메이션 라이브러리
//             </p>

//             {/* 애니메이션 컨트롤 패널 */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                 gap: "16px",
//                 marginBottom: "32px",
//               }}
//             >
//               <button
//                 onClick={playFadeIn}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 ✨ 페이드 인
//               </button>

//               <button
//                 onClick={playSlideUp}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 ⬆️ 슬라이드 업
//               </button>

//               <button
//                 onClick={playScale}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 🔍 스케일 인
//               </button>

//               <button
//                 onClick={playComplex}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 🎭 복합 애니메이션
//               </button>

//               <button
//                 onClick={playSequential}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 🎪 순차 애니메이션
//               </button>

//               <button
//                 onClick={toggleTrigger}
//                 style={{
//                   padding: "12px 24px",
//                   background: "rgba(255, 255, 255, 0.2)",
//                   border: "2px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: "12px",
//                   color: "white",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: "600",
//                   transition: "all 0.2s ease",
//                   backdropFilter: "blur(10px)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
//                   e.currentTarget.style.transform = "translateY(0)";
//                 }}
//               >
//                 🔄 회전 애니메이션
//               </button>
//             </div>

//             {/* 애니메이션 타겟 요소들 */}
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//                 gap: "24px",
//                 marginTop: "32px",
//               }}
//             >
//               {/* 기본 애니메이션 타겟들 */}
//               <div
//                 className="fade-in-target"
//                 style={{
//                   padding: "24px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                 }}
//               >
//                 <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>
//                   페이드 인 애니메이션
//                 </h3>
//                 <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                   opacity: 0 → 1
//                 </p>
//               </div>

//               <div
//                 className="slide-up-target"
//                 style={{
//                   padding: "24px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                 }}
//               >
//                 <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>
//                   슬라이드 업 애니메이션
//                 </h3>
//                 <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                   translateY(30px) → translateY(0)
//                 </p>
//               </div>

//               <div
//                 className="scale-target"
//                 style={{
//                   padding: "24px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                 }}
//               >
//                 <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>
//                   스케일 인 애니메이션
//                 </h3>
//                 <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                   scale(0.8) → scale(1)
//                 </p>
//               </div>

//               {/* 복합 애니메이션 타겟 */}
//               <div
//                 className="complex-animation-target"
//                 style={{
//                   padding: "24px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                   opacity: 0,
//                 }}
//               >
//                 <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>
//                   복합 애니메이션
//                 </h3>
//                 <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                   페이드 + 슬라이드 + 스케일
//                 </p>
//               </div>

//               {/* 순차 애니메이션 타겟들 */}
//               <div
//                 className="seq-1"
//                 style={{
//                   padding: "20px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                   opacity: 0,
//                 }}
//               >
//                 <h4 style={{ fontSize: "1rem" }}>순차 1</h4>
//               </div>

//               <div
//                 className="seq-2"
//                 style={{
//                   padding: "20px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                   opacity: 0,
//                 }}
//               >
//                 <h4 style={{ fontSize: "1rem" }}>순차 2</h4>
//               </div>

//               <div
//                 className="seq-3"
//                 style={{
//                   padding: "20px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                   opacity: 0,
//                 }}
//               >
//                 <h4 style={{ fontSize: "1rem" }}>순차 3</h4>
//               </div>

//               {/* 회전 애니메이션 타겟 */}
//               <div
//                 className="rotate-target"
//                 style={{
//                   padding: "24px",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   backdropFilter: "blur(10px)",
//                   textAlign: "center",
//                   transform: animationStates.triggerAnimation
//                     ? "rotate(360deg)"
//                     : "rotate(0deg)",
//                   transition: "transform 0.6s ease-out",
//                 }}
//               >
//                 <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>
//                   회전 애니메이션
//                 </h3>
//                 <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                   rotate(0deg) → rotate(360deg)
//                 </p>
//               </div>
//             </div>

//             {/* CSS 애니메이션 예제 */}
//             <div style={{ marginTop: "48px" }}>
//               <h3
//                 style={{
//                   fontSize: "1.8rem",
//                   marginBottom: "24px",
//                   textAlign: "center",
//                 }}
//               >
//                 🎨 CSS 애니메이션 예제
//               </h3>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                   gap: "24px",
//                 }}
//               >
//                 <div
//                   className="animate-fadeIn"
//                   style={{
//                     padding: "24px",
//                     background: "rgba(255, 255, 255, 0.15)",
//                     borderRadius: "16px",
//                     border: "1px solid rgba(255, 255, 255, 0.3)",
//                     backdropFilter: "blur(10px)",
//                     textAlign: "center",
//                   }}
//                 >
//                   <h4 style={{ marginBottom: "12px" }}>FadeIn 애니메이션</h4>
//                   <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                     자동으로 페이드 인됩니다
//                   </p>
//                 </div>

//                 <div
//                   className="animate-slideUp"
//                   style={{
//                     padding: "24px",
//                     background: "rgba(255, 255, 255, 0.15)",
//                     borderRadius: "16px",
//                     border: "1px solid rgba(255, 255, 255, 0.3)",
//                     backdropFilter: "blur(10px)",
//                     textAlign: "center",
//                     animationDelay: "0.2s",
//                   }}
//                 >
//                   <h4 style={{ marginBottom: "12px" }}>SlideUp 애니메이션</h4>
//                   <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                     200ms 지연 후 슬라이드 업
//                   </p>
//                 </div>

//                 <div
//                   className="animate-scaleIn"
//                   style={{
//                     padding: "24px",
//                     background: "rgba(255, 255, 255, 0.15)",
//                     borderRadius: "16px",
//                     border: "1px solid rgba(255, 255, 255, 0.3)",
//                     backdropFilter: "blur(10px)",
//                     textAlign: "center",
//                     animationDelay: "0.4s",
//                   }}
//                 >
//                   <h4 style={{ marginBottom: "12px" }}>ScaleIn 애니메이션</h4>
//                   <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
//                     400ms 지연 후 스케일 인
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* 프리셋 예제 */}
//             <div style={{ marginTop: "48px" }}>
//               <h3
//                 style={{
//                   fontSize: "1.8rem",
//                   marginBottom: "24px",
//                   textAlign: "center",
//                 }}
//               >
//                 🎯 프리셋 애니메이션 예제
//               </h3>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                   gap: "16px",
//                 }}
//               >
//                 {[
//                   { name: "fadeIn", label: "페이드 인" },
//                   { name: "slideUp", label: "슬라이드 업" },
//                   { name: "scaleIn", label: "스케일 인" },
//                   { name: "rotateIn", label: "회전 인" },
//                 ].map((preset) => (
//                   <div
//                     key={preset.name}
//                     style={{
//                       padding: "20px",
//                       background: "rgba(255, 255, 255, 0.1)",
//                       borderRadius: "12px",
//                       border: "1px solid rgba(255, 255, 255, 0.2)",
//                       backdropFilter: "blur(10px)",
//                       textAlign: "center",
//                       cursor: "pointer",
//                       transition: "all 0.2s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.2)";
//                       e.currentTarget.style.transform = "translateY(-2px)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.1)";
//                       e.currentTarget.style.transform = "translateY(0)";
//                     }}
//                     onClick={(e) => {
//                       // 프리셋 애니메이션 실행
//                       const element = e.currentTarget;
//                       element.style.animation = "none";
//                       element.offsetHeight; // 리플로우 강제
//                       element.style.animation = `${preset.name} 0.5s ease-out`;
//                     }}
//                   >
//                     <h4 style={{ fontSize: "1rem", marginBottom: "8px" }}>
//                       {preset.label}
//                     </h4>
//                     <p style={{ opacity: 0.7, fontSize: "0.8rem" }}>
//                       {preset.name}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 타임라인 애니메이션 섹션 */}
//         <section
//           style={{
//             padding: "48px 32px",
//             borderBottom: "1px solid #e0e0e0",
//             background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "16px",
//                 fontWeight: "700",
//                 textAlign: "center",
//               }}
//             >
//               🎬 타임라인 애니메이션 제어
//             </h2>
//             <p
//               style={{
//                 fontSize: "1.2rem",
//                 opacity: 0.9,
//                 marginBottom: "48px",
//                 textAlign: "center",
//               }}
//             >
//               Rally 시스템의 타임라인 기능으로 복잡한 애니메이션 시퀀스를
//               제어해보세요.
//             </p>

//             <div style={{ display: "grid", gap: "32px" }}>
//               {/* 병렬 실행 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   ⚡ 병렬 실행 (Parallel)
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   모든 요소가 동시에 애니메이션됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playTimelineParallel}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     병렬 실행하기
//                   </Button>
//                 </div>
//                 <div
//                   className="timeline-parallel"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="timeline-item"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         background: "rgba(255, 255, 255, 0.2)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.2rem",
//                         fontWeight: "bold",
//                         opacity: 0,
//                         transform: "translateY(20px)",
//                       }}
//                     >
//                       {i}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 순차 실행 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🔄 순차 실행 (Sequential)
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   요소들이 200ms 간격으로 차례대로 애니메이션됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playTimelineSequential}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     순차 실행하기
//                   </Button>
//                 </div>
//                 <div
//                   className="timeline-sequential"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="timeline-item"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         background: "rgba(255, 255, 255, 0.2)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.2rem",
//                         fontWeight: "bold",
//                         opacity: 0,
//                         transform: "scale(0.8)",
//                       }}
//                     >
//                       {i}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 지연 실행 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🌊 지연 실행 (Staggered)
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   요소들이 100ms 간격으로 빠르게 연속 실행됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playTimelineStaggered}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     지연 실행하기
//                   </Button>
//                 </div>
//                 <div
//                   className="timeline-staggered"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div
//                       key={i}
//                       className="timeline-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(255, 255, 255, 0.2)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1rem",
//                         fontWeight: "bold",
//                         opacity: 0,
//                         transform: "translateY(20px)",
//                       }}
//                     >
//                       {i}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 복합 타임라인 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🎭 복합 타임라인 (Complex Timeline)
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   여러 단계로 구성된 복잡한 애니메이션 시퀀스입니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playComplexTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     복합 타임라인 실행하기
//                   </Button>
//                 </div>
//                 <div
//                   className="complex-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "16px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <div
//                     className="stage-1"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "16px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                     }}
//                   >
//                     1단계
//                   </div>
//                   <div
//                     className="stage-2"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "16px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "translateY(20px)",
//                     }}
//                   >
//                     2단계
//                   </div>
//                   <div
//                     className="stage-3"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "16px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "scale(0.8)",
//                     }}
//                   >
//                     3단계
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 조건부 타임라인 애니메이션 섹션 */}
//         <section
//           style={{
//             padding: "48px 32px",
//             borderBottom: "1px solid #e0e0e0",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "16px",
//                 fontWeight: "700",
//                 textAlign: "center",
//               }}
//             >
//               🎯 조건부 타임라인 애니메이션
//             </h2>
//             <p
//               style={{
//                 fontSize: "1.2rem",
//                 opacity: 0.9,
//                 marginBottom: "48px",
//                 textAlign: "center",
//               }}
//             >
//               다양한 조건에 따라 다른 애니메이션 시퀀스를 실행해보세요.
//             </p>

//             <div style={{ display: "grid", gap: "32px" }}>
//               {/* 성공/실패 조건부 애니메이션 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   ✅ 성공/실패 조건부 애니메이션
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   조건에 따라 성공(초록) 또는 실패(빨강) 애니메이션이
//                   실행됩니다.
//                 </p>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <Button
//                     onClick={() => playConditionalTimeline(() => true)}
//                     style={{
//                       background: "rgba(34, 197, 94, 0.8)",
//                       border: "1px solid rgba(34, 197, 94, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     성공 시나리오
//                   </Button>
//                   <Button
//                     onClick={() => playConditionalTimeline(() => false)}
//                     style={{
//                       background: "rgba(239, 68, 68, 0.8)",
//                       border: "1px solid rgba(239, 68, 68, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     실패 시나리오
//                   </Button>
//                 </div>
//                 <div
//                   className="conditional-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {[1, 2, 3].map((i) => (
//                     <div
//                       key={`success-${i}`}
//                       className="success-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(34, 197, 94, 0.3)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1rem",
//                         fontWeight: "bold",
//                         opacity: 0,
//                         transform: "scale(0.8)",
//                         border: "2px solid rgba(34, 197, 94, 0.5)",
//                       }}
//                     >
//                       ✓
//                     </div>
//                   ))}
//                   {[1, 2, 3].map((i) => (
//                     <div
//                       key={`error-${i}`}
//                       className="error-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(239, 68, 68, 0.3)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1rem",
//                         fontWeight: "bold",
//                         opacity: 0,
//                         transform: "translateY(20px)",
//                         border: "2px solid rgba(239, 68, 68, 0.5)",
//                       }}
//                     >
//                       ✗
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 사용자 역할별 애니메이션 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   👤 사용자 역할별 애니메이션
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   사용자 역할에 따라 다른 애니메이션과 권한이 표시됩니다.
//                 </p>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <Button
//                     onClick={() => playUserRoleTimeline("admin")}
//                     style={{
//                       background: "rgba(168, 85, 247, 0.8)",
//                       border: "1px solid rgba(168, 85, 247, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     관리자
//                   </Button>
//                   <Button
//                     onClick={() => playUserRoleTimeline("user")}
//                     style={{
//                       background: "rgba(59, 130, 246, 0.8)",
//                       border: "1px solid rgba(59, 130, 246, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     일반 사용자
//                   </Button>
//                   <Button
//                     onClick={() => playUserRoleTimeline("guest")}
//                     style={{
//                       background: "rgba(107, 114, 128, 0.8)",
//                       border: "1px solid rgba(107, 114, 128, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     게스트
//                   </Button>
//                 </div>
//                 <div
//                   className="role-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   {["관리", "편집", "보기", "삭제"].map((permission, index) => (
//                     <div
//                       key={`admin-${index}`}
//                       className="admin-item"
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         background: "rgba(168, 85, 247, 0.3)",
//                         borderRadius: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "0.8rem",
//                         fontWeight: "bold",
//                         opacity: 0.3,
//                         border: "1px solid rgba(168, 85, 247, 0.5)",
//                       }}
//                     >
//                       {permission}
//                     </div>
//                   ))}
//                   {["편집", "보기"].map((permission, index) => (
//                     <div
//                       key={`user-${index}`}
//                       className="user-item"
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         background: "rgba(59, 130, 246, 0.3)",
//                         borderRadius: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "0.8rem",
//                         fontWeight: "bold",
//                         opacity: 0.3,
//                         border: "1px solid rgba(59, 130, 246, 0.5)",
//                       }}
//                     >
//                       {permission}
//                     </div>
//                   ))}
//                   {["보기"].map((permission, index) => (
//                     <div
//                       key={`guest-${index}`}
//                       className="guest-item"
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         background: "rgba(107, 114, 128, 0.3)",
//                         borderRadius: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "0.8rem",
//                         fontWeight: "bold",
//                         opacity: 0.3,
//                         border: "1px solid rgba(107, 114, 128, 0.5)",
//                       }}
//                     >
//                       {permission}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 디바이스별 애니메이션 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   📱 디바이스별 애니메이션
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   디바이스 타입에 따라 최적화된 애니메이션이 실행됩니다.
//                 </p>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <Button
//                     onClick={() => playDeviceTimeline("mobile")}
//                     style={{
//                       background: "rgba(16, 185, 129, 0.8)",
//                       border: "1px solid rgba(16, 185, 129, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     모바일
//                   </Button>
//                   <Button
//                     onClick={() => playDeviceTimeline("tablet")}
//                     style={{
//                       background: "rgba(245, 158, 11, 0.8)",
//                       border: "1px solid rgba(245, 158, 11, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     태블릿
//                   </Button>
//                   <Button
//                     onClick={() => playDeviceTimeline("desktop")}
//                     style={{
//                       background: "rgba(139, 92, 246, 0.8)",
//                       border: "1px solid rgba(139, 92, 246, 0.9)",
//                       color: "white",
//                     }}
//                   >
//                     데스크톱
//                   </Button>
//                 </div>
//                 <div
//                   className="device-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {["📱", "📲", "🔋"].map((icon, index) => (
//                     <div
//                       key={`mobile-${index}`}
//                       className="mobile-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(16, 185, 129, 0.3)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.5rem",
//                         opacity: 0.3,
//                         border: "2px solid rgba(16, 185, 129, 0.5)",
//                       }}
//                     >
//                       {icon}
//                     </div>
//                   ))}
//                   {["📱", "⌚", "🎧"].map((icon, index) => (
//                     <div
//                       key={`tablet-${index}`}
//                       className="tablet-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(245, 158, 11, 0.3)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.5rem",
//                         opacity: 0.3,
//                         border: "2px solid rgba(245, 158, 11, 0.5)",
//                       }}
//                     >
//                       {icon}
//                     </div>
//                   ))}
//                   {["💻", "🖥️", "⌨️"].map((icon, index) => (
//                     <div
//                       key={`desktop-${index}`}
//                       className="desktop-item"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         background: "rgba(139, 92, 246, 0.3)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.5rem",
//                         opacity: 0.3,
//                         border: "2px solid rgba(139, 92, 246, 0.5)",
//                       }}
//                     >
//                       {icon}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 시간대별 애니메이션 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🕐 시간대별 애니메이션
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   현재 시간에 따라 다른 분위기의 애니메이션이 실행됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playTimeBasedTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     현재 시간 기준 실행
//                   </Button>
//                 </div>
//                 <div
//                   className="time-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {["🌅", "☀️", "🌆", "🌙"].map((icon, index) => (
//                     <div
//                       key={`time-${index}`}
//                       className="time-item"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         background: "rgba(255, 255, 255, 0.2)",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: "1.8rem",
//                         opacity: 0,
//                         border: "2px solid rgba(255, 255, 255, 0.3)",
//                       }}
//                     >
//                       {icon}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 인터랙션 대기 타임라인 섹션 */}
//         <section
//           style={{
//             padding: "48px 32px",
//             borderBottom: "1px solid #e0e0e0",
//             background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "16px",
//                 fontWeight: "700",
//                 textAlign: "center",
//               }}
//             >
//               ⏸️ 인터랙션 대기 타임라인 (A → 클릭 → B)
//             </h2>
//             <p
//               style={{
//                 fontSize: "1.2rem",
//                 opacity: 0.9,
//                 marginBottom: "48px",
//                 textAlign: "center",
//               }}
//             >
//               A 애니메이션 실행 후 사용자의 인터랙션을 기다렸다가 B가 노출되는
//               타임라인을 체험해보세요.
//             </p>

//             {/* 인터랙션 대기 메시지 */}
//             <div
//               className="interactive-message"
//               style={{
//                 position: "fixed",
//                 top: "20px",
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 background: "rgba(0, 0, 0, 0.8)",
//                 color: "white",
//                 padding: "12px 24px",
//                 borderRadius: "8px",
//                 fontSize: "1rem",
//                 fontWeight: "bold",
//                 zIndex: 1000,
//                 display: "none",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
//               }}
//             >
//               메시지가 여기에 표시됩니다
//             </div>

//             {/* 타임라인 상태 표시 */}
//             {interactiveTimelineState.isWaitingForInteraction && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: "80px",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   background: "rgba(255, 255, 255, 0.9)",
//                   color: "#333",
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   fontSize: "0.9rem",
//                   fontWeight: "500",
//                   zIndex: 999,
//                   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
//                 }}
//               >
//                 현재 스텝: {interactiveTimelineState.currentStep + 1} -{" "}
//                 {interactiveTimelineState.waitingForStep}
//               </div>
//             )}

//             <div style={{ display: "grid", gap: "32px" }}>
//               {/* 클릭 대기 타임라인 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🖱️ 클릭 대기 타임라인
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   A → 클릭 대기 → B 순서로 실행됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playClickWaitTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     클릭 대기 타임라인 시작
//                   </Button>
//                 </div>
//                 <div
//                   className="interactive-wait-timeline"
//                   style={{
//                     display: "flex",
//                     gap: "16px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     className="step-a"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(34, 197, 94, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       border: "2px solid rgba(34, 197, 94, 0.5)",
//                     }}
//                   >
//                     A
//                   </div>
//                   <div
//                     className="wait-button"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       border: "2px solid rgba(255, 255, 255, 0.3)",
//                       transition: "all 0.2s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.3)";
//                       e.currentTarget.style.transform = "scale(1.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.background =
//                         "rgba(255, 255, 255, 0.2)";
//                       e.currentTarget.style.transform = "scale(1)";
//                     }}
//                   >
//                     👆
//                   </div>
//                   <div
//                     className="step-b"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(59, 130, 246, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "translateY(20px)",
//                       border: "2px solid rgba(59, 130, 246, 0.5)",
//                     }}
//                   >
//                     B
//                   </div>
//                 </div>
//               </div>

//               {/* 호버 대기 타임라인 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🎯 호버 대기 타임라인
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   A → 호버 대기 → B 순서로 실행됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playHoverWaitTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     호버 대기 타임라인 시작
//                   </Button>
//                 </div>
//                 <div
//                   className="interactive-hover-wait"
//                   style={{
//                     display: "flex",
//                     gap: "16px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     className="step-a"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(168, 85, 247, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "scale(0.8)",
//                       border: "2px solid rgba(168, 85, 247, 0.5)",
//                     }}
//                   >
//                     A
//                   </div>
//                   <div
//                     className="wait-target"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       border: "2px solid rgba(255, 255, 255, 0.3)",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     🎯
//                   </div>
//                   <div
//                     className="step-b"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(239, 68, 68, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "rotate(-180deg)",
//                       border: "2px solid rgba(239, 68, 68, 0.5)",
//                     }}
//                   >
//                     B
//                   </div>
//                 </div>
//               </div>

//               {/* 키보드 대기 타임라인 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   ⌨️ 키보드 대기 타임라인
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   A → 키보드 대기 → B 순서로 실행됩니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playKeyWaitTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     키보드 대기 타임라인 시작
//                   </Button>
//                 </div>
//                 <div
//                   className="interactive-key-wait"
//                   style={{
//                     display: "flex",
//                     gap: "16px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     className="step-a"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(16, 185, 129, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       border: "2px solid rgba(16, 185, 129, 0.5)",
//                     }}
//                   >
//                     A
//                   </div>
//                   <div
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       border: "2px solid rgba(255, 255, 255, 0.3)",
//                     }}
//                   >
//                     ⌨️
//                   </div>
//                   <div
//                     className="step-b"
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       background: "rgba(245, 158, 11, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "scale(0.8)",
//                       border: "2px solid rgba(245, 158, 11, 0.5)",
//                     }}
//                   >
//                     B
//                   </div>
//                 </div>
//               </div>

//               {/* 복합 인터랙션 대기 타임라인 */}
//               <div
//                 style={{
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.5rem",
//                     marginBottom: "16px",
//                     textAlign: "center",
//                   }}
//                 >
//                   🎭 복합 인터랙션 대기 타임라인
//                 </h3>
//                 <p
//                   style={{
//                     textAlign: "center",
//                     marginBottom: "20px",
//                     opacity: 0.8,
//                   }}
//                 >
//                   여러 단계의 인터랙션 대기가 포함된 복잡한 타임라인입니다.
//                 </p>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                   <Button
//                     onClick={playComplexInteractiveTimeline}
//                     style={{
//                       background: "rgba(255, 255, 255, 0.2)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       color: "white",
//                     }}
//                   >
//                     복합 인터랙션 타임라인 시작
//                   </Button>
//                 </div>
//                 <div
//                   className="interactive-complex"
//                   style={{
//                     display: "flex",
//                     gap: "12px",
//                     justifyContent: "center",
//                     flexWrap: "wrap",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     className="step-1"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(139, 92, 246, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       border: "2px solid rgba(139, 92, 246, 0.5)",
//                     }}
//                   >
//                     1
//                   </div>
//                   <div
//                     className="wait-button-1"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1rem",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       border: "2px solid rgba(255, 255, 255, 0.3)",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     👆
//                   </div>
//                   <div
//                     className="step-2"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(59, 130, 246, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "translateY(20px)",
//                       border: "2px solid rgba(59, 130, 246, 0.5)",
//                     }}
//                   >
//                     2
//                   </div>
//                   <div
//                     className="wait-target"
//                     style={{
//                       width: "50px",
//                       height: "50px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1rem",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       border: "2px solid rgba(255, 255, 255, 0.3)",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     🎯
//                   </div>
//                   <div
//                     className="step-3"
//                     style={{
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(34, 197, 94, 0.3)",
//                       borderRadius: "12px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       opacity: 0,
//                       transform: "rotate(-180deg)",
//                       border: "2px solid rgba(34, 197, 94, 0.5)",
//                     }}
//                   >
//                     3
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Form 예제 섹션 */}
//         <section
//           style={{
//             padding: "48px 32px",
//             borderBottom: "1px solid #e0e0e0",
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//             <h2
//               style={{
//                 fontSize: "2.5rem",
//                 marginBottom: "16px",
//                 fontWeight: "700",
//               }}
//             >
//               Form 컴포넌트 예제
//             </h2>
//             <p
//               style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "48px" }}
//             >
//               접근성이 완전히 지원되는 아름다운 Form 컴포넌트들입니다.
//             </p>

//             <div style={{ display: "grid", gap: "32px", marginTop: "24px" }}>
//               {/* 기본 Form 예제 */}
//               <Card
//                 style={{
//                   background: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   borderRadius: "20px",
//                   padding: "32px",
//                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h3
//                     style={{
//                       fontSize: "1.5rem",
//                       marginBottom: "8px",
//                       color: "#2d3748",
//                     }}
//                   >
//                     💬 기본 Form 예제
//                   </h3>
//                   <p style={{ color: "#718096", fontSize: "1rem" }}>
//                     이메일과 질문을 입력하는 간단한 폼입니다.
//                   </p>
//                 </div>

//                 <Form.Root
//                   initialValues={{ email: "", question: "" }}
//                   validators={{
//                     email: validators.email,
//                     question: validators.required,
//                   }}
//                   validateOnBlur={true}
//                   // validateOnChange={true}
//                   onSubmit={async (formData) => {
//                     const values = Object.keys(formData).reduce(
//                       (acc, key) => {
//                         acc[key] =
//                           formData[key as keyof typeof formData]?.value || "";
//                         return acc;
//                       },
//                       {} as Record<string, string>
//                     );

//                     alert(
//                       `제출된 데이터:\n이메일: ${values.email}\n질문: ${values.question}`
//                     );
//                   }}
//                 >
//                   <div style={{ display: "grid", gap: "24px" }}>
//                     <Form.Field name="email">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           📧 이메일 주소
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <input
//                           type="email"
//                           required
//                           placeholder="example@email.com"
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     <Form.Field name="question">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           ❓ 질문 내용
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <textarea
//                           required
//                           rows={4}
//                           placeholder="궁금한 내용을 자세히 작성해주세요..."
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                             resize: "vertical",
//                             fontFamily: "inherit",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     <Form.Submit asChild>
//                       <button
//                         style={{
//                           marginTop: "8px",
//                           padding: "14px 28px",
//                           background:
//                             "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "12px",
//                           cursor: "pointer",
//                           fontSize: "1rem",
//                           fontWeight: "600",
//                           transition: "all 0.2s ease",
//                           boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-2px)";
//                           e.currentTarget.style.boxShadow =
//                             "0 8px 20px rgba(102, 126, 234, 0.4)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)";
//                           e.currentTarget.style.boxShadow =
//                             "0 4px 12px rgba(102, 126, 234, 0.3)";
//                         }}
//                       >
//                         🚀 질문 등록하기
//                       </button>
//                     </Form.Submit>
//                   </div>
//                 </Form.Root>
//               </Card>

//               {/* 고급 Form 예제 */}
//               <Card
//                 style={{
//                   background: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   borderRadius: "20px",
//                   padding: "32px",
//                   boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <div style={{ marginBottom: "24px" }}>
//                   <h3
//                     style={{
//                       fontSize: "1.5rem",
//                       marginBottom: "8px",
//                       color: "#2d3748",
//                     }}
//                   >
//                     ⚡ 고급 Form 예제
//                   </h3>
//                   <p style={{ color: "#718096", fontSize: "1rem" }}>
//                     여러 필드 타입과 유효성 검사를 포함한 복잡한 폼입니다.
//                   </p>
//                 </div>

//                 <Form.Root
//                   initialValues={{
//                     name: "",
//                     email: "",
//                     phone: "",
//                     age: "",
//                     website: "",
//                     bio: "",
//                   }}
//                   validators={{
//                     name: validators.required,
//                     email: validators.email,
//                     phone: validators.phone,
//                     age: (value) => {
//                       if (!value) return null;
//                       const age = parseInt(value);
//                       if (isNaN(age)) return "나이는 숫자여야 합니다";
//                       if (age < 18) return "18세 이상이어야 합니다";
//                       if (age > 100) return "100세 이하여야 합니다";
//                       return null;
//                     },
//                     website: validators.url,
//                     bio: validators.minLength(10),
//                   }}
//                   validateOnBlur={true}
//                   // validateOnChange={true}
//                   onSubmit={async (formData) => {
//                     console.log("Advanced Form submitted:", formData);
//                     console.log(
//                       "Advanced FormData keys:",
//                       Object.keys(formData)
//                     );
//                     console.log(
//                       "Advanced FormData entries:",
//                       Object.entries(formData)
//                     );

//                     // values 추출
//                     const values = Object.keys(formData).reduce(
//                       (acc, key) => {
//                         acc[key] =
//                           formData[key as keyof typeof formData]?.value || "";
//                         return acc;
//                       },
//                       {} as Record<string, string>
//                     );

//                     alert(
//                       `제출된 데이터:\n${Object.entries(values)
//                         .map(([key, value]) => `${key}: ${value}`)
//                         .join("\n")}`
//                     );
//                   }}
//                 >
//                   <div style={{ display: "grid", gap: "20px" }}>
//                     {/* 이름 필드 */}
//                     <Form.Field name="name">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           👤 이름 *
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <input
//                           type="text"
//                           required
//                           placeholder="홍길동"
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     {/* 이메일 필드 */}
//                     <Form.Field name="email">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           📧 이메일 *
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <input
//                           type="email"
//                           required
//                           placeholder="example@email.com"
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     {/* 전화번호와 나이 필드 - 2열 그리드 */}
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "1fr 1fr",
//                         gap: "20px",
//                       }}
//                     >
//                       <Form.Field name="phone">
//                         <div style={{ marginBottom: "8px" }}>
//                           <Form.Label
//                             style={{
//                               display: "block",
//                               fontSize: "0.875rem",
//                               fontWeight: "600",
//                               color: "#2d3748",
//                               marginBottom: "6px",
//                             }}
//                           >
//                             📱 전화번호
//                           </Form.Label>
//                           <Form.Message
//                             touched={true}
//                             style={{
//                               color: "#e53e3e",
//                               fontSize: "0.75rem",
//                               fontWeight: "500",
//                             }}
//                           />
//                         </div>
//                         <Form.Control asChild>
//                           <input
//                             type="tel"
//                             placeholder="010-1234-5678"
//                             style={{
//                               width: "100%",
//                               padding: "12px 16px",
//                               border: "2px solid #e2e8f0",
//                               borderRadius: "12px",
//                               fontSize: "1rem",
//                               transition: "all 0.2s ease",
//                               outline: "none",
//                               background: "#f7fafc",
//                             }}
//                             onFocus={(e) => {
//                               e.target.style.borderColor = "#667eea";
//                               e.target.style.background = "white";
//                               e.target.style.boxShadow =
//                                 "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                             }}
//                             onBlur={(e) => {
//                               e.target.style.borderColor = "#e2e8f0";
//                               e.target.style.background = "#f7fafc";
//                               e.target.style.boxShadow = "none";
//                             }}
//                           />
//                         </Form.Control>
//                       </Form.Field>

//                       <Form.Field name="age">
//                         <div style={{ marginBottom: "8px" }}>
//                           <Form.Label
//                             style={{
//                               display: "block",
//                               fontSize: "0.875rem",
//                               fontWeight: "600",
//                               color: "#2d3748",
//                               marginBottom: "6px",
//                             }}
//                           >
//                             🎂 나이
//                           </Form.Label>
//                           <Form.Message
//                             touched={true}
//                             style={{
//                               color: "#e53e3e",
//                               fontSize: "0.75rem",
//                               fontWeight: "500",
//                             }}
//                           />
//                         </div>
//                         <Form.Control asChild>
//                           <input
//                             type="number"
//                             min="18"
//                             max="100"
//                             placeholder="25"
//                             style={{
//                               width: "100%",
//                               padding: "12px 16px",
//                               border: "2px solid #e2e8f0",
//                               borderRadius: "12px",
//                               fontSize: "1rem",
//                               transition: "all 0.2s ease",
//                               outline: "none",
//                               background: "#f7fafc",
//                             }}
//                             onFocus={(e) => {
//                               e.target.style.borderColor = "#667eea";
//                               e.target.style.background = "white";
//                               e.target.style.boxShadow =
//                                 "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                             }}
//                             onBlur={(e) => {
//                               e.target.style.borderColor = "#e2e8f0";
//                               e.target.style.background = "#f7fafc";
//                               e.target.style.boxShadow = "none";
//                             }}
//                           />
//                         </Form.Control>
//                       </Form.Field>
//                     </div>

//                     {/* 웹사이트 필드 */}
//                     <Form.Field name="website">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           🌐 웹사이트
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <input
//                           type="url"
//                           placeholder="https://example.com"
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     {/* 자기소개 필드 */}
//                     <Form.Field name="bio">
//                       <div style={{ marginBottom: "8px" }}>
//                         <Form.Label
//                           style={{
//                             display: "block",
//                             fontSize: "0.875rem",
//                             fontWeight: "600",
//                             color: "#2d3748",
//                             marginBottom: "6px",
//                           }}
//                         >
//                           📝 자기소개 *
//                         </Form.Label>
//                         <Form.Message
//                           touched={true}
//                           style={{
//                             color: "#e53e3e",
//                             fontSize: "0.75rem",
//                             fontWeight: "500",
//                           }}
//                         />
//                       </div>
//                       <Form.Control asChild>
//                         <textarea
//                           required
//                           rows={4}
//                           placeholder="자신에 대해 간단히 소개해주세요. 최소 10자 이상 입력해주세요."
//                           style={{
//                             width: "100%",
//                             padding: "12px 16px",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "12px",
//                             fontSize: "1rem",
//                             transition: "all 0.2s ease",
//                             outline: "none",
//                             background: "#f7fafc",
//                             resize: "vertical",
//                             fontFamily: "inherit",
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = "#667eea";
//                             e.target.style.background = "white";
//                             e.target.style.boxShadow =
//                               "0 0 0 3px rgba(102, 126, 234, 0.1)";
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = "#e2e8f0";
//                             e.target.style.background = "#f7fafc";
//                             e.target.style.boxShadow = "none";
//                           }}
//                         />
//                       </Form.Control>
//                     </Form.Field>

//                     {/* 제출 버튼 */}
//                     <Form.Submit asChild>
//                       <button
//                         style={{
//                           marginTop: "8px",
//                           padding: "16px 32px",
//                           background:
//                             "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "12px",
//                           cursor: "pointer",
//                           fontSize: "1.1rem",
//                           fontWeight: "600",
//                           transition: "all 0.2s ease",
//                           boxShadow: "0 4px 12px rgba(72, 187, 120, 0.3)",
//                         }}
//                         onMouseEnter={(e) => {
//                           e.currentTarget.style.transform = "translateY(-2px)";
//                           e.currentTarget.style.boxShadow =
//                             "0 8px 20px rgba(72, 187, 120, 0.4)";
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.transform = "translateY(0)";
//                           e.currentTarget.style.boxShadow =
//                             "0 4px 12px rgba(72, 187, 120, 0.3)";
//                         }}
//                       >
//                         ✨ 정보 제출하기
//                       </button>
//                     </Form.Submit>
//                   </div>
//                 </Form.Root>
//               </Card>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;
