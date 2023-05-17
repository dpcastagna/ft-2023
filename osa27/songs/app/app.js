import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

const getSong = async ({ params, response }) => {
  response.body = (await sql`SELECT id, name, rating FROM songs WHERE id = ${params.id}`)[0];
};

const getSongs = async ({ response }) => {
  response.body = await sql`SELECT * FROM songs`;
};

const addSong = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await sql`INSERT INTO songs (name, rating) VALUES (${document.name}, ${document.rating})`;

  response.body = { status: "success" };
};

const removeSong = async ({ params, response }) => {
  await sql`DELETE FROM songs WHERE id = ${params.id}`;

  response.body = { status: "success" };
};

router.get("/songs", getSongs);
router.get("/songs/:id", getSong);
router.post("/songs", addSong);
router.delete("/songs/:id", removeSong);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
