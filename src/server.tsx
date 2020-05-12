import express from "express";
import { createMiddlewares } from "./middlewares";
import fetch from "node-fetch";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // just for demo ;)

const { PORT } = process.env;

const port = PORT ? parseInt(PORT) : 3000;
const app = express();
app.use("/graphql", async (req, res, next) => {
  // fake reverse proxy as graphqlhub is giving me some trouble
  // mega hacks. just hardcode a known working query ;)
  res.type("json");
  return res.end(
    JSON.stringify({
      data: {
        hn2: {
          nodeFromHnId: {
            id: "SGFja2VyTmV3c1YyVXNlcjpjZGFyaW5nZQ==",
            submitted: {
              pageInfo: {
                hasNextPage: true,
                endCursor: "YXJyYXljb25uZWN0aW9uOjQ=",
              },
              edges: [
                {
                  cursor: "YXJyYXljb25uZWN0aW9uOjA=",
                  node: {
                    id: "aXRlbToyMzA4MjMzMQ==",
                    score: 5,
                    url: "https://cdaringe.github.io/rad/",
                  },
                },
                {
                  cursor: "YXJyYXljb25uZWN0aW9uOjE=",
                  node: {
                    id: "aXRlbToyMjg4NjIwNg==",
                    text:
                      'I made <a href="https:&#x2F;&#x2F;dvd.js.org&#x2F;" rel="nofollow">https:&#x2F;&#x2F;dvd.js.org&#x2F;</a> as a fun way to select standup order. If you add a ?names query, each time it hits a corner, a name is selected. Each time an edge is hit, the circularly linked list rotates individuals&#x27; names around the edges of the rectangle. Of course you don&#x27;t want to wait ten days for all names to be selected, so the rectangle shrinks to expedite the process :). Example url: <a href="https:&#x2F;&#x2F;dvd.js.org&#x2F;?names=chaz,tina,stacy,tiffany,rider" rel="nofollow">https:&#x2F;&#x2F;dvd.js.org&#x2F;?names=chaz,tina,stacy,tiffany,rider</a>',
                  },
                },
                {
                  cursor: "YXJyYXljb25uZWN0aW9uOjI=",
                  node: {
                    id: "aXRlbToyMjUyMDIyMw==",
                    text: "10&#x2F;10 great work",
                  },
                },
                {
                  cursor: "YXJyYXljb25uZWN0aW9uOjM=",
                  node: {
                    id: "aXRlbToyMjIxODA0Mw==",
                    text:
                      "Because doing so would be hard for shell scripts to express.  real functions, try&#x2F;catch, and other common language features are not often part of shell languages.  As such, the generated code may not support many features you typed in &lt;other lang&gt; and&#x2F;or the generated code would bundle a runtime with it to emulate what we&#x27;d otherwise consider pragmatic scripting feature support.",
                  },
                },
                {
                  cursor: "YXJyYXljb25uZWN0aW9uOjQ=",
                  node: {
                    id: "aXRlbToyMjIxMzk0NQ==",
                    text:
                      "Amen.<p>deno, node, python, julia--anything but shell scripting.",
                  },
                },
              ],
            },
          },
        },
      },
    })
  );
});
for (const middleware of createMiddlewares()) {
  app.use(middleware);
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
