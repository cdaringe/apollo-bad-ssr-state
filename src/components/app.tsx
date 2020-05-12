import { ApolloProvider, ApolloClient } from "@apollo/client";
import { Helmet } from "react-helmet";
import * as React from "react";
import { hydrate } from "react-dom";
import { StaticRouter, BrowserRouter, Route } from "react-router-dom";
import { createClient } from "../client";
import { Submissions } from "./submissions";

const isBrowser = !(typeof window === "undefined");
export const App = ({
  client,
  url,
  mutableRouterContext,
}: {
  client: ApolloClient<any>;
  url?: string;
  mutableRouterContext?: any;
}) => {
  const Router = url
    ? ({ children }) => (
        <StaticRouter
          location={url}
          context={mutableRouterContext}
          children={children}
        />
      )
    : ({ children }) => <BrowserRouter children={children} />;
  return (
    <Router>
      <ApolloProvider client={client}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/styles/sakura.css" />
          <link rel="stylesheet" href="/styles/tachyons.min.css" />
          <link rel="stylesheet" type="text/css" href="/styles/index.css" />
        </Helmet>
        <Submissions />
      </ApolloProvider>
    </Router>
  );
};

if (isBrowser) {
  hydrate(
    <App client={createClient((window as any).__APOLLO_STATE__)} />,
    document.getElementById("app")!
  );
}
