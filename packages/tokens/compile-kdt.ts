import fs from "node:fs";
import path from "node:path";

type Cond = Record<string, string | "*">;

const SRC = path.resolve("src/tokens.kdt");
const OUT = path.resolve("src/tokens.json"); // Style Dictionary가 읽는 파일

const lines = fs.readFileSync(SRC, "utf8").split(/\r?\n/);

let defaultCond: Cond = { theme: "light", contrast: "*" };

const scale: Record<
  string,
  { byCond: Record<string, string>; desc?: string; type: "scale" | "static" }
> = {};
const semantic: Record<
  string,
  { refs: { token: string; cond?: Cond }[]; desc?: string }
> = {};

function parseCond(s?: string): Cond | undefined {
  if (!s) return;
  const m = s.match(/\((.+)\)/);
  if (!m) return;
  const pairs = m[1]!
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const c: Cond = {};
  for (const p of pairs) {
    const [k, v] = p.split("=").map((x) => x.trim());
    if (k) {
      c[k] = (v ?? "*") as any;
    }
  }
  return c;
}

function keyWithCond(k: string, cond?: Cond) {
  const c = cond ?? defaultCond;
  return `${k}::${Object.entries(c)
    .map(([k, v]) => `${k}=${v}`)
    .sort()
    .join(",")}`;
}

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i]?.trim();
  if (!raw || raw.startsWith("#")) continue;

  // macros
  if (raw.startsWith("%KDT:scale")) {
    const c = parseCond(raw.substring("%KDT:scale".length));
    if (c) defaultCond = c;
    continue;
  }
  if (raw.startsWith("%KDT:deprecate")) continue; // no-op

  // description
  if (raw.startsWith("$") && raw.includes("??")) {
    const [tok, desc] = raw.split("??").map((s) => s.trim());
    if (tok) {
      const key = tok.split(" ")[0];
      if (key) {
        (tok.startsWith("$semantic")
          ? (semantic[key] ||= { refs: [] })
          : (scale[key] ||= {
              byCond: {},
              type: tok.startsWith("$static") ? "static" : "scale",
            })
        ).desc = desc;
      }
    }
    continue;
  }

  // bindings
  if (raw.startsWith("$") && raw.includes("->")) {
    const [lhs, rhs] = raw.split("->").map((s) => s.trim());
    if (!lhs || !rhs) continue;

    // LHS may be $scale(theme=dark).color.gray-100 / $semantic.color.background
    const m =
      lhs.match(/^\$(scale|static)(\([^)]+\))?\.(.+)$/) ||
      lhs.match(/^\$semantic\.(.+)$/);
    if (!m) continue;

    if (lhs.startsWith("$semantic")) {
      const name = m[1]; // e.g. color.background or component.button.primary.bg:hover
      if (name) {
        (semantic[name] ||= { refs: [] }).refs.push({ token: rhs });
      }
    } else {
      const kind = m[1] as "scale" | "static";
      const cond =
        parseCond(m[2] ?? "") ?? (kind === "scale" ? defaultCond : undefined);
      const name = m[3]; // e.g. color.gray-100
      if (name) {
        const k = `${kind}.${name}`;
        (scale[k] ||= { byCond: {}, type: kind }).byCond[
          keyWithCond("cond", cond)
        ] = rhs;
      }
    }
  }
}

// ---- emit minimal DTCG-ish JSON (flat) + we keep semantic references as CSS var names
function toCssVar(name: string) {
  return "--ds-" + name.replace(/\./g, "-").replace(/:+/g, "-");
}

const out: any = {
  $schema: "https://design-tokens.org/schemas/aliases.json",
  color: {},
  opacity: {},
  font: { size: {}, weight: {}, lineHeight: {}, family: {} },
  component: {},
  typography: {},
};

function selectValue(byCond: Record<string, string>, theme: "light" | "dark") {
  // pick the most specific that matches theme; defaultCond contrast=*
  const entries = Object.entries(byCond);
  // find exact theme match first, fallback to *
  const exact = entries.find(([k]) => k.includes(`theme=${theme}`));
  return (exact ?? entries[0])?.[1];
}

for (const [full, rec] of Object.entries(scale)) {
  const [, ...nameParts] = full.split(".");
  if (nameParts.length < 2) {
    continue;
  }

  const group = nameParts[0];
  const tokenName = nameParts.slice(1).join(".");

  if (!group || !tokenName) {
    continue;
  }

  // We only need to carry raw scale for both themes; CSS stage will emit two theme blocks.
  const bucket = (out[group] ||= {});
  bucket[tokenName] = {
    value:
      rec.type === "static"
        ? Object.values(rec.byCond)[0]
        : {
            light: selectValue(rec.byCond, "light"),
            dark: selectValue(rec.byCond, "dark"),
          },
  };
}

// semantic → we’ll output to “semantic.*” so Style Dictionary -> CSS vars easily
const semOut: any = {};
for (const [name, s] of Object.entries(semantic)) {
  semOut[name] = { value: s.refs.map((r) => r.token) }; // keep list of refs; CSS stage will resolve to var()
}
out.semantic = semOut;

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log("KDT compiled ->", OUT);
