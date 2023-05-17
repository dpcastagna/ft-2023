/*import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();
const router = new Router();

const data = {
    "secret": "",
}

const hello = async ({ request, response, params }) => {
  const body = request.body({ type: "json" });
  //console.log(params);
  const secret = params.secret;
  data.secret = secret;
  response.body = data;
};

router.get("/secret/:secret", hello);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;*/

import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();
const router = new Router();

const data = {
    "secret": "",
}

const hello = async ({ request, response, params }) => {
  const body = request.body({ type: "json" });
  const content = await body.value;
  console.log(body, content);
  //const secret = params.secret;
  //data.secret = secret;
  response.body = content;
};

router.post("/", hello);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;

