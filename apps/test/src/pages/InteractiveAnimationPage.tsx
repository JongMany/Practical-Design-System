export default function InteractiveAnimationPage() {
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
        🎮 인터랙티브 애니메이션
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        사용자의 클릭, 호버, 키보드 입력 등에 반응하는 인터랙티브 애니메이션을
        체험해보세요.
      </p>

      <div style={{ textAlign: "center", padding: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>🚧 개발 중</h2>
        <p style={{ opacity: 0.8 }}>
          인터랙티브 애니메이션 페이지는 현재 개발 중입니다.
        </p>
      </div>
    </div>
  );
}
