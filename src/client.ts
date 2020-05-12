import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloClientOptions } from "@apollo/client";
import fetch from "node-fetch";

export const createClient: <S = unknown, I = unknown>(
  initialState?: I,
  opts?: ApolloClientOptions<any>
) => ApolloClient<S> = (initialState, opts) => {
  const uri = "http://localhost:3000/graphql"; // lazy, poc!
  const httpLink = new HttpLink({
    uri,
    fetch,
  });
  const cache = new InMemoryCache().restore(initialState || {});
  const client = new ApolloClient({
    cache,
    ssrMode: typeof window === "undefined",
    link: httpLink,
    ...opts,
  });
  return client;
};
