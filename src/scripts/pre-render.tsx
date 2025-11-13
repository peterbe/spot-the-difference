import type { CheerioAPI } from "cheerio";
import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const { default: ssg } = await vite.ssrLoadModule("./src/ssg");

export const preRenderApp = async (
  $: CheerioAPI,
  path: string,
  title: string,
) => {
  const reactHtml = ssg(path);

  $("#root").html(reactHtml);
  $("title").text(title);
};
