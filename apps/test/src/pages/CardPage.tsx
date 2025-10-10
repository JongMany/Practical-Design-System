import { Card } from "@acme/react";

export default function CardPage() {
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
        🃏 카드 컴포넌트
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 스타일의 카드 컴포넌트를 확인해보세요.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        <Card>
          <h3>기본 카드</h3>
          <p>이것은 기본 카드 컴포넌트입니다.</p>
        </Card>

        <Card>
          <h3>카드 제목</h3>
          <p>
            카드의 내용이 여기에 표시됩니다. 다양한 정보를 담을 수 있습니다.
          </p>
        </Card>

        <Card>
          <h3>다른 카드</h3>
          <p>각 카드는 독립적인 컨테이너로 사용할 수 있습니다.</p>
        </Card>
      </div>
    </div>
  );
}
