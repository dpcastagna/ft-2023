import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.0.5/mod.ts";
//import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(Session.initMiddleware());
//app.use(renderMiddleware);

const showData = async ({request, response, state, render }) => {
  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }

  let name = await state.session.get("name");
  //console.log(name)//, state.session)
  if (!name) {
    name = "anonymous";
  }

  //render("index.eta", { items: items, name: name });
  response.body =`Hello ${name}!`;
  //console.log("showData", response.body, name)//, state.session);
};

const addData = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }
  
  items.push(params.get("data"));
  //console.log("items", items)
  await state.session.set("items", items);

  let name = await state.session.get("name");
  if (!name) {
    name = "anonymous";
  }
  //console.log("paramsget name", params.get("name"))
  //let name = params.get("name");
  await state.session.set("name", params.get("name"));
  //console.log("addData", await state.session.get("name"))

  response.redirect("/");
};

router.get("/", showData);
router.post("/", addData);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
    app.listen({ port: 7777 });
  }
  
  export default app;