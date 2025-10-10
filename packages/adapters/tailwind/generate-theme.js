#!/usr/bin/env node

/**
 * 자동 테마 생성기
 * dist/tokens.css 파일을 파싱하여 Tailwind CSS @theme 지시어를 자동 생성합니다.
 *
 * 이 방법은 Tailwind CSS v4의 공식 권장 방식입니다:
 * https://tailwindcss.com/docs/colors#using-a-custom-palette
 */

const fs = require("fs");
const path = require("path");

// 파일 경로
const TOKENS_CSS_PATH = path.join(__dirname, "../../tokens/dist/tokens.css");
const THEME_CSS_PATH = path.join(__dirname, "theme.css");

// 토큰 패턴들
const TOKEN_PATTERNS = {
  // 색상 토큰
  color: /--ds-color-([a-z]+)-(\d+):\s*([^;]+);/g,
  // 스페이싱/디멘션 토큰
  spacing: /--ds-dimension-x([\w-]+):\s*([^;]+);/g,
  // 반지름 토큰
  radius: /--ds-radius-r([\w-]+):\s*([^;]+);/g,
  // 지속시간 토큰
  duration: /--ds-duration-d(\d+):\s*([^;]+);/g,
  // 타이밍 토큰
  timing: /--ds-timing-([\w-]+):\s*([^;]+);/g,
  // 폰트 크기 토큰
  fontSize: /--ds-font-size-t(\d+)-static:\s*([^;]+);/g,
  // 라인 높이 토큰
  lineHeight: /--ds-line-height-t(\d+)-static:\s*([^;]+);/g,
  // 폰트 가중치 토큰
  fontWeight: /--ds-font-weight-([\w-]+):\s*([^;]+);/g,
  // 폰트 패밀리 토큰
  fontFamily: /--ds-font-family-([\w-]+):\s*([^;]+);/g,
};

// 지원하는 색상 팔레트
const SUPPORTED_PALETTES = [
  "gray",
  "blue",
  "carrot",
  "green",
  "purple",
  "red",
  "yellow",
];

function parseTokens() {
  if (!fs.existsSync(TOKENS_CSS_PATH)) {
    console.error(`토큰 파일을 찾을 수 없습니다: ${TOKENS_CSS_PATH}`);
    process.exit(1);
  }

  const cssContent = fs.readFileSync(TOKENS_CSS_PATH, "utf8");
  const allTokens = {};

  // 각 토큰 타입별로 파싱
  for (const [tokenType, pattern] of Object.entries(TOKEN_PATTERNS)) {
    allTokens[tokenType] = new Map();

    // 패턴 리셋
    pattern.lastIndex = 0;
    let match;

    while ((match = pattern.exec(cssContent)) !== null) {
      if (tokenType === "color") {
        const [, palette, shade, value] = match;
        if (SUPPORTED_PALETTES.includes(palette)) {
          if (!allTokens[tokenType].has(palette)) {
            allTokens[tokenType].set(palette, new Map());
          }
          allTokens[tokenType].get(palette).set(shade, value.trim());
        }
      } else {
        // 다른 토큰 타입들
        const [, key, value] = match;
        allTokens[tokenType].set(key, value.trim());
      }
    }
  }

  return allTokens;
}

