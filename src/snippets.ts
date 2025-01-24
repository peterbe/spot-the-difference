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
};
