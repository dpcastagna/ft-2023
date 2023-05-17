import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { serveStaticFiles } from "./middlewares/serveStaticMiddleware.js";
//import { log } from "./middlewares/loggingMiddleware.js"
//import { time } from "./middlewares/timerMiddleware.js"
const app = new Application();

const hello = ({ response, request }) => {
  response.body = "Hello world!";
};

app.use(serveStaticFiles);
app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
