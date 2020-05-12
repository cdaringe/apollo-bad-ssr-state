import { createClient } from "../client";
import { getDataFromTree } from "@apollo/react-ssr";
import { isHtmlRenderRequest } from "../util/headers";
import { App } from "../components/app";
import { Helmet } from "react-helmet";
import { RequestHandler } from "express";
import ReactDOMServer from "react-dom/server";

export const ssrMiddleware: RequestHandler = async (req, res, next) => {
  const { accept } = req.headers;
  if (!isHtmlRenderRequest(accept)) {
    return next();
  }
  const mutableRouterContext = {};
  const client = createClient();
  debugger; // kick off react async render cycle
  const app = App({
    client,
    url: req.url,
    mutableRouterContext,
  });
  // play once, useQuery => { loading: true }
  // play again, useQuery => { loading: false } occurs, then we complete `getDataFromTree`
  // finally, getDataFromTree will settle...
  debugger;
  await getDataFromTree(app);
  debugger; // and the last observed state was a good state!
  // now, when we call renderToString, useQuery => { loading: true } occurs again
  // in apollo client, even though or data has already been fetched. how do we
  // prevent { loading: true } in this final render cycle?
  const rendered = ReactDOMServer.renderToString(app);
  const helmet = Helmet.renderStatic();
  const initialState = client.extract();
  const serializedInitialState = JSON.stringify(initialState);
  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        ${rendered}
        <script>window.__APOLLO_STATE__ = ${serializedInitialState};</script>
      </body>
    </html>`;
  return next(res.end(html));
};
