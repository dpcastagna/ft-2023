import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.0.5/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();
app.use(Session.initMiddleware());

app.use(renderMiddleware);

const showMain = async ({request, response, state, render }) => {
  const authenticated = await state.session.get("authenticated");
  if (authenticated) {
    //response.body = "Authenticated";
    render("secret.eta");
  } else {
    //response.body = "Not authenticated";
    render("index.eta");
  }
  
};

const authenticate = async ({ request, response, state }) => {
  const authenticated = await state.session.get("authenticated");

  if (!authenticated) {
    const body = request.body();
    const params = await body.value;

    //const username = params.get("username")
    const password = params.get("password");
    if ( password === "hippopotamus") {
      await state.session.set("authenticated", true);
      //response.redirect("/");
      response.body = "Authentication successful.";
    } else {
      //response.status = 401;
      response.body = "Wrong password.";
    }
  } 
};

router.get("/", showMain);
router.post("/", authenticate);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
