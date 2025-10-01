import { Button, Card, Dialog, type DialogRootRef } from "@acme/react";
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
            <Button onPress={() => console.log("React button clicked")}>
              버튼 컴포넌트
            </Button>
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
              <Button onPress={() => console.log("React button clicked")}>
                React Component
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
                <Button onPress={() => console.log("Card action clicked")}>
                  액션 버튼
                </Button>
              </Card.Footer>
            </Card.Root>
          </div>

          {/* Interactive Button Card */}
          <div className="card-showcase">
            <h3>Interactive Button Card</h3>
            <Card.Root
              action="button"
              onPress={(e) => console.log("Card pressed:", e.type)}
            >
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
            <Card.Root
              action="button"
              pressed={false}
              onPress={(e) => console.log("Toggle card pressed:", e.type)}
            >
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
            <Card.Root
              action="button"
              disabled
              onPress={(_e) => console.log("This won't fire", _e)}
            >
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
      </main>
    </div>
  );
}

export default App;
