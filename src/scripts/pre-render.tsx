import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServer as createViteServer } from "vite";

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

export const preRenderApp = async (
  html: string,
  path: string,
  title: string,
) => {
  const { default: AppRoutes } = await vite.ssrLoadModule("/src/routes");

  const reactHtml = renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  );

  const finalHtml = html
    .replace('<div id="root"></div>', `<div id="root">${reactHtml}</div>`)
    .replace(/<title>.*<\/title>/, `<title>${title}</title>`);

  return finalHtml;
};
