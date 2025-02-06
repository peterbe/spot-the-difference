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

export const SNIPPETS = new Map<string, Snippet>();
// --------------------------------------------------------------------------
SNIPPETS.set("untitled1", {
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
});
// --------------------------------------------------------------------------

SNIPPETS.set(" untitled2", {
  category: CATEGORIES.CSS,
  text: `
:root:not([data-theme=dark]) {
  --pico-text-selection-color: rgba(244, 93, 44, 0.25);
  --pico-primary: #bd3c13;
  --pico-primary-background: #d24317;
  --pico-primary-underline: rgba(189, 60, 19, 0.5);
}
`.trim(),
});

// --------------------------------------------------------------------------

SNIPPETS.set("untitled3", {
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
});

// --------------------------------------------------------------------------

SNIPPETS.set("scripts", {
  category: CATEGORIES.JSON,
  text: `
  "scripts": {
    "dev": "bunx --bun vite",
    "build": "bunx --bun vite build",
    "lint": "eslint .",
    "preview": "bunx --bun vite preview"
  },`.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("justfile", {
  category: CATEGORIES.MAKE,
  text: `
dev:
    bun run dev -- --port 3000

build:
    bun run build

start: build
    bun run preview -- --port 3000
    `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("reactRouterRoute", {
  category: CATEGORIES.JSX,
  text: `
<Route
  path="/concerts/:city"
  element={<City />} />
    `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("rustHelloWord", {
  category: CATEGORIES.RUST,
  text: `
// Hello world in Rust

fn main() {
    println!("Hello World!");
}
    `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("brainfunHelloWord", {
  category: CATEGORIES.BRAINFUN,
  text: `
++++++++++[>+++++++>++++++++++>+++<<<-]>++.>+.+++++++
..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.
    `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("cHelloWord", {
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
});
// --------------------------------------------------------------------------
SNIPPETS.set("htmlHelloWord", {
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
});

// --------------------------------------------------------------------------
SNIPPETS.set("typescripttype1", {
  category: CATEGORIES.TYPE_SCRIPT,
  text: `
export type Challenge = {
  snippet: Snippet;
  snippetArr: string[];
  differenceArr: string[];
  challenge: SnippetChallenge;
};
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("temperaturePython1", {
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
});
// --------------------------------------------------------------------------
SNIPPETS.set("temperatureTypescript1", {
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
});
// --------------------------------------------------------------------------
SNIPPETS.set("temperatureGo2", {
  category: CATEGORIES.GO,
  text: `
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
    `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("temperatureRuby1", {
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
});
// --------------------------------------------------------------------------
SNIPPETS.set("isMirrorRust", {
  category: CATEGORIES.RUST,
  text: `
fn is_mirror(a: i8, b: i8) -> bool {
    let a = massage(a);
    let b = reverse_string(massage(b));
    a == b
}
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("useEffectJS", {
  category: CATEGORIES.JAVA_SCRIPT,
  text: `
useEffect(() => {
  fetch('/api/some/thing')
    .then(r => r.json())
    .then(data => setStuff(data)
    .catch(err => setError(err))
}, [])
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("keysJS", {
  category: CATEGORIES.JAVA_SCRIPT,
  text: `
const keys = Object.keys(person)
const len = keys.length
const randomKey = keys[Math.floor(Math.random() * len)]
const value = person[randomKey]
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("selectStatsSQL", {
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
});
// --------------------------------------------------------------------------
SNIPPETS.set("getResultsPy", {
  category: CATEGORIES.PYTHON,
  text: `
def get_results(queryset, fields, size):
    count = queryset.count()
    results = []
    for record in queryset.values(*fields)[:size]
        results.append(record)
    return {"count": count, "results": results}
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("readCompressedJs", {
  category: CATEGORIES.JAVA_SCRIPT,
  text: `
export function readCompressedJsonFile(path) {
  return JSON.parse(
    brotliDecompressSync(readFileSync(path))
  )
}
      `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("isKeyOfObject", {
  category: CATEGORIES.TYPE_SCRIPT,
  text: `
function isKeyOfObject<T extends object>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}
      `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("functionF", {
  category: CATEGORIES.JAVA_SCRIPT,
  text: `
async function f(fp, effort) {
  const originalBuffer = await fs.readFile(fp);
  const image = sharp(originalBuffer);
  const { width } = await image.metadata();
  const buffer = await webp({ effort }).toBuffer();
  return [buffer.length, width, { effort }];
}
      `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("copyJS", {
  category: CATEGORIES.JAVA_SCRIPT,
  text: `
const original = {foo: "Foo"}
const copy = Object.assign({}, original)
copy.foo = "Bar"
console.log([original.foo, copy.foo])
      `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("parseCsvBun", {
  category: CATEGORIES.TYPE_SCRIPT,
  text: `
const text = await file.text()
const csv = parse(text, { header: true }) as Rec[]
for (const row of csv) {
  numbers.push(parseInt(row["Pageviews"] || "0"))
}
      `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("hintOverlay", {
  category: CATEGORIES.CSS,
  text: `
.hintOverlay {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.07);
  pointer-events: none;
}     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("cssBody", {
  category: CATEGORIES.CSS,
  text: `
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("ulGithubjsx", {
  category: CATEGORIES.JSX,
  text: `
<ul>
  <li>
    <ul>
      <li>.github/</li>
      <li>source/</li>
      <li>test/</li>
    </ul>
  </li>
  <li>.gitignore</li>
  <li>README.md</li>
</ul>
     `.trim(),
});
// --------------------------------------------------------------------------
SNIPPETS.set("biomeconfig", {
  category: CATEGORIES.JSON,
  text: `
{
  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false,
    "ignore": []
  }
}
     `.trim(),
});

// --------------------------------------------------------------------------
SNIPPETS.set("rubyDogClass", {
  category: CATEGORIES.RUBY,
  text: `
class Dog
  def set_name(a_name)
    @name = a_name
  end
end
     `.trim(),
});

for (const [id, snippet] of SNIPPETS) {
  snippet.text = snippet.text.trim();
  // Check that the code isn't too long
  const lines = snippet.text.split("\n");
  lines.forEach((line, i) => {
    if (line.length > 55) {
      console.log(
        `Line ${i + 1} in ${id} is too long. It is ${
          line.length
        } characters long`,
      );
    }
  });
}

if (import.meta.env.VITE_TEST) {
  SNIPPETS.clear();
  SNIPPETS.set("test1", {
    category: CATEGORIES.PYTHON,
    text: `
def foo():
  return "bar"
       `.trim(),
  });
  SNIPPETS.set("test2", {
    category: CATEGORIES.RUBY,
    text: `
def foo():
  "bar"
end
       `.trim(),
  });
}
