import { styleText } from "node:util";
import { ABOUT, ROOT, STATS } from "../titles";
import { preRenderApp } from "./pre-render";

const PAGES = [
  ["/about", "dist/about.html", ABOUT],
  ["/stats", "dist/stats.html", STATS],
  ["/", "dist/index.html", ROOT],
];

async function main() {
  console.log(styleText("magenta", "Generating static pages"));
  const templateFile = Bun.file("dist/_index.html");
  if (!(await templateFile.exists())) {
    const sourceFile = Bun.file("dist/index.html");
    await Bun.write(templateFile, await sourceFile.text());
  }

  const templateHtml = await Bun.file("dist/_index.html").text();
  if (!templateHtml) throw new Error("templateFile is empty");

  for (const [path, dest, title] of PAGES) {
    const pageHtml = await preRenderApp(templateHtml, path, title);
    await Bun.file(dest).write(pageHtml);
    console.log(
      styleText("green", `Generated ${dest} for ${path} with title: ${title}`),
    );
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
