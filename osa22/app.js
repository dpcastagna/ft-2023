/*import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = new Application();
const router = new Router();

const get = ({ response }) => {
  response.body = "GET request";
};

const post = ({ response }) => {
  response.body = "POST request";
};

const put = ({ response }) => {
  response.body = "PUT request";
};

const key = ({ request, response }) => {
  console.log(request.params)
  response.body = request.params.value;
};

const sum = ({ request, response }) => {
  response.body = "Hello!";
};

const requestParamId = ({ request, response }) => {
  if (request.url.searchParams.has("number1") && request.url.searchParams.has("number2")) {
    response.body = Number(request.url.searchParams.get("number1")) + 
                    Number(request.url.searchParams.get("number2"));
  } else {
    response.body = "Invalid parameters.";
  }
};

//router.get("/?number1&number2", sum);
//router.get("/key/:value", key);
router.get("/", get)
  .post("/", post)
  .put("/", put);

app.use(errorMiddleware);
app.use(requestParamId);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
    app.listen({ port: 7777 });
  }

export default app;

import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(router.routes());

app.listen({ port: 7777 });*
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
app.use(renderMiddleware);
const router = new Router();

const data = {
  name: "",
  emotion: ""
};

const greet = (context) => {
  //console.log(context.params)
  data.name = context.params.name;
  data.emotion = context.params.emotion;
  context.render("index.eta", data);
};

router.get("/name/:name/emotion/:emotion", greet);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
*/
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const router = new Router();

const get = ({ response }) => {
  response.body = "Look at";
};

const post = ({ response }) => {
  response.body += " the code";
};

const del = ({ response }) => {
  response.body += " carefully!";
};

router.get("/", get)
  .get("/", post)
  .get("/", del);

app.use(router.routes());

app.listen({ port: 7777 });