import { useState } from "react";

export default function AnimationPage() {
  const [animationStates, setAnimationStates] = useState({
    fadeIn: false,
    slideUp: false,
    scale: false,
    rotate: false,
    triggerAnimation: false,
  });

  const playFadeIn = () => {
    setAnimationStates((prev) => ({ ...prev, fadeIn: !prev.fadeIn }));
  };

  const playSlideUp = () => {
    setAnimationStates((prev) => ({ ...prev, slideUp: !prev.slideUp }));
  };

  const playScale = () => {
    setAnimationStates((prev) => ({ ...prev, scale: !prev.scale }));
  };

  const playRotate = () => {
    setAnimationStates((prev) => ({ ...prev, rotate: !prev.rotate }));
  };

  const toggleTrigger = () => {
    setAnimationStates((prev) => ({
      ...prev,
      triggerAnimation: !prev.triggerAnimation,
    }));
  };

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
        🎬 기본 애니메이션
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        CSS 기반의 기본 애니메이션 효과들을 체험해보세요.
      </p>

      {/* 애니메이션 컨트롤 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          애니메이션 컨트롤
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <button
            onClick={playFadeIn}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            페이드 인
          </button>
          <button
            onClick={playSlideUp}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            슬라이드 업
          </button>
          <button
            onClick={playScale}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            스케일
          </button>
          <button
            onClick={playRotate}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            회전
          </button>
          <button
            onClick={toggleTrigger}
            style={{
              padding: "12px 24px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              color: "white",
              cursor: "pointer",
            }}
          >
            🎪 순차 애니메이션
          </button>
        </div>

        {/* 애니메이션 타겟 요소들 */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            className={animationStates.fadeIn ? "animate-fadeIn" : ""}
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              opacity: animationStates.fadeIn ? 1 : 0,
            }}
          >
            Fade
          </div>
          <div
            className={animationStates.slideUp ? "animate-slideUp" : ""}
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              transform: animationStates.slideUp
                ? "translateY(0)"
                : "translateY(20px)",
            }}
          >
            Slide
          </div>
          <div
            className={animationStates.scale ? "animate-scaleIn" : ""}
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              transform: animationStates.scale ? "scale(1)" : "scale(0.8)",
            }}
          >
            Scale
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              transform: animationStates.triggerAnimation
                ? "rotate(360deg)"
                : "rotate(0deg)",
              transition: "transform 0.6s ease-in-out",
            }}
          >
            Rotate
          </div>
        </div>
      </section>

      {/* CSS 애니메이션 예제 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          CSS 애니메이션 예제
        </h2>
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "fadeIn", label: "페이드 인", color: "#4facfe" },
            { name: "slideUp", label: "슬라이드 업", color: "#fa709a" },
            { name: "scaleIn", label: "스케일 인", color: "#667eea" },
            { name: "rotateIn", label: "회전 인", color: "#f093fb" },
          ].map((animation, index) => (
            <div
              key={animation.name}
              className={`animate-${animation.name}`}
              style={{
                width: "80px",
                height: "80px",
                background: animation.color,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                animationDelay: `${index * 0.2}s`,
              }}
              onClick={() => {
                const element = document.querySelector(
                  `.animate-${animation.name}`
                );
                if (element) {
                  (element as HTMLElement).style.animation = "none";
                  (element as HTMLElement).offsetHeight;
                  (element as HTMLElement).style.animation =
                    `${animation.name} 0.6s ease-out`;
                }
              }}
            >
              {animation.label}
            </div>
          ))}
        </div>
      </section>

      {/* 프리셋 애니메이션 예제 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          프리셋 애니메이션 예제
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { name: "bounce", label: "바운스", color: "#ff6b6b" },
            { name: "pulse", label: "펄스", color: "#4ecdc4" },
            { name: "shake", label: "흔들기", color: "#45b7d1" },
            { name: "wobble", label: "흔들림", color: "#96ceb4" },
          ].map((preset) => (
            <div
              key={preset.name}
              style={{
                width: "100px",
                height: "100px",
                background: preset.color,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                const element = document.querySelector(
                  `[data-preset="${preset.name}"]`
                );
                if (element) {
                  (element as HTMLElement).style.animation = "none";
                  (element as HTMLElement).offsetHeight;
                  (element as HTMLElement).style.animation =
                    `${preset.name} 0.6s ease-in-out`;
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {preset.label}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          {[
            { name: "bounce", color: "#ff6b6b" },
            { name: "pulse", color: "#4ecdc4" },
            { name: "shake", color: "#45b7d1" },
            { name: "wobble", color: "#96ceb4" },
          ].map((preset) => (
            <div
              key={preset.name}
              data-preset={preset.name}
              style={{
                width: "60px",
                height: "60px",
                background: preset.color,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                opacity: 0.7,
              }}
            >
              {preset.name === "bounce" && "⚡"}
              {preset.name === "pulse" && "💓"}
              {preset.name === "shake" && "📳"}
              {preset.name === "wobble" && "🌊"}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
