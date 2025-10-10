import { Button } from "@acme/react";

export default function ButtonPage() {
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
        🔘 버튼 컴포넌트
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 스타일과 크기의 버튼 컴포넌트를 확인해보세요.
      </p>

      {/* 기본 버튼 스타일 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          기본 버튼 스타일
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* 버튼 크기 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          버튼 크기
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* 버튼 상태 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          버튼 상태
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      {/* 아이콘 버튼 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          아이콘 버튼
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button>
            <span style={{ marginRight: "8px" }}>🚀</span>
            Launch
          </Button>
          <Button>
            <span style={{ marginRight: "8px" }}>💾</span>
            Save
          </Button>
          <Button>
            <span style={{ marginRight: "8px" }}>📤</span>
            Export
          </Button>
        </div>
      </section>

      {/* 버튼 그룹 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          버튼 그룹
        </h2>
        <div style={{ display: "flex", gap: "0", justifyContent: "center" }}>
          <Button
            variant="outline"
            style={{ borderRadius: "8px 0 0 8px", borderRight: "none" }}
          >
            Left
          </Button>
          <Button
            variant="outline"
            style={{ borderRadius: "0", borderRight: "none" }}
          >
            Center
          </Button>
          <Button variant="outline" style={{ borderRadius: "0 8px 8px 0" }}>
            Right
          </Button>
        </div>
      </section>

      {/* 사용 예제 */}
      <section style={{ marginBottom: "48px" }}>
        <h2
          style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#4facfe" }}
        >
          사용 예제
        </h2>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>새로운 프로젝트를 생성하시겠습니까?</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="outline" size="sm">
                취소
              </Button>
              <Button size="sm">생성</Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>파일을 저장하시겠습니까?</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="ghost" size="sm">
                나중에
              </Button>
              <Button variant="secondary" size="sm">
                저장 안함
              </Button>
              <Button size="sm">저장</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
