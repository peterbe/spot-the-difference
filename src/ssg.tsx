import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppRoutes from "./AppRoutes";

export default function ssgRender(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>,
  );
}
