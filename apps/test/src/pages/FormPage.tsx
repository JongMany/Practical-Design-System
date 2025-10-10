import { Form } from "@acme/react";
import { validators } from "@acme/core";

export default function FormPage() {
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
        📝 폼 컴포넌트
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.8,
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        다양한 폼 컴포넌트를 확인해보세요.
      </p>

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Form.Root
          initialValues={{ email: "", question: "" }}
          validators={{
            email: validators.email,
            question: validators.required,
          }}
          validateOnBlur={true}
          onSubmit={async (formData) => {
            console.log("Form submitted:", formData);
            alert("폼이 제출되었습니다!");
          }}
        >
          <div style={{ display: "grid", gap: "24px" }}>
            <Form.Field name="email">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  📧 이메일 주소
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="question">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  ❓ 질문 내용
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <textarea
                  required
                  rows={4}
                  placeholder="궁금한 내용을 자세히 작성해주세요..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                  }}
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button
                style={{
                  marginTop: "8px",
                  padding: "14px 28px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                제출하기
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>

      {/* 고급 Form 예제 */}
      <div style={{ marginTop: "48px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#2d3748",
              marginBottom: "8px",
            }}
          >
            ⚡ 고급 Form 예제
          </h3>
          <p style={{ color: "#718096", fontSize: "1rem" }}>
            여러 필드 타입과 유효성 검사를 포함한 복잡한 폼입니다.
          </p>
        </div>

        <Form.Root
          initialValues={{
            name: "",
            email: "",
            phone: "",
            age: "",
            website: "",
            bio: "",
          }}
          validators={{
            name: validators.required,
            email: validators.email,
            phone: validators.phone,
            age: (value) => {
              if (!value) return null;
              const age = parseInt(value);
              if (isNaN(age)) return "나이는 숫자여야 합니다";
              if (age < 0) return "나이는 0 이상이어야 합니다";
              if (age > 150) return "나이는 150 이하여야 합니다";
              return null;
            },
            website: (value) => {
              if (!value) return null;
              try {
                new URL(value);
                return null;
              } catch {
                return "올바른 URL을 입력해주세요";
              }
            },
            bio: (value) => {
              if (!value) return null;
              if (value.length < 10)
                return "자기소개는 최소 10자 이상이어야 합니다";
              if (value.length > 500) return "자기소개는 500자 이하여야 합니다";
              return null;
            },
          }}
          validateOnBlur={true}
          onSubmit={async (formData) => {
            console.log("Advanced form submitted:", formData);
            alert("고급 폼이 제출되었습니다!");
          }}
        >
          <div style={{ display: "grid", gap: "20px" }}>
            {/* 이름 필드 */}
            <Form.Field name="name">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  👤 이름 *
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            {/* 이메일 필드 */}
            <Form.Field name="email">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  📧 이메일 *
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="email"
                  required
                  placeholder="example@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            {/* 전화번호 필드 */}
            <Form.Field name="phone">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  📱 전화번호
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            {/* 나이 필드 */}
            <Form.Field name="age">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  🎂 나이
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="number"
                  min="0"
                  max="150"
                  placeholder="25"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            {/* 웹사이트 필드 */}
            <Form.Field name="website">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  🌐 웹사이트
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <input
                  type="url"
                  placeholder="https://example.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Control>
            </Form.Field>

            {/* 자기소개 필드 */}
            <Form.Field name="bio">
              <div style={{ marginBottom: "8px" }}>
                <Form.Label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#2d3748",
                    marginBottom: "6px",
                  }}
                >
                  📝 자기소개
                </Form.Label>
                <Form.Message
                  touched={true}
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              </div>
              <Form.Control asChild>
                <textarea
                  rows={4}
                  placeholder="자신에 대해 간단히 소개해주세요..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    resize: "vertical",
                  }}
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <button
                style={{
                  marginTop: "8px",
                  padding: "14px 28px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                고급 폼 제출하기
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
}
