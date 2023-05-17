import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const getSongs = async () => {
  return await sql`SELECT * FROM songs`;
};

const addSong = async (name, rating) => {
  console.log(name, rating);
  await sql`INSERT INTO songs(name, rating) VALUES (${name}, ${rating})`;
}

const showForm = async ({ render }) => {
  render("index.eta", { songs: await getSongs(), name: "", rating: "" });
};

const submitForm = async  ({ request, response, render }) => {
  const body = request.body();
  const params = await body.value;

  const errorData = {
    errors: [],
    name: "",
    rating: "",
    songs: await getSongs(), name: "", rating: ""
  };

  const name = params.get("name");
  const rating = params.get("rating");

  if (name && name.length < 5 || name.length > 20) {
    errorData.errors.push("Song name must be between 5 and 20 characters long");
    errorData.name = name;
    errorData.rating = rating;
  }

  if (rating) {
    if (rating.match(/[a-z]/)) {
      errorData.errors.push("Rating must be a number between 1 and 10");
        errorData.rating = rating;
        errorData.name = name;
    } else if (rating < 1 || rating > 10) {
      errorData.errors.push("Rating must be a number between 1 and 10");
      errorData.rating = rating;
      errorData.name = name;
    }
  }
  console.log(errorData);

  if (errorData.errors.length > 0) {
    render("index.eta", errorData);
  } else {
    await addSong(name, rating);
    response.redirect("/");
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
