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

// 참조 해결 transform 등록
StyleDictionary.registerTransform({
  name: "ds/resolve-reference",
  type: "value",
  transform: (prop, options) => {
    const value = prop.value;
    if (typeof value === "string" && value.startsWith("$")) {
      // 참조를 실제 값으로 해결
      const refPath = value.replace("$", "").split(".");
      const resolvedValue = options.dictionary.getReference(value);
      return resolvedValue || value;
    }
    return value;
  },
});

// CSS 변수 포맷터 등록 (light + dark 테마 모두 포함)
StyleDictionary.registerFormat({
  name: "ds/css-variables",
  format: ({ dictionary }) => {
    const formatValue = (value: any, theme: "light" | "dark"): string => {
      if (typeof value === "object" && value !== null) {
        if (value[theme] !== undefined) {
          return value[theme];
        }
        if (value.light !== undefined) {
          return value.light; // fallback to light
        }
        return JSON.stringify(value);
      }
      return String(value);
    };

    const lightTokens = dictionary.allTokens
      .map((p) => `  --${p.name}: ${formatValue(p.value, "light")};`)
      .join("\n");

    const darkTokens = dictionary.allTokens
      .map((p) => `  --${p.name}: ${formatValue(p.value, "dark")};`)
      .join("\n");

    return `:root{\n${lightTokens}\n}\n\n:root[data-theme="dark"]{\n${darkTokens}\n}\n`;
  },
});

// Light 테마 CSS 포맷터
StyleDictionary.registerFormat({
  name: "ds/css-light",
  format: ({ dictionary }) => {
    const formatValue = (value: any): string => {
      if (typeof value === "object" && value !== null) {
        if (value.light !== undefined) {
          return value.light;
        }
        return JSON.stringify(value);
      }
      return String(value);
    };

    return `:root{\n${dictionary.allTokens
      .map((p) => `  --${p.name}: ${formatValue(p.value)};`)
      .join("\n")}\n}\n`;
  },
});

// Dark 테마 CSS 포맷터
StyleDictionary.registerFormat({
  name: "ds/css-dark",
  format: ({ dictionary }) => {
    const formatValue = (value: any): string => {
      if (typeof value === "object" && value !== null) {
        if (value.dark !== undefined) {
          return value.dark;
        }
        if (value.light !== undefined) {
          return value.light; // fallback to light
        }
        return JSON.stringify(value);
      }
      return String(value);
    };

    return `:root[data-theme="dark"]{\n${dictionary.allTokens
      .map((p) => `  --${p.name}: ${formatValue(p.value)};`)
      .join("\n")}\n}\n`;
  },
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
      transforms: [
        "attribute/cti",
        "name/kebab",
        "ds/name/css",
        "ds/resolve-reference",
      ],
      buildPath: OUT + "/",
      files: [
        { destination: "tokens.css", format: "ds/css-variables" },
        { destination: "light.css", format: "ds/css-light" },
        { destination: "dark.css", format: "ds/css-dark" },
      ],
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
