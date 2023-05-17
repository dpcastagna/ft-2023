import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import * as ticketService from "./services/ticketService.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const listTickets = async ({ render }) => {
  render("index.eta", { names: await ticketService.findAll() });
};

const addTicket = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  await ticketService.add(params.get("content"));

  response.redirect("/tickets");
};

const resolveTicket = async ({ request, response }) => {
  //const body = request.body();
  //const params = await body.value;
  //console.log(request.url.pathname.split("/")[2])
  const id = request.url.pathname.split("/")[2]
  await ticketService.resolveTicket(id);

  response.redirect("/tickets");
};

const deleteTicket = async ({ request, response }) => {
  //const body = request.body();
  //const params = await body.value;
  console.log(request.url.pathname.split("/")[2])
  const id = request.url.pathname.split("/")[2]
  await ticketService.deleteTicket(id);

  response.redirect("/tickets");
};
router.get("/tickets", listTickets);
router.post("/tickets/:id/resolve", resolveTicket);
router.post("/tickets/:id/delete", deleteTicket);
router.post("/tickets", addTicket);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;