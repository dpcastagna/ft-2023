import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const data = {
  name: "Batman",
  emotion: "tired"
}

const greet = ({ render }) => {
  render("index.eta", data);
};

const store = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  console.log(params.has("name"))
  if (params.get("name") !== "") {
    data.name = params.get("name")
  };
  if (params.get("emotion") !== "") {
    data.emotion = params.get("emotion")
  };
  response.body = `Waking up, ${data.name} felt ${data.emotion}. ${data.name} had spent most of the previous evening with friends, and recalled that they were writing an application. ${data.name} had an inkling that the application had something to do with brainwaves, but simply could not recall what. The feeling, being ${data.emotion}, must have had something to do with the application.`
  ;
};

router.get("/", greet);
router.post("/", store);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
  app.listen({ port: 7777 });
}

export default app;