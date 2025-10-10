export default function TypographyPage() {
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
        📝 타이포그래피
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 타이포그래피 스타일을 확인해보세요.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>
            헤딩 스타일
          </h2>
          <h1 style={{ fontSize: "3rem", marginBottom: "16px" }}>
            H1 - 가장 큰 제목
          </h1>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
            H2 - 큰 제목
          </h2>
          <h3 style={{ fontSize: "2rem", marginBottom: "16px" }}>
            H3 - 중간 제목
          </h3>
          <h4 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
            H4 - 작은 제목
          </h4>
          <h5 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            H5 - 더 작은 제목
          </h5>
          <h6 style={{ fontSize: "1rem", marginBottom: "16px" }}>
            H6 - 가장 작은 제목
          </h6>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>
            본문 스타일
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.6",
              marginBottom: "16px",
            }}
          >
            이것은 일반적인 본문 텍스트입니다. 가독성을 위해 적절한 줄 간격과
            크기를 사용합니다.
          </p>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.5",
              marginBottom: "16px",
            }}
          >
            작은 본문 텍스트는 1rem 크기를 사용합니다.
          </p>
          <p style={{ fontSize: "0.875rem", lineHeight: "1.4", opacity: 0.8 }}>
            캡션이나 부가 정보는 더 작은 크기를 사용합니다.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>
            강조 스타일
          </h2>
          <p style={{ marginBottom: "16px" }}>
            <strong>굵은 텍스트</strong>와 <em>기울임 텍스트</em>를 사용할 수
            있습니다.
          </p>
          <p style={{ marginBottom: "16px" }}>
            <mark style={{ background: "yellow", color: "black" }}>
              하이라이트된 텍스트
            </mark>
            도 가능합니다.
          </p>
          <p style={{ marginBottom: "16px" }}>
            <code
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              인라인 코드
            </code>
            도 표시할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
