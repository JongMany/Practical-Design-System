import StyleDictionary from "style-dictionary";
import fs from "node:fs";
import path from "node:path";

// 토큰 소스 파일과 출력 디렉토리 설정
const SRC = path.join(process.cwd(), "src", "tokens.json");
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

// ES 모듈 포맷터 등록
StyleDictionary.registerFormat({
  name: "ds/esm",
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.reduce(
      (acc, token) => {
        const path = token.path.join(".");
        acc[path] = token.value;
        return acc;
      },
      {} as Record<string, any>
    );

    return `export const tokens = ${JSON.stringify(tokens, null, 2)};
export default tokens;`;
  },
});

// CommonJS 모듈 포맷터 등록
StyleDictionary.registerFormat({
  name: "ds/cjs",
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.reduce(
      (acc, token) => {
        const path = token.path.join(".");
        acc[path] = token.value;
        return acc;
      },
      {} as Record<string, any>
    );

    return `module.exports = ${JSON.stringify(tokens, null, 2)};`;
  },
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
    // ES 모듈로 내보내기
    esm: {
      transforms: ["attribute/cti", "name/kebab"],
      buildPath: OUT + "/",
      files: [
        {
          destination: "tokens.mjs",
          format: "ds/esm",
        },
      ],
    },
    // CommonJS 모듈로 내보내기
    cjs: {
      transforms: ["attribute/cti", "name/kebab"],
      buildPath: OUT + "/",
      files: [
        {
          destination: "tokens.cjs",
          format: "ds/cjs",
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
const generateTypeDefinitions = () => {
  // 토큰 소스 파일을 직접 읽어서 타입 정의 생성
  const tokensSource = JSON.parse(fs.readFileSync(SRC, "utf-8"));

  const flattenTokens = (obj: any, prefix = ""): string[] => {
    const keys: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && "value" in value) {
        keys.push(fullKey);
      } else if (typeof value === "object" && value !== null) {
        keys.push(...flattenTokens(value, fullKey));
      }
    }
    return keys;
  };

  const tokenKeys = flattenTokens(tokensSource);

  const typeDefinition = `export interface Tokens {
${tokenKeys.map((key) => `  "${key}": string;`).join("\n")}
}

export const tokens: Tokens;
export default tokens;`;

  return typeDefinition;
};

// TypeScript 타입 정의 파일 생성
const typeDefinition = generateTypeDefinitions();
fs.writeFileSync(path.join(OUT, "tokens.d.ts"), typeDefinition);