function generateThemeSection(allTokens) {
  const sections = [];

  // 색상 토큰 처리
  if (allTokens.color) {
    for (const [palette, shades] of allTokens.color) {
      const paletteName = palette.charAt(0).toUpperCase() + palette.slice(1);
      sections.push(`  /* Colors - ${paletteName} Scale */`);

      // 색상을 숫자 순으로 정렬
      const sortedShades = Array.from(shades.entries()).sort((a, b) => {
        const numA = parseInt(a[0]);
        const numB = parseInt(b[0]);
        return numA - numB;
      });

      for (const [shade, value] of sortedShades) {
        const themeVar = `--color-${palette}-${shade}`;
        const tokenVar = `--ds-color-${palette}-${shade}`;
        sections.push(`  ${themeVar}: var(${tokenVar});`);
      }

      sections.push(""); // 빈 줄 추가
    }
  }

  // 스페이싱 토큰 처리
  if (allTokens.spacing && allTokens.spacing.size > 0) {
    sections.push(`  /* Spacing */`);
    for (const [key, value] of allTokens.spacing) {
      const themeVar = `--spacing-${key}`;
      const tokenVar = `--ds-dimension-x${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 반지름 토큰 처리
  if (allTokens.radius && allTokens.radius.size > 0) {
    sections.push(`  /* Border Radius */`);
    for (const [key, value] of allTokens.radius) {
      const themeVar = `--radius-${key}`;
      const tokenVar = `--ds-radius-r${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 지속시간 토큰 처리
  if (allTokens.duration && allTokens.duration.size > 0) {
    sections.push(`  /* Duration */`);
    for (const [key, value] of allTokens.duration) {
      const themeVar = `--duration-${key}`;
      const tokenVar = `--ds-duration-d${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 타이밍 토큰 처리
  if (allTokens.timing && allTokens.timing.size > 0) {
    sections.push(`  /* Timing Functions */`);
    for (const [key, value] of allTokens.timing) {
      const themeVar = `--ease-${key}`;
      const tokenVar = `--ds-timing-${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 폰트 크기 토큰 처리
  if (allTokens.fontSize && allTokens.fontSize.size > 0) {
    sections.push(`  /* Font Sizes */`);
    for (const [key, value] of allTokens.fontSize) {
      const themeVar = `--font-size-${key}`;
      const tokenVar = `--ds-font-size-t${key}-static`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 라인 높이 토큰 처리
  if (allTokens.lineHeight && allTokens.lineHeight.size > 0) {
    sections.push(`  /* Line Heights */`);
    for (const [key, value] of allTokens.lineHeight) {
      const themeVar = `--line-height-${key}`;
      const tokenVar = `--ds-line-height-t${key}-static`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 폰트 가중치 토큰 처리
  if (allTokens.fontWeight && allTokens.fontWeight.size > 0) {
    sections.push(`  /* Font Weights */`);
    for (const [key, value] of allTokens.fontWeight) {
      const themeVar = `--font-weight-${key}`;
      const tokenVar = `--ds-font-weight-${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  // 폰트 패밀리 토큰 처리
  if (allTokens.fontFamily && allTokens.fontFamily.size > 0) {
    sections.push(`  /* Font Families */`);
    for (const [key, value] of allTokens.fontFamily) {
      const themeVar = `--font-family-${key}`;
      const tokenVar = `--ds-font-family-${key}`;
      sections.push(`  ${themeVar}: var(${tokenVar});`);
    }
    sections.push("");
  }

  return sections.join("\n");
}

function updateThemeFile(tokens) {
  if (!fs.existsSync(THEME_CSS_PATH)) {
    console.error(`테마 파일을 찾을 수 없습니다: ${THEME_CSS_PATH}`);
    process.exit(1);
  }

  const currentContent = fs.readFileSync(THEME_CSS_PATH, "utf8");

  // @theme 블록 찾기
  const themeStart = currentContent.indexOf("@theme {");
  const themeEnd = currentContent.indexOf("}", themeStart);

  if (themeStart === -1 || themeEnd === -1) {
    console.error("@theme 블록을 찾을 수 없습니다.");
    process.exit(1);
  }

  // 기존 토큰 섹션 제거하고 새로운 토큰 섹션 추가
  const beforeTheme = currentContent.substring(0, themeStart + 9); // '@theme {' 포함
  const afterTheme = currentContent.substring(themeEnd);

  // 기존 내용에서 토큰이 아닌 부분만 추출
  const existingThemeContent = currentContent.substring(
    themeStart + 9,
    themeEnd
  );
  const nonTokenLines = existingThemeContent
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return (
        !trimmed.startsWith("/* Colors") &&
        !trimmed.startsWith("/* Spacing") &&
        !trimmed.startsWith("/* Border Radius") &&
        !trimmed.startsWith("/* Duration") &&
        !trimmed.startsWith("/* Timing Functions") &&
        !trimmed.startsWith("/* Font Sizes") &&
        !trimmed.startsWith("/* Line Heights") &&
        !trimmed.startsWith("/* Font Weights") &&
        !trimmed.startsWith("/* Font Families") &&
        !trimmed.startsWith("--color-") &&
        !trimmed.startsWith("--spacing-") &&
        !trimmed.startsWith("--radius-") &&
        !trimmed.startsWith("--duration-") &&
        !trimmed.startsWith("--ease-") &&
        !trimmed.startsWith("--font-size-") &&
        !trimmed.startsWith("--line-height-") &&
        !trimmed.startsWith("--font-weight-") &&
        !trimmed.startsWith("--font-family-") &&
        trimmed !== ""
      );
    })
    .join("\n");

  const newThemeContent = generateThemeSection(tokens);

  const updatedContent =
    beforeTheme + "\n" + newThemeContent + nonTokenLines + "\n" + afterTheme;

  fs.writeFileSync(THEME_CSS_PATH, updatedContent);
}

function main() {
  console.log("🎨 Tailwind 테마 자동 생성 중...");

  try {
    const allTokens = parseTokens();

    // 발견된 토큰 타입들 출력
    const tokenTypes = Object.keys(allTokens).filter(
      (type) => allTokens[type].size > 0
    );
    console.log(`📊 발견된 토큰 타입: ${tokenTypes.join(", ")}`);

    if (allTokens.color) {
      const colorPalettes = Array.from(allTokens.color.keys());
      console.log(`🎨 색상 팔레트: ${colorPalettes.join(", ")}`);
    }

    updateThemeFile(allTokens);
    console.log(`✅ 테마 파일 업데이트 완료: ${THEME_CSS_PATH}`);

    // 통계 출력
    let totalTokens = 0;
    for (const [type, tokens] of Object.entries(allTokens)) {
      if (type === "color") {
        const colorCount = Array.from(tokens.values()).reduce(
          (sum, shades) => sum + shades.size,
          0
        );
        totalTokens += colorCount;
        console.log(`📈 ${type}: ${colorCount}개`);
      } else {
        totalTokens += tokens.size;
        console.log(`📈 ${type}: ${tokens.size}개`);
      }
    }

    console.log(`🎯 총 ${totalTokens}개의 토큰이 @theme에 추가되었습니다!`);
    console.log(
      "🚀 이제 모든 디자인 토큰을 Tailwind 유틸리티로 사용할 수 있습니다!"
    );
  } catch (error) {
    console.error("❌ 오류 발생:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseTokens, generateThemeSection, updateThemeFile };
