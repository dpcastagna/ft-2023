import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

const getGame = async ({ params, response }) => {
  response.body = (await sql`SELECT id, name FROM games WHERE id = ${params.id}`)[0];
};

const getGames = async ({ response }) => {
  response.body = await sql`SELECT * FROM games`;
};

const addGame = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await sql`INSERT INTO games (name) VALUES (${document.name})`;

  response.body = { status: "success" };
};

const addRating = async ({ params, request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const gameIsInDB = (await sql`SELECT id, name FROM games WHERE id = ${params.id}`).length > 0;
  //console.log(gameIsInDB);

  if (gameIsInDB) {
    await sql`INSERT INTO ratings (rating, game_id) VALUES (${document.rating}, ${params.id})`;

    response.body = { status: "success" };
  } else {
    response.body = { status: "failure" };
  }
};

const getRatings = async ({ params, response }) => {
  //console.log(params);
  response.body = await sql`SELECT * FROM ratings WHERE game_id = ${params.id}`;
};

const removeGame = async ({ params, response }) => {
  console.log(params);
  await sql`DELETE FROM ratings WHERE game_id = (${params.id})`;
  await sql`DELETE FROM games WHERE id = (${params.id})`;

  response.body = { status: "success" };
};

router.get("/games", getGames);
router.get("/games/:id", getGame);
router.get("/games/:id/ratings", getRatings);
router.post("/games", addGame);
router.post("/games/:id/ratings", addRating);
router.delete("/games/:id", removeGame);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
