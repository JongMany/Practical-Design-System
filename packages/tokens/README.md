# Design Tokens

이 패키지는 Practical Design System의 디자인 토큰을 제공합니다.

## 사용법

### 1. CSS 변수로 사용

```css
/* 기본 토큰 (light + dark 테마 모두 포함) - 권장 */
@import "@acme/tokens/css";

/* 또는 특정 테마만 */
@import "@acme/tokens/css/light";
@import "@acme/tokens/css/dark";
```

### 2. JavaScript/TypeScript에서 사용

```typescript
import tokens from "@acme/tokens";

// 토큰 값 접근
const primaryColor = tokens["color.carrot-600"]; // { light: "#ED7735", dark: "#F08A4C" }
```

### 3. 테마 전환

HTML에서 `data-theme` 속성을 사용하여 테마를 전환할 수 있습니다:

```html
<!-- Light 테마 (기본) -->
<html>
  <body>
    ...
  </body>
</html>

<!-- Dark 테마 -->
<html data-theme="dark">
  <body>
    ...
  </body>
</html>
```

### 4. CSS에서 토큰 사용

```css
.button {
  background-color: var(--ds-color-carrot-600);
  color: var(--ds-color-white);
  border-radius: var(--ds-radius-control);
  padding: var(--ds-space-control-padding-y) var(--ds-space-control-padding-x);
}
```

## 테마 시스템

### Light 테마

- `@acme/tokens/css/light` - 라이트 테마 CSS 변수
- 기본 `:root` 선택자 사용

### Dark 테마

- `@acme/tokens/css/dark` - 다크 테마 CSS 변수
- `:root[data-theme="dark"]` 선택자 사용

### 테마 전환 JavaScript

```javascript
// 테마 전환 함수
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// 페이지 로드 시 저장된 테마 적용
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// 초기화
initTheme();
```

## 사용 가능한 토큰

### 색상 (Color)

- **Carrot**: `--ds-color-carrot-050` ~ `--ds-color-carrot-1000`
- **Gray**: `--ds-color-gray-050` ~ `--ds-color-gray-1000`
- **Static**: `--ds-color-white`, `--ds-color-black`

### 투명도 (Opacity)

- `--ds-opacity-disabled`
- `--ds-opacity-overlay-1`
- `--ds-opacity-overlay-2`
- `--ds-opacity-focus-ring`

### 폰트 (Font)

- **Size**: `--ds-font-size-100` ~ `--ds-font-size-800`
- **Weight**: `--ds-font-weight-thin`, `--ds-font-weight-regular`, `--ds-font-weight-medium`, `--ds-font-weight-semibold`
- **Line Height**: `--ds-line-height-1` ~ `--ds-line-height-4`
- **Family**: `--ds-font-family-system`

### 컴포넌트 (Component)

- **Button**: `--ds-component-button-primary-bg`, `--ds-component-button-primary-fg` 등
- **Field**: `--ds-component-field-bg`, `--ds-component-field-bd` 등
- **Overlay**: `--ds-component-overlay-scrim`, `--ds-component-overlay-surface` 등

### 타이포그래피 (Typography)

- `--ds-typography-body`
- `--ds-typography-h1`
- `--ds-typography-h2`
