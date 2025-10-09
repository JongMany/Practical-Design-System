import {
  Button,
  Card,
  Dialog,
  Checkbox,
  type DialogRootRef,
} from "@acme/react";
import { Form } from "@acme/react";
import { validators } from "@acme/core";
import { useRef, useState } from "react";
import "./App.css";

function App() {
  // 외부 제어를 위한 ref와 상태
  const dialogRef = useRef<DialogRootRef>(null);
  const [controlledDialogOpen, setControlledDialogOpen] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 외부에서 Dialog 제어하는 함수들
  const openDialogExternally = () => {
    dialogRef.current?.open();
  };

  const closeDialogExternally = () => {
    dialogRef.current?.close();
  };

  const toggleDialogExternally = () => {
    dialogRef.current?.toggle();
  };

  const setDialogStateExternally = (open: boolean) => {
    dialogRef.current?.setOpen(open);
  };

  // Checkbox 상태 관리
  const [checkboxStates, setCheckboxStates] = useState({
    basic: false,
    controlled: false,
    disabled: false,
  });

  const handleCheckboxChange =
    (key: keyof typeof checkboxStates) => (checked: boolean) => {
      setCheckboxStates((prev) => ({ ...prev, [key]: checked }));
    };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Design System Demo</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          🌙 Toggle Theme
        </button>
      </header>

      <main className="app-main">
        {/* Button Component */}
        <section className="demo-section">
          <h2>Button Component</h2>
          <div className="button-showcase">
            <Button onClick={() => console.log("React button clicked")}>
              버튼 컴포넌트
            </Button>
            <Button>d</Button>
          </div>
        </section>
        {/* Color Palette */}
        <section className="demo-section">
          <h2>Color Palette</h2>
          <div className="color-showcase">
            <div className="color-group">
              <h3>Carrot (Brand)</h3>
              <div className="color-scale">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
                  (shade) => (
                    <div
                      key={shade}
                      className="color-swatch"
                      style={{
                        backgroundColor: `var(--ds-color-carrot-${shade})`,
                      }}
                      title={`carrot-${shade}`}
                    >
                      <span className="color-label">{shade}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="color-group">
              <h3>Gray (Neutral)</h3>
              <div className="color-scale">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
                  (shade) => (
                    <div
                      key={shade}
                      className="color-swatch"
                      style={{
                        backgroundColor: `var(--ds-color-gray-${shade})`,
                      }}
                      title={`gray-${shade}`}
                    >
                      <span className="color-label">{shade}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="color-group">
              <h3>Semantic Colors</h3>
              <div className="semantic-colors">
                <div
                  className="semantic-swatch"
                  style={{
                    backgroundColor: "var(--ds-semantic-color-fg-brand)",
                  }}
                >
                  Brand
                </div>
                <div
                  className="semantic-swatch"
                  style={{
                    backgroundColor: "var(--ds-semantic-color-fg-informative)",
                  }}
                >
                  Info
                </div>
                <div
                  className="semantic-swatch"
                  style={{
                    backgroundColor: "var(--ds-semantic-color-fg-positive)",
                  }}
                >
                  Success
                </div>
                <div
                  className="semantic-swatch"
                  style={{
                    backgroundColor: "var(--ds-semantic-color-fg-warning)",
                  }}
                >
                  Warning
                </div>
                <div
                  className="semantic-swatch"
                  style={{
                    backgroundColor: "var(--ds-semantic-color-fg-critical)",
                  }}
                >
                  Error
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="demo-section">
          <h2>Typography</h2>
          <div className="typography-showcase">
            <div className="typography-item">
              <h1 className="typography-h1">Heading 1</h1>
              <code>
                var(--ds-semantic-typography-h1-font-size) /
                var(--ds-semantic-typography-h1-line-height) /
                var(--ds-font-weight-bold)
              </code>
            </div>
            <div className="typography-item">
              <h2 className="typography-h2">Heading 2</h2>
              <code>
                var(--ds-font-size-t8-static) / var(--ds-line-height-t8-static)
                / var(--ds-font-weight-medium)
              </code>
            </div>
            <div className="typography-item">
              <h3 className="typography-h3">Heading 3</h3>
              <code>
                var(--ds-font-size-t7-static) / var(--ds-line-height-t7-static)
                / var(--ds-font-weight-medium)
              </code>
            </div>
            <div className="typography-item">
              <p className="typography-body">
                This is body text using design tokens. It demonstrates how
                semantic tokens automatically adapt to light and dark themes.
              </p>
              <code>
                var(--ds-semantic-typography-body-font-size) /
                var(--ds-semantic-typography-body-line-height) /
                var(--ds-font-weight-regular)
              </code>
            </div>
            <div className="typography-item">
              <p className="typography-caption">
                This is caption text for smaller details and metadata.
              </p>
              <code>
                var(--ds-semantic-typography-caption-font-size) /
                var(--ds-semantic-typography-caption-line-height) /
                var(--ds-font-weight-regular)
              </code>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="demo-section">
          <h2>Buttons</h2>
          <div className="button-showcase">
            <div className="button-group">
              <button className="ds-btn ds-btn-primary">Primary</button>
              <button className="ds-btn ds-btn-secondary">Secondary</button>
              <button className="ds-btn ds-btn-ghost">Ghost</button>
              <button className="ds-btn ds-btn-outline">Outline</button>
            </div>
            <div className="button-group">
              <button className="ds-btn ds-btn-primary" disabled>
                Disabled
              </button>
              <button className="ds-btn ds-btn-secondary" disabled>
                Disabled
              </button>
            </div>
            <div className="button-group">
              <Button onClick={() => console.log("React button clicked")}>
                React Component
              </Button>
              <Button
                leftIcon="🔍"
                rightIcon="→"
                onClick={() => console.log("Button with icons clicked")}
              >
                아이콘 버튼
              </Button>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="demo-section">
          <h2>Form Elements</h2>
          <div className="form-showcase">
            <div className="form-group">
              <label htmlFor="input1">Input Field</label>
              <input
                id="input1"
                type="text"
                placeholder="Enter text here..."
                className="ds-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="textarea1">Textarea</label>
              <textarea
                id="textarea1"
                placeholder="Enter longer text here..."
                className="ds-textarea"
                rows={4}
              />
            </div>
            <div className="form-group">
              <label className="ds-checkbox">
                <input type="checkbox" />
                <span>Checkbox option</span>
              </label>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="demo-section">
          <h2>Cards</h2>
          <div className="card-grid">
            <div className="ds-card">
              <h3>Card Title</h3>
              <p>
                This is a card component using design tokens for consistent
                spacing and colors.
              </p>
              <button className="ds-btn ds-btn-primary">Action</button>
            </div>
            <div className="ds-card">
              <h3>Another Card</h3>
              <p>
                Cards automatically adapt to the current theme using semantic
                color tokens.
              </p>
              <button className="ds-btn ds-btn-ghost">Learn More</button>
            </div>
          </div>
        </section>

        {/* React Card Components */}
        <section className="demo-section">
          <h2>React Card Components</h2>

          {/* Basic Card */}
          <div className="card-showcase">
            <h3>Basic Card</h3>
            <Card.Root>
              <Card.Header>
                <Card.Title>기본 카드</Card.Title>
                <Card.Description>
                  이것은 기본적인 카드 컴포넌트입니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>카드의 본문 내용이 여기에 들어갑니다.</p>
              </Card.Body>
              <Card.Footer>
                <Button onClick={() => console.log("Card action clicked")}>
                  액션 버튼
                </Button>
              </Card.Footer>
            </Card.Root>
          </div>

          {/* Interactive Button Card */}
          <div className="card-showcase">
            <h3>Interactive Button Card</h3>
            <Card.Root action="button">
              <Card.Header>
                <Card.Title>클릭 가능한 카드</Card.Title>
                <Card.Description>
                  이 카드는 버튼처럼 동작합니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>카드를 클릭하거나 키보드로 활성화할 수 있습니다.</p>
              </Card.Body>
            </Card.Root>
          </div>

          {/* Toggle Card */}
          <div className="card-showcase">
            <h3>Toggle Card</h3>
            <Card.Root action="button" pressed={false}>
              <Card.Header>
                <Card.Title>토글 카드</Card.Title>
                <Card.Description>
                  선택 상태를 표시할 수 있는 카드입니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>aria-pressed 속성으로 선택 상태를 관리합니다.</p>
              </Card.Body>
            </Card.Root>
          </div>

          {/* Disabled Card */}
          <div className="card-showcase">
            <h3>Disabled Card</h3>
            <Card.Root action="button" disabled>
              <Card.Header>
                <Card.Title>비활성화된 카드</Card.Title>
                <Card.Description>
                  이 카드는 비활성화되어 있습니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>클릭해도 반응하지 않습니다.</p>
              </Card.Body>
            </Card.Root>
          </div>

          {/* Card with Media */}
          <div className="card-showcase">
            <h3>Card with Media</h3>
            <Card.Root>
              <Card.Media>
                <div
                  style={{
                    height: "200px",
                    background:
                      "linear-gradient(45deg, var(--ds-color-carrot-500), var(--ds-color-carrot-700))",
                    borderRadius: "var(--ds-radius-2, 12px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  미디어 영역
                </div>
              </Card.Media>
              <Card.Header>
                <Card.Title>미디어가 있는 카드</Card.Title>
                <Card.Description>
                  이미지나 비디오를 포함할 수 있습니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>미디어 콘텐츠와 함께 사용되는 카드입니다.</p>
              </Card.Body>
            </Card.Root>
          </div>

          {/* Polymorphic Card */}
          <div className="card-showcase">
            <h3>Polymorphic Card (as="article")</h3>
            <Card.Root as="article">
              <Card.Header>
                <Card.Title as="h2">시맨틱 카드</Card.Title>
                <Card.Description>
                  article 요소로 렌더링되는 카드입니다.
                </Card.Description>
              </Card.Header>
              <Card.Body>
                <p>시맨틱 HTML을 사용하여 접근성을 향상시킵니다.</p>
              </Card.Body>
            </Card.Root>
          </div>

          {/* AsChild Card */}
          <div className="card-showcase">
            <h3>AsChild Card</h3>
            <Card.Root asChild>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                <Card.Header>
                  <Card.Title>링크로 동작하는 카드</Card.Title>
                  <Card.Description>
                    asChild prop을 사용하여 기존 요소를 확장합니다.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <p>이 카드는 링크 요소로 렌더링됩니다.</p>
                </Card.Body>
              </a>
            </Card.Root>
          </div>
        </section>

        {/* Dialog Component */}
        <section className="demo-section">
          <h2>Dialog Component</h2>
          <div className="dialog-showcase">
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {/* 기본 Dialog (오버레이 클릭으로 닫기 가능) */}
              <Dialog.Root>
                <Dialog.Trigger>기본 다이얼로그</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <Dialog.Title>기본 다이얼로그</Dialog.Title>
                      <Dialog.Description>
                        오버레이를 클릭하면 닫힙니다.
                      </Dialog.Description>
                      <Dialog.Close>닫기</Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>

              {/* 오버레이 클릭으로 닫기 불가능한 Dialog */}
              <Dialog.Root closeOnOutsideClick={false}>
                <Dialog.Trigger>오버레이 클릭 불가</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <Dialog.Title>오버레이 클릭 불가</Dialog.Title>
                      <Dialog.Description>
                        오버레이를 클릭해도 닫히지 않습니다. 닫기 버튼이나
                        Escape 키를 사용하세요.
                      </Dialog.Description>
                      <Dialog.Close>닫기</Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>

              {/* Escape 키로도 닫기 불가능한 Dialog */}
              <Dialog.Root closeOnOutsideClick={false} closeOnEscape={false}>
                <Dialog.Trigger>강제 다이얼로그</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <Dialog.Title>강제 다이얼로그</Dialog.Title>
                      <Dialog.Description>
                        오버레이 클릭과 Escape 키로 닫을 수 없습니다. 반드시
                        닫기 버튼을 사용하세요.
                      </Dialog.Description>
                      <Dialog.Close>닫기</Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>
            </div>

            {/* 외부 제어 Dialog 예제 */}
            <div style={{ marginTop: "32px" }}>
              <h3>외부 제어 Dialog</h3>

              {/* ref를 통한 외부 제어 Dialog */}
              <Dialog.Root ref={dialogRef}>
                <Dialog.Trigger>외부 제어 다이얼로그</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <Dialog.Title>외부 제어 다이얼로그</Dialog.Title>
                      <Dialog.Description>
                        이 다이얼로그는 내부 버튼들로 제어할 수 있습니다. ref를
                        통해 직접 상태를 조작할 수 있습니다.
                      </Dialog.Description>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Dialog.Close>닫기</Dialog.Close>
                        <button
                          onClick={() => dialogRef.current?.toggle()}
                          className="ds-btn ds-btn-secondary"
                        >
                          토글
                        </button>
                        <button
                          onClick={openDialogExternally}
                          className="ds-btn ds-btn-primary"
                        >
                          열기
                        </button>
                        <button
                          onClick={closeDialogExternally}
                          className="ds-btn ds-btn-secondary"
                        >
                          닫기
                        </button>
                        <button
                          onClick={toggleDialogExternally}
                          className="ds-btn ds-btn-ghost"
                        >
                          토글
                        </button>
                        <button
                          onClick={() => setDialogStateExternally(true)}
                          className="ds-btn ds-btn-outline"
                        >
                          강제 열기
                        </button>
                        <button
                          onClick={() => setDialogStateExternally(false)}
                          className="ds-btn ds-btn-outline"
                        >
                          강제 닫기
                        </button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>
            </div>

            {/* Controlled Dialog 예제 */}
            <div style={{ marginTop: "32px" }}>
              <h3>Controlled Dialog (onOpenChange 사용)</h3>

              <Dialog.Root
                open={controlledDialogOpen}
                onOpenChange={setControlledDialogOpen}
              >
                <Dialog.Trigger>Controlled 다이얼로그</Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay>
                    <Dialog.Content>
                      <Dialog.Title>Controlled 다이얼로그</Dialog.Title>
                      <Dialog.Description>
                        이 다이얼로그는 open prop과 onOpenChange로 제어됩니다.
                        내부 버튼들로 상태를 조작할 수 있습니다.
                      </Dialog.Description>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginTop: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Dialog.Close>닫기</Dialog.Close>
                        <button
                          onClick={() =>
                            setControlledDialogOpen(!controlledDialogOpen)
                          }
                          className="ds-btn ds-btn-secondary"
                        >
                          토글
                        </button>
                        <button
                          onClick={() => setControlledDialogOpen(true)}
                          className="ds-btn ds-btn-primary"
                        >
                          열기
                        </button>
                        <button
                          onClick={() => setControlledDialogOpen(false)}
                          className="ds-btn ds-btn-secondary"
                        >
                          닫기
                        </button>
                        <button
                          onClick={() =>
                            setControlledDialogOpen(!controlledDialogOpen)
                          }
                          className="ds-btn ds-btn-ghost"
                        >
                          토글
                        </button>
                      </div>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              </Dialog.Root>

              <p
                style={{
                  marginTop: "16px",
                  color: "var(--ds-semantic-color-fg-secondary)",
                }}
              >
                현재 상태: {controlledDialogOpen ? "열림" : "닫힘"}
              </p>
            </div>
          </div>
        </section>

        {/* Checkbox Component */}
        <section className="demo-section">
          <h2>Checkbox Component</h2>
          <div className="checkbox-showcase">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* 기본 Checkbox */}
              <Checkbox.Root
                className="CheckboxRoot"
                checked={checkboxStates.basic}
                id="c1"
                onCheckedChange={handleCheckboxChange("basic")}
              >
                <Checkbox.Indicator className="CheckboxIndicator">
                  ✓
                </Checkbox.Indicator>
                <Checkbox.Label className="Label">
                  Accept terms and conditions.
                </Checkbox.Label>
              </Checkbox.Root>

              {/* Controlled Checkbox */}
              <Checkbox.Root
                className="CheckboxRoot"
                checked={checkboxStates.controlled}
                id="c2"
                onCheckedChange={handleCheckboxChange("controlled")}
              >
                <Checkbox.Indicator className="CheckboxIndicator">
                  ✓
                </Checkbox.Indicator>
                <Checkbox.Label className="Label">
                  Controlled checkbox (현재 상태:{" "}
                  {checkboxStates.controlled ? "체크됨" : "체크 안됨"})
                </Checkbox.Label>
              </Checkbox.Root>

              {/* Disabled Checkbox */}
              <Checkbox.Root className="CheckboxRoot" disabled={true} id="c4">
                <Checkbox.Indicator className="CheckboxIndicator">
                  ✓
                </Checkbox.Indicator>
                <Checkbox.Label className="Label">
                  Disabled checkbox
                </Checkbox.Label>
              </Checkbox.Root>

              {/* ReadOnly Checkbox */}
              <Checkbox.Root
                className="CheckboxRoot"
                readOnly={true}
                defaultChecked={true}
                id="c5"
              >
                <Checkbox.Indicator className="CheckboxIndicator">
                  ✓
                </Checkbox.Indicator>
                <Checkbox.Label className="Label">
                  ReadOnly checkbox
                </Checkbox.Label>
              </Checkbox.Root>

              {/* Required Checkbox */}
              <Checkbox.Root className="CheckboxRoot" required={true} id="c6">
                <Checkbox.Indicator className="CheckboxIndicator">
                  ✓
                </Checkbox.Indicator>
                <Checkbox.Label className="Label">
                  Required checkbox *
                </Checkbox.Label>
              </Checkbox.Root>
            </div>

            {/* 상태 표시 */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <h4>현재 Checkbox 상태들:</h4>
              <ul>
                <li>Basic: {checkboxStates.basic ? "체크됨" : "체크 안됨"}</li>
                <li>
                  Controlled:{" "}
                  {checkboxStates.controlled ? "체크됨" : "체크 안됨"}
                </li>
                <li>Disabled: 항상 비활성화</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Form 예제 섹션 */}
        <section
          style={{
            padding: "48px 32px",
            borderBottom: "1px solid #e0e0e0",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "16px",
                fontWeight: "700",
              }}
            >
              Form 컴포넌트 예제
            </h2>
            <p
              style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "48px" }}
            >
              접근성이 완전히 지원되는 아름다운 Form 컴포넌트들입니다.
            </p>

            <div style={{ display: "grid", gap: "32px", marginTop: "24px" }}>
              {/* 기본 Form 예제 */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                      color: "#2d3748",
                    }}
                  >
                    💬 기본 Form 예제
                  </h3>
                  <p style={{ color: "#718096", fontSize: "1rem" }}>
                    이메일과 질문을 입력하는 간단한 폼입니다.
                  </p>
                </div>

                <Form.Root
                  fields={["email", "question"]}
                  initialValues={{ email: "", question: "" }}
                  validators={{
                    email: validators.email,
                    question: validators.required,
                  }}
                  validateOnBlur={true}
                  validateOnChange={true}
                  onSubmit={async (values: Record<string, string>) => {
                    console.log("Form submitted:", values);
                    alert(
                      `제출된 데이터:\n이메일: ${values.email}\n질문: ${values.question}`
                    );
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
                        <Form.Message match="valueMissing">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            이메일을 입력해주세요
                          </span>
                        </Form.Message>
                        <Form.Message match="typeMismatch">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            올바른 이메일 형식을 입력해주세요
                          </span>
                        </Form.Message>
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
                            outline: "none",
                            background: "#f7fafc",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
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
                        <Form.Message match="valueMissing">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            질문을 입력해주세요
                          </span>
                        </Form.Message>
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
                            outline: "none",
                            background: "#f7fafc",
                            resize: "vertical",
                            fontFamily: "inherit",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
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
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 20px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(102, 126, 234, 0.3)";
                        }}
                      >
                        🚀 질문 등록하기
                      </button>
                    </Form.Submit>
                  </div>
                </Form.Root>
              </Card>

              {/* 고급 Form 예제 */}
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ marginBottom: "24px" }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                      color: "#2d3748",
                    }}
                  >
                    ⚡ 고급 Form 예제
                  </h3>
                  <p style={{ color: "#718096", fontSize: "1rem" }}>
                    여러 필드 타입과 유효성 검사를 포함한 복잡한 폼입니다.
                  </p>
                </div>

                <Form.Root
                  fields={["name", "email", "phone", "age", "website", "bio"]}
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
                    age: (value: string) => {
                      if (!value) return null;
                      const age = parseInt(value);
                      if (isNaN(age)) return "나이는 숫자여야 합니다";
                      if (age < 18) return "18세 이상이어야 합니다";
                      if (age > 100) return "100세 이하여야 합니다";
                      return null;
                    },
                    website: validators.url,
                    bio: validators.minLength(10),
                  }}
                  validateOnBlur={true}
                  validateOnChange={true}
                  onSubmit={async (values: Record<string, string>) => {
                    console.log("Advanced form submitted:", values);
                    alert(
                      `제출된 데이터:\n${Object.entries(values)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n")}`
                    );
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
                        <Form.Message match="valueMissing">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            이름을 입력해주세요
                          </span>
                        </Form.Message>
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
                            outline: "none",
                            background: "#f7fafc",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
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
                        <Form.Message match="valueMissing">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            이메일을 입력해주세요
                          </span>
                        </Form.Message>
                        <Form.Message match="typeMismatch">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            올바른 이메일 형식을 입력해주세요
                          </span>
                        </Form.Message>
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
                            outline: "none",
                            background: "#f7fafc",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </Form.Control>
                    </Form.Field>

                    {/* 전화번호와 나이 필드 - 2열 그리드 */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                      }}
                    >
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
                          <Form.Message match="typeMismatch">
                            <span
                              style={{
                                color: "#e53e3e",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                              }}
                            >
                              올바른 전화번호 형식을 입력해주세요
                            </span>
                          </Form.Message>
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
                              outline: "none",
                              background: "#f7fafc",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.background = "white";
                              e.target.style.boxShadow =
                                "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.background = "#f7fafc";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </Form.Control>
                      </Form.Field>

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
                          <Form.Message match="rangeUnderflow">
                            <span
                              style={{
                                color: "#e53e3e",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                              }}
                            >
                              18세 이상이어야 합니다
                            </span>
                          </Form.Message>
                          <Form.Message match="rangeOverflow">
                            <span
                              style={{
                                color: "#e53e3e",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                              }}
                            >
                              100세 이하여야 합니다
                            </span>
                          </Form.Message>
                        </div>
                        <Form.Control asChild>
                          <input
                            type="number"
                            min="18"
                            max="100"
                            placeholder="25"
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              border: "2px solid #e2e8f0",
                              borderRadius: "12px",
                              fontSize: "1rem",
                              transition: "all 0.2s ease",
                              outline: "none",
                              background: "#f7fafc",
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.background = "white";
                              e.target.style.boxShadow =
                                "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.background = "#f7fafc";
                              e.target.style.boxShadow = "none";
                            }}
                          />
                        </Form.Control>
                      </Form.Field>
                    </div>

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
                        <Form.Message match="typeMismatch">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            올바른 URL 형식을 입력해주세요
                          </span>
                        </Form.Message>
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
                            outline: "none",
                            background: "#f7fafc",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
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
                          📝 자기소개 *
                        </Form.Label>
                        <Form.Message match="valueMissing">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            자기소개를 입력해주세요
                          </span>
                        </Form.Message>
                        <Form.Message match="tooShort">
                          <span
                            style={{
                              color: "#e53e3e",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                            }}
                          >
                            최소 10자 이상 입력해주세요
                          </span>
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <textarea
                          required
                          rows={4}
                          placeholder="자신에 대해 간단히 소개해주세요. 최소 10자 이상 입력해주세요."
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            border: "2px solid #e2e8f0",
                            borderRadius: "12px",
                            fontSize: "1rem",
                            transition: "all 0.2s ease",
                            outline: "none",
                            background: "#f7fafc",
                            resize: "vertical",
                            fontFamily: "inherit",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.background = "white";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.background = "#f7fafc";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </Form.Control>
                    </Form.Field>

                    {/* 제출 버튼 */}
                    <Form.Submit asChild>
                      <button
                        style={{
                          marginTop: "8px",
                          padding: "16px 32px",
                          background:
                            "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          boxShadow: "0 4px 12px rgba(72, 187, 120, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 20px rgba(72, 187, 120, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(72, 187, 120, 0.3)";
                        }}
                      >
                        ✨ 정보 제출하기
                      </button>
                    </Form.Submit>
                  </div>
                </Form.Root>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
