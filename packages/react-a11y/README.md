# @acme/react-a11y

React용 접근성(a11y) 훅들을 제공하는 패키지입니다.

## 구조

이 패키지는 다음과 같은 계층 구조로 구성되어 있습니다:

- **@acme/core**: 기본 유틸리티 함수들
- **@acme/a11y**: 접근성 기능 확장
- **@acme/react-a11y**: React 훅으로 래핑

## 사용 예시

### useKeyboardPress

키보드 활성화 기능을 제공하는 훅입니다.

```tsx
import { useKeyboardPress } from "@acme/react-a11y";

function MyButton() {
  const keyboardProps = useKeyboardPress({
    disabled: false,
    onKeyboardPress: (event) => {
      console.log("Keyboard pressed:", event.type);
    },
    preventKeyRepeat: true,
    keyRepeatDelay: 100,
    keyCombinations: [["Ctrl", "Enter"]],
    onKeyCombination: (event) => {
      console.log("Key combination:", event.combination);
    },
  });

  return <button {...keyboardProps}>Press me with keyboard</button>;
}
```

### usePointerActivation

포인터 활성화(클릭/터치) 기능을 제공하는 훅입니다.

```tsx
import { usePointerActivation } from "@acme/react-a11y";

function MyButton() {
  const pointerProps = usePointerActivation({
    disabled: false,
    onPointerActivate: (event) => {
      console.log("Pointer activated:", event.type);
    },
    longPress: true,
    longPressDelay: 500,
    onLongPress: () => {
      console.log("Long pressed!");
    },
    preventDoubleActivation: true,
    doubleActivationDelay: 300,
    touchAction: "manipulation",
  });

  return <button {...pointerProps}>Press me with pointer</button>;
}
```

### 통합 사용 예시

키보드와 포인터 활성화를 함께 사용하는 예시입니다.

```tsx
import { useKeyboardPress, usePointerActivation } from "@acme/react-a11y";

function MyButton() {
  const keyboardProps = useKeyboardPress({
    onKeyboardPress: (event) => {
      console.log("Keyboard:", event.type);
    },
  });

  const pointerProps = usePointerActivation({
    onPointerActivate: (event) => {
      console.log("Pointer:", event.type);
    },
  });

  return (
    <button {...keyboardProps} {...pointerProps}>
      Press me
    </button>
  );
}
```

### useFocusTrap

포커스 트랩 기능을 제공하는 훅입니다.

```tsx
import { useFocusTrap } from "@acme/react-a11y";

function MyModal({ isOpen }: { isOpen: boolean }) {
  const containerRef = useFocusTrap(isOpen, {
    enabled: true,
    autoFocus: true,
  });

  return <div ref={containerRef}>{/* Modal 내용 */}</div>;
}
```

### useEscapeToClose

Escape 키로 닫기 기능을 제공하는 훅입니다.

```tsx
import { useEscapeToClose } from "@acme/react-a11y";

function MyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEscapeToClose({
    enabled: true,
    isOpen,
    onClose,
  });

  return <div>Modal 내용</div>;
}
```

### useAriaIds

ARIA ID를 생성하는 훅입니다.

```tsx
import { useAriaIds } from "@acme/react-a11y";

function MyComponent() {
  const { labelId, descId } = useAriaIds("my-component");

  return (
    <div>
      <h2 id={labelId}>제목</h2>
      <p id={descId}>설명</p>
      <button aria-labelledby={labelId} aria-describedby={descId}>
        버튼
      </button>
    </div>
  );
}
```

## 특징

- **타입 안전성**: TypeScript로 완전히 작성되어 타입 안전성을 보장합니다.
- **접근성 준수**: WCAG 가이드라인을 준수하여 접근성을 보장합니다.
- **계층적 구조**: core → a11y → react-a11y 순으로 기능이 확장되어 재사용성이 높습니다.
- **React 최적화**: React의 특성을 고려하여 최적화된 훅들을 제공합니다.
- **분리된 관심사**: 키보드와 포인터 활성화를 분리하여 더 명확한 API를 제공합니다.
