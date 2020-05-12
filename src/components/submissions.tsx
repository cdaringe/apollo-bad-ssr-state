import React from "react";
import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query {
    hn2 {
      nodeFromHnId(id: "cdaringe", isUserId: true) {
        id
        ... on HackerNewsV2User {
          submitted(first: 5) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              cursor
              node {
                id
                ... on HackerNewsV2Story {
                  score
                  url
                }
                ... on HackerNewsV2Comment {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const Submissions: React.FC<any> = (props: any) => {
  const { loading, error, data } = useQuery(query);
  debugger; // observe these values cycle over time ^
  if (loading) return <pre>loading</pre>;
  if (error) return <pre>{error?.message || "ERROR :("}</pre>;

  return (
    <div className="flex flex-column flex-wrap items-center justify-center center mw9 mt5">
      <div className="flex flex-wrap">
        <div className="w-40 ml3 pa-1">
          <pre className="f2">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
