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

  const aboutHtml = await preRenderApp(templateHtml, "/about", ABOUT);
  await Bun.file("dist/about.html").write(aboutHtml);

  const statsHtml = await preRenderApp(templateHtml, "/stats", STATS);
  await Bun.file("dist/stats.html").write(statsHtml);

  const rootHtml = await preRenderApp(templateHtml, "/", ROOT);
  await Bun.file("dist/index.html").write(rootHtml);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
