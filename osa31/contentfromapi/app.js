import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { serveStaticFiles } from "./middlewares/serveStaticMiddleware.js";

const app = new Application();
const router = new Router();

app.use(errorMiddleware);
app.use(renderMiddleware);
app.use(serveStaticFiles);

const showIndex = ({ render }) => {
  render("index.eta");
};

const apiMagic = ({ response }) => {
  response.body = { magic: "Abracadabra" };
};

router.get("/", showIndex);
router.get("/api/magic", apiMagic);

app.use(router.routes());

app.listen({ port: 7777 });
