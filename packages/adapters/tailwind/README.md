# Tailwind CSS v4 Adapter

이 패키지는 디자인 시스템을 Tailwind CSS v4와 통합하기 위한 어댑터입니다.

## 설치

```bash
npm install @acme/adapter-tailwind
```

## 사용법

### Tailwind v4 방식 (권장)

```css
/* globals.css 또는 메인 CSS 파일 */
@import "@acme/adapter-tailwind/theme";
@import "@acme/tokens/dist/tokens.css";
```

또는

```css
@import "@acme/adapter-tailwind";
@import "@acme/tokens/dist/tokens.css";
```

### Tailwind v3 방식 (하위 호환성)

```javascript
// tailwind.config.js
module.exports = {
  presets: [require("@acme/adapter-tailwind/preset")],
};
```

## 주요 특징

- **CSS 변수 기반**: 디자인 토큰을 CSS 변수로 매핑
- **컴포넌트 스타일**: `.ds-btn` 클래스 제공
- **v4 최적화**: `@theme` 디렉티브 사용으로 성능 향상
- **하위 호환성**: v3 preset도 지원

## 사용 가능한 클래스

- `ds-btn`: 기본 버튼 스타일
- `bg-brand`: 브랜드 색상 배경
- `text-surface`: 서피스 색상 텍스트
- `rounded-control`: 컨트롤 반지름
