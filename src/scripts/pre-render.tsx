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
  html: string,
  path: string,
  title: string,
) => {
  const AppRoutes = await getAppRoutes();

  const reactHtml = renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  );

  return html
    .replace("<!--ssg-outlet-->", reactHtml)
    .replace(/<title>.*<\/title>/, `<title>${title}</title>`);
};
