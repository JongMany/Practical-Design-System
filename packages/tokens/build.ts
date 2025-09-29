import StyleDictionary from "style-dictionary";
import fs from "node:fs";
import path from "node:path";

// 토큰 소스 파일과 출력 디렉토리 설정
const SRC = path.join(process.cwd(), "tokens.json");
const OUT = path.join(process.cwd(), "dist");
fs.mkdirSync(OUT, { recursive: true });

/**
 * 토큰 경로를 CSS 변수명으로 변환하는 함수
 * 예: color.component.button.primary.bg -> --ds-color-component-button-primary-bg
 */
const nameTransform = (tokenPath: string[]) =>
  ["ds", ...tokenPath.join("/").replaceAll(".", "/").split("/")]
    .filter(Boolean)
    .map((s) => s.replace(/[^a-zA-Z0-9_-]/g, "-"))
    .join("-");

// CSS 변수명 변환기 등록
StyleDictionary.registerTransform({
  name: "ds/name/css",
  type: "name",
  transform: (prop) => nameTransform(prop.path),
});

// CSS 변수 포맷터 등록 (:root { --ds-*: value; } 형태)
StyleDictionary.registerFormat({
  name: "ds/css-variables",
  format: ({ dictionary }) =>
    `:root{\n${dictionary.allTokens
      .map((p) => `  --${p.name}: ${p.value};`)
      .join("\n")}\n}\n`,
});

// StyleDictionary 설정 및 빌드
const sd = new StyleDictionary({
  source: [SRC],
  platforms: {
    // CSS 변수 파일 생성 (모든 어댑터의 공통 기반)
    css: {
      transforms: ["attribute/cti", "name/kebab", "ds/name/css"],
      buildPath: OUT + "/",
      files: [{ destination: "tokens.css", format: "ds/css-variables" }],
    },
    // JSON 형태로 토큰 내보내기
    json: {
      transforms: ["attribute/cti", "name/kebab"],
      buildPath: OUT + "/",
      files: [{ destination: "tokens.json", format: "json" }],
    },
    // TypeScript/JavaScript 모듈로 내보내기
    ts: {
      transforms: ["attribute/cti", "name/kebab", "ds/name/css"],
      buildPath: OUT + "/",
      files: [
        {
          destination: "tokens.mts",
          format: "javascript/module",
          options: { outputReferences: true },
        },
      ],
    },
    // SCSS 변수로 내보내기
    scss: {
      transforms: ["attribute/cti", "name/kebab", "ds/name/css"],
      buildPath: OUT + "/",
      files: [
        {
          destination: "_tokens.scss",
          format: "scss/variables",
        },
      ],
    },
  },
});

// 모든 플랫폼 빌드 실행
sd.buildAllPlatforms();

// TypeScript 타입 정의 파일 생성
fs.writeFileSync(
  path.join(OUT, "tokens.d.ts"),
  `export const tokens: Record<string,string>;
export default tokens;`
);
