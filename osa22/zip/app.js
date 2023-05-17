import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(router.routes());

app.listen({ port: 7777 });

if (!Deno.env.get('TEST_ENVIRONMENT')) {
  app.listen({ port: 7777 });
}

export default app;