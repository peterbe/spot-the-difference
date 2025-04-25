import { ABOUT, ROOT, STATS } from "../titles";
import { preRenderApp } from "./pre-render";

async function main() {
  console.log("Generating static pages");
  const templateFile = Bun.file("dist/_index.html");
  if (!(await templateFile.exists())) {
    const sourceFile = Bun.file("dist/index.html");
    await Bun.write(templateFile, await sourceFile.text());
  }

  const templateHtml = await Bun.file("dist/_index.html").text();
  if (!templateHtml) throw new Error("templateFile is empty");

  const pages = [
    ["/about", "dist/about.html", ABOUT],
    ["/stats", "dist/stats.html", STATS],
    ["/", "dist/index.html", ROOT],
  ];
  for (const [path, dest, title] of pages) {
    const pageHtml = await preRenderApp(templateHtml, path, title);
    await Bun.file(dest).write(pageHtml);
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
