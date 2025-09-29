import { Button } from "@acme/react";
import "./App.css";

function App() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
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
      </main>
    </div>
  );
}

export default App;
