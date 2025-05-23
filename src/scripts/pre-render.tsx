import type { CheerioAPI } from "cheerio";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

const getAppRoutes = async () => {
  const { default: AppRoutes } = await vite.ssrLoadModule("/src/AppRoutes");
  return AppRoutes;
};

export const preRenderApp = async (
  $: CheerioAPI,
  path: string,
  title: string,
) => {
  const AppRoutes = await getAppRoutes();

  const reactHtml = renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  );

  $("#root").html(reactHtml);
  $("title").text(title);
};
