export type Snippet = {
  category: string;
  text: string;
};

const CATEGORIES = {
  JSX: "JSX",
  CSS: "CSS",
  JSON: "JSON",
  MAKE: "Make",
  RUST: "Rust",
  BRAINFUN: "Brainfun",
  C: "C",
  HTML: "HTML",
  GO: "Go",
  TYPE_SCRIPT: "TypeScript",
  PYTHON: "Python",
  RUBY: "Ruby",
  JAVA_SCRIPT: "JavaScript",
  SQL: "SQL",
};

export const SNIPPETS: {
  [id: string]: Snippet;
} = {
  // --------------------------------------------------------------------------
  untitled1: {
    category: CATEGORIES.JSX,
    text: `
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}
`.trim(),
  },
  // --------------------------------------------------------------------------

  untitled2: {
    category: CATEGORIES.CSS,
    text: `
:root:not([data-theme=dark]) {
  --pico-text-selection-color: rgba(244, 93, 44, 0.25);
  --pico-primary: #bd3c13;
  --pico-primary-background: #d24317;
  --pico-primary-underline: rgba(189, 60, 19, 0.5);
}
`.trim(),
  },

  // --------------------------------------------------------------------------

  untitled3: {
    category: CATEGORIES.JSON,
    text: `
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^9.17.0"
  }
`.trim(),
  },

  // --------------------------------------------------------------------------

  scripts: {
    category: CATEGORIES.JSON,
    text: `
  "scripts": {
    "dev": "bunx --bun vite",
    "build": "tsc -b && bunx --bun vite build",
    "lint": "eslint .",
    "preview": "bunx --bun vite preview"
  },`.trim(),
  },
  // --------------------------------------------------------------------------
  justfile: {
    category: CATEGORIES.MAKE,
    text: `
dev:
    bun run dev -- --port 3000

build:
    bun run build

start: build
    bun run preview -- --port 3000
    `.trim(),
  },
  // --------------------------------------------------------------------------
  reactRouterRoute: {
    category: CATEGORIES.JSX,
    text: `
<Route path="/concerts/:city" element={<City />} />
    `.trim(),
  },
  // --------------------------------------------------------------------------
  rustHelloWord: {
    category: CATEGORIES.RUST,
    text: `
// Hello world in Rust

fn main() {
    println!("Hello World!");
}
    `.trim(),
  },
  // --------------------------------------------------------------------------
  brainfunHelloWord: {
    category: CATEGORIES.BRAINFUN,
    text: `
++++++++++[>+++++++>++++++++++>+++<<<-]>++.>+.+++++++
..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.
    `.trim(),
  },
  // --------------------------------------------------------------------------
  cHelloWord: {
    category: CATEGORIES.C,
    text: `
/* Hello World in C, Ansi-style */

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  puts("Hello World!");
  return EXIT_SUCCESS;
}
     `.trim(),
  },
  // --------------------------------------------------------------------------
  htmlHelloWord: {
    category: CATEGORIES.HTML,
    text: `
<!doctype html>
<html>
<!-- Hello World in HTML -->
<head>
<title>Hello World!</title>
</head>
<body>
Hello World!
</body>
</html>
     `.trim(),
  },

  // --------------------------------------------------------------------------
  typescripttype1: {
    category: CATEGORIES.TYPE_SCRIPT,
    text: `
export type Challenge = {
  snippet: Snippet;
  snippetArr: string[];
  differenceArr: string[];
  challenge: SnippetChallenge;
};
     `.trim(),
  },
  // --------------------------------------------------------------------------
  temperaturePython1: {
    category: CATEGORIES.PYTHON,
    text: `
for i in range(4, 100, 12):
    f = c2f(i)
    if is_mirror(i, math.ceil(f)):
        print_conv(i, math.ceil(f))
    elif is_mirror(i, math.floor(f)):
        print_conv(i, math.floor(f))
    else:
        break
     `.trim(),
  },
  // --------------------------------------------------------------------------
  temperatureTypescript1: {
    category: CATEGORIES.TYPE_SCRIPT,
    text: `
for (let c = 4; c < 100; c += 12) {
  const f = c2f(c);
  if (isMirror(c, Math.ceil(f))) {
    printConversion(c, Math.ceil(f));
  } else if (isMirror(c, Math.floor(f))) {
    printConversion(c, Math.floor(f));
  } else {
    break;
  }
}    `.trim(),
  },
  // --------------------------------------------------------------------------
  temperatureGo1: {
    category: CATEGORIES.GO,
    text: `
func main() {
    for c := 4; c < 100; c += 12 {
        var f = c2f(c)
        if isMirror(c, int(math.Ceil(f))) {
            printConversion(c, int(math.Ceil(f)))
        } else if isMirror(c, int(math.Floor(f))) {
            printConversion(c, int(math.Floor(f)))
        } else {
            break
        }
    }
}
    `.trim(),
  },
  // --------------------------------------------------------------------------
  temperatureRuby1: {
    category: CATEGORIES.RUBY,
    text: `
(4...100).step(12).each do |c|
    f = c2f(c)
    if is_mirror(c, f.ceil)
        print_conv(c, f.ceil)
    elsif is_mirror(c, f.floor)
        print_conv(c, f.floor)
    else
        break
    end
end
    `.trim(),
  },
  // --------------------------------------------------------------------------
  isMirrorRust: {
    category: CATEGORIES.RUST,
    text: `
fn is_mirror(a: i8, b: i8) -> bool {
    let a = massage(a);
    let b = reverse_string(massage(b));
    a == b
}
     `.trim(),
  },
  // --------------------------------------------------------------------------
  useEffectJS: {
    category: CATEGORIES.JAVA_SCRIPT,
    text: `
useEffect(() => {
  fetch('/api/some/thing')
    .then(r => r.json())
    .then(data => setStuff(data)
    .catch(err => setError(err))
}, [])
     `.trim(),
  },
  // --------------------------------------------------------------------------
  keysJS: {
    category: CATEGORIES.JAVA_SCRIPT,
    text: `
const keys = Object.keys(person);
const randomKey = keys[Math.floor(Math.random() * keys.length)];
const value = person[randomKey];
     `.trim(),
  },
  // --------------------------------------------------------------------------
  selectStatsSQL: {
    category: CATEGORIES.SQL,
    text: `
SELECT
  (total_time / 1000 / 60) AS total,
    (total_time/calls) AS avg, calls,
      SUBSTRING(query FROM 0 FOR 250)
      FROM pg_stat_statements
      WHERE calls > 100
      ORDER BY 1 DESC
      LIMIT 25;

     `.trim(),
  },
  // --------------------------------------------------------------------------
  getResultsPy: {
    category: CATEGORIES.PYTHON,
    text: `
def get_results(queryset, fields, size):
    count = queryset.count()
    results = []
    for record in queryset.values(*fields)[:size]
        results.append(record)
    return {"count": count, "results": results}
     `.trim(),
  },
  // --------------------------------------------------------------------------
  readCompressedJs: {
    category: CATEGORIES.JAVA_SCRIPT,
    text: `
export function readCompressedJsonFile(xpath) {
  return JSON.parse(brotliDecompressSync(fs.readFileSync(xpath)))
}
      `.trim(),
  },
  // --------------------------------------------------------------------------
  isKeyOfObject: {
    category: CATEGORIES.TYPE_SCRIPT,
    text: `
function isKeyOfObject<T extends object>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}
      `.trim(),
  },
  // --------------------------------------------------------------------------
  functionF: {
    category: CATEGORIES.JAVA_SCRIPT,
    text: `
async function f(fp, effort) {
  const originalBuffer = await fs.readFile(fp);
  const image = sharp(originalBuffer);
  const { width } = await image.metadata();
  const buffer = await image.webp({ effort }).toBuffer();
  return [buffer.length, width, { effort }];
}
      `.trim(),
  },
  // --------------------------------------------------------------------------
  copyJS: {
    category: CATEGORIES.JAVA_SCRIPT,
    text: `
const original = {foo: "Foo"}
const copy = Object.assign({}, original)
copy.foo = "Bar"
console.log([original.foo, copy.foo])
      `.trim(),
  },
  // --------------------------------------------------------------------------
  parseCsvBun: {
    category: CATEGORIES.TYPE_SCRIPT,
    text: `
const csv = parse(await file.text(), { header: true }) as Rec[];
for (const row of csv) {
  numbers.push(parseInt(row["Pageviews"] || "0"));
}
      `.trim(),
  },
};
