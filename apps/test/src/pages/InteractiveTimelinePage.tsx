import { useState, useRef, useEffect } from "react";
import { Button } from "@acme/react";

export default function InteractiveTimelinePage() {
  // 인터랙션 대기 타임라인 상태
  const [interactiveTimelineState, setInteractiveTimelineState] = useState({
    currentStep: 0,
    isWaitingForInteraction: false,
    waitingForStep: null as string | null,
  });

  // 이벤트 리스너 참조를 저장하기 위한 ref
  const eventListenersRef = useRef<{
    click?: (e: Event) => void;
    mouseenter?: (e: Event) => void;
    keydown?: (e: KeyboardEvent) => void;
  }>({});

  // 이벤트 리스너 정리 함수
  const cleanupEventListeners = () => {
    // 기존 이벤트 리스너 제거
    if (eventListenersRef.current.click) {
      document.removeEventListener("click", eventListenersRef.current.click);
    }
    if (eventListenersRef.current.mouseenter) {
      document.removeEventListener(
        "mouseenter",
        eventListenersRef.current.mouseenter
      );
    }
    if (eventListenersRef.current.keydown) {
      window.removeEventListener("keydown", eventListenersRef.current.keydown);
    }

    // ref 초기화
    eventListenersRef.current = {};
  };

  // 인터랙션 대기 타임라인 실행 함수
  const playInteractiveTimeline = async (
    steps: Array<{
      id: string;
      name: string;
      animation?: {
        elements: string;
        animation: string;
        delay?: number;
      };
      waitForInteraction?: {
        type: "click" | "hover" | "keydown";
        target: string;
        message?: string;
      };
      delay?: number;
    }>
  ) => {
    // 시작 전 기존 이벤트 리스너 정리
    cleanupEventListeners();

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      // 애니메이션 실행
      if (step.animation) {
        const elements = document.querySelectorAll(step.animation.elements);
        elements.forEach((element, index) => {
          setTimeout(() => {
            (element as HTMLElement).style.animation = "none";
            (element as HTMLElement).offsetHeight;
            (element as HTMLElement).style.animation =
              step.animation!.animation;
          }, index * 100);
        });
      }

      // 인터랙션 대기
      if (step.waitForInteraction) {
        setInteractiveTimelineState({
          currentStep: i,
          isWaitingForInteraction: true,
          waitingForStep: step.id,
        });

        // 인터랙션 대기 메시지 표시
        if (step.waitForInteraction.message) {
          const messageElement = document.querySelector(".interactive-message");
          if (messageElement) {
            (messageElement as HTMLElement).textContent =
              step.waitForInteraction.message;
            (messageElement as HTMLElement).style.display = "block";
          }
        }

        // 인터랙션 대기 Promise
        await new Promise<void>((resolve) => {
          const handleInteraction = () => {
            setInteractiveTimelineState({
              currentStep: i,
              isWaitingForInteraction: false,
              waitingForStep: null,
            });

            // 메시지 숨기기
            const messageElement = document.querySelector(
              ".interactive-message"
            );
            if (messageElement) {
              (messageElement as HTMLElement).style.display = "none";
            }

            resolve();
          };

          // 인터랙션 타입에 따른 이벤트 리스너 등록
          const targetElement = document.querySelector(
            step.waitForInteraction!.target
          );

          if (targetElement) {
            if (step.waitForInteraction!.type === "click") {
              const clickHandler = (e: Event) => {
                if (e.target === targetElement) {
                  handleInteraction();
                }
              };
              eventListenersRef.current.click = clickHandler;
              document.addEventListener("click", clickHandler, { once: true });
            } else if (step.waitForInteraction!.type === "hover") {
              const hoverHandler = (e: Event) => {
                if (e.target === targetElement) {
                  handleInteraction();
                }
              };
              eventListenersRef.current.mouseenter = hoverHandler;
              document.addEventListener("mouseenter", hoverHandler, {
                once: true,
              });
            } else if (step.waitForInteraction!.type === "keydown") {
              const keyHandler = (event: KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleInteraction();
                }
              };
              eventListenersRef.current.keydown = keyHandler;
              window.addEventListener("keydown", keyHandler, { once: true });
            }
          }
        });
      }

      // 스텝 완료 대기
      const stepDelay = step.delay || 800;
      await new Promise((resolve) => setTimeout(resolve, stepDelay));
    }
  };

  // A → 클릭 대기 → B 노출 타임라인
  const playClickWaitTimeline = () => {
    const steps = [
      {
        id: "step1",
        name: "A 애니메이션 실행",
        animation: {
          elements: ".interactive-wait-timeline .step-a",
          animation: "fadeIn 0.5s ease-out",
        },
        delay: 1000,
      },
      {
        id: "step2",
        name: "클릭 대기",
        waitForInteraction: {
          type: "click" as const,
          target: ".interactive-wait-timeline .wait-button",
          message: "버튼을 클릭하세요!",
        },
        delay: 500,
      },
      {
        id: "step3",
        name: "B 애니메이션 실행",
        animation: {
          elements: ".interactive-wait-timeline .step-b",
          animation: "slideUp 0.5s ease-out",
        },
        delay: 1000,
      },
    ];

    playInteractiveTimeline(steps);
  };

  // A → 호버 대기 → B 노출 타임라인
  const playHoverWaitTimeline = () => {
    const steps = [
      {
        id: "step1",
        name: "A 애니메이션 실행",
        animation: {
          elements: ".interactive-hover-wait .step-a",
          animation: "scaleIn 0.5s ease-out",
        },
        delay: 1000,
      },
      {
        id: "step2",
        name: "호버 대기",
        waitForInteraction: {
          type: "hover" as const,
          target: ".interactive-hover-wait .wait-target",
          message: "타겟에 마우스를 올려보세요!",
        },
        delay: 500,
      },
      {
        id: "step3",
        name: "B 애니메이션 실행",
        animation: {
          elements: ".interactive-hover-wait .step-b",
          animation: "rotateIn 0.5s ease-out",
        },
        delay: 1000,
      },
    ];

    playInteractiveTimeline(steps);
  };

  // A → 키보드 대기 → B 노출 타임라인
  const playKeyWaitTimeline = () => {
    const steps = [
      {
        id: "step1",
        name: "A 애니메이션 실행",
        animation: {
          elements: ".interactive-key-wait .step-a",
          animation: "fadeIn 0.5s ease-out",
        },
        delay: 1000,
      },
      {
        id: "step2",
        name: "키보드 대기",
        waitForInteraction: {
          type: "keydown" as const,
          target: "body",
          message: "Enter 또는 Space 키를 눌러보세요!",
        },
        delay: 500,
      },
      {
        id: "step3",
        name: "B 애니메이션 실행",
        animation: {
          elements: ".interactive-key-wait .step-b",
          animation: "scaleIn 0.5s ease-out",
        },
        delay: 1000,
      },
    ];

    playInteractiveTimeline(steps);
  };

  // 복합 인터랙션 대기 타임라인
  const playComplexInteractiveTimeline = () => {
    const steps = [
      {
        id: "step1",
        name: "1단계: 시작",
        animation: {
          elements: ".interactive-complex .step-1",
          animation: "fadeIn 0.4s ease-out",
        },
        delay: 800,
      },
      {
        id: "step2",
        name: "2단계: 클릭 대기",
        waitForInteraction: {
          type: "click" as const,
          target: ".interactive-complex .wait-button-1",
          message: "첫 번째 버튼을 클릭하세요!",
        },
        delay: 500,
      },
      {
        id: "step3",
        name: "3단계: 중간 애니메이션",
        animation: {
          elements: ".interactive-complex .step-2",
          animation: "slideUp 0.4s ease-out",
        },
        delay: 800,
      },
      {
        id: "step4",
        name: "4단계: 호버 대기",
        waitForInteraction: {
          type: "hover" as const,
          target: ".interactive-complex .wait-target",
          message: "타겟에 마우스를 올려보세요!",
        },
        delay: 500,
      },
      {
        id: "step5",
        name: "5단계: 최종 애니메이션",
        animation: {
          elements: ".interactive-complex .step-3",
          animation: "rotateIn 0.4s ease-out",
        },
        delay: 1000,
      },
    ];

    playInteractiveTimeline(steps);
  };

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  useEffect(() => {
    return () => {
      cleanupEventListeners();
    };
  }, []);

  return (
    <div style={{ padding: "48px 32px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "16px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        ⏸️ 인터랙션 대기 타임라인 (A → 클릭 → B)
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        A 애니메이션 실행 후 사용자의 인터랙션을 기다렸다가 B가 노출되는
        타임라인을 체험해보세요.
      </p>

      {/* 인터랙션 대기 메시지 */}
      <div
        className="interactive-message"
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          zIndex: 1000,
          display: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        메시지가 여기에 표시됩니다
      </div>

      {/* 타임라인 상태 표시 */}
      {interactiveTimelineState.isWaitingForInteraction && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255, 255, 255, 0.9)",
            color: "#333",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "0.9rem",
            fontWeight: "500",
            zIndex: 999,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          현재 스텝: {interactiveTimelineState.currentStep + 1} -{" "}
          {interactiveTimelineState.waitingForStep}
        </div>
      )}

      <div style={{ display: "grid", gap: "32px" }}>
        {/* 클릭 대기 타임라인 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🖱️ 클릭 대기 타임라인
          </h3>
          <p
            style={{ textAlign: "center", marginBottom: "20px", opacity: 0.8 }}
          >
            A → 클릭 대기 → B 순서로 실행됩니다.
          </p>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button onClick={playClickWaitTimeline}>
              클릭 대기 타임라인 시작
            </Button>
          </div>
          <div
            className="interactive-wait-timeline"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              className="step-a"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(34, 197, 94, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                border: "2px solid rgba(34, 197, 94, 0.5)",
              }}
            >
              A
            </div>
            <div
              className="wait-button"
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              👆
            </div>
            <div
              className="step-b"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(59, 130, 246, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "translateY(20px)",
                border: "2px solid rgba(59, 130, 246, 0.5)",
              }}
            >
              B
            </div>
          </div>
        </div>

        {/* 호버 대기 타임라인 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🎯 호버 대기 타임라인
          </h3>
          <p
            style={{ textAlign: "center", marginBottom: "20px", opacity: 0.8 }}
          >
            A → 호버 대기 → B 순서로 실행됩니다.
          </p>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button onClick={playHoverWaitTimeline}>
              호버 대기 타임라인 시작
            </Button>
          </div>
          <div
            className="interactive-hover-wait"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              className="step-a"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(168, 85, 247, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "scale(0.8)",
                border: "2px solid rgba(168, 85, 247, 0.5)",
              }}
            >
              A
            </div>
            <div
              className="wait-target"
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              🎯
            </div>
            <div
              className="step-b"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(239, 68, 68, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "rotate(-180deg)",
                border: "2px solid rgba(239, 68, 68, 0.5)",
              }}
            >
              B
            </div>
          </div>
        </div>

        {/* 키보드 대기 타임라인 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            ⌨️ 키보드 대기 타임라인
          </h3>
          <p
            style={{ textAlign: "center", marginBottom: "20px", opacity: 0.8 }}
          >
            A → 키보드 대기 → B 순서로 실행됩니다.
          </p>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button onClick={playKeyWaitTimeline}>
              키보드 대기 타임라인 시작
            </Button>
          </div>
          <div
            className="interactive-key-wait"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              className="step-a"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(16, 185, 129, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                border: "2px solid rgba(16, 185, 129, 0.5)",
              }}
            >
              A
            </div>
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              ⌨️
            </div>
            <div
              className="step-b"
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(245, 158, 11, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "scale(0.8)",
                border: "2px solid rgba(245, 158, 11, 0.5)",
              }}
            >
              B
            </div>
          </div>
        </div>

        {/* 복합 인터랙션 대기 타임라인 */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🎭 복합 인터랙션 대기 타임라인
          </h3>
          <p
            style={{ textAlign: "center", marginBottom: "20px", opacity: 0.8 }}
          >
            여러 단계의 인터랙션 대기가 포함된 복잡한 타임라인입니다.
          </p>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button onClick={playComplexInteractiveTimeline}>
              복합 인터랙션 타임라인 시작
            </Button>
          </div>
          <div
            className="interactive-complex"
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div
              className="step-1"
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                opacity: 0,
                border: "2px solid rgba(139, 92, 246, 0.5)",
              }}
            >
              1
            </div>
            <div
              className="wait-button-1"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              👆
            </div>
            <div
              className="step-2"
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(59, 130, 246, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "translateY(20px)",
                border: "2px solid rgba(59, 130, 246, 0.5)",
              }}
            >
              2
            </div>
            <div
              className="wait-target"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              🎯
            </div>
            <div
              className="step-3"
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(34, 197, 94, 0.3)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                opacity: 0,
                transform: "rotate(-180deg)",
                border: "2px solid rgba(34, 197, 94, 0.5)",
              }}
            >
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
