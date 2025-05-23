import { styleText } from "node:util";
import * as cheerio from "cheerio";
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
  const $ = cheerio.load(templateHtml);
  const links = $('link[rel="stylesheet"]').map((_, el) => {
    const $el = $(el);
    const href = $el.attr("href");
    if (href?.endsWith(".css") && href.startsWith("/")) {
      return { $el, href };
    }
  });
  for (const { $el, href } of links) {
    const cssFile = Bun.file(`dist${href}`);
    if (await cssFile.exists()) {
      const css = await cssFile.text();
      let inlineCss = css.replace(/@charset "UTF-8"/i, "");
      if (inlineCss.startsWith(";")) {
        inlineCss = inlineCss.slice(1);
      }
      $("head").append($("<style>").html(inlineCss));
      $el.remove();
    }
  }

  for (const [path, dest, title] of PAGES) {
    await preRenderApp($, path, title);
    await Bun.file(dest).write($.html());
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
