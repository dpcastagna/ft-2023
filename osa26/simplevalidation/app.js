import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  
  render("index.eta");
};

const submitForm = async ({ request, response, render }) => {
  const body = request.body();
  const params = await body.value;
  
  const errorData = {
    errors: [],
    name: "",
    yearOfBirth: "",
  };

  const name = params.get("name");
  const yearOfBirth = params.get("yearOfBirth");
  console.log("number:", yearOfBirth, typeof yearOfBirth, typeof yearOfBirth !== "number")
  if (name && name.length < 4) {
    errorData.errors.push("Invalid name");
    errorData.name = name;
    errorData.yearOfBirth = yearOfBirth;
  }
  if (yearOfBirth) {
    if (yearOfBirth.match(/[a-z]/)) {
        errorData.errors.push("Invalid year of birth");
        errorData.yearOfBirth = yearOfBirth;
        errorData.name = name;
    } else if (yearOfBirth < 1900 || yearOfBirth > 2000) {
        errorData.errors.push("Year of birth should be between 1900 and 2000");
        errorData.yearOfBirth = yearOfBirth;
        errorData.name = name;
    }
  }
  console.log(errorData);
  if (errorData.errors.length > 0) {
    console.log("errors: ", errorData.errors);
    render("index.eta", errorData);
  } else {
    render("index.eta");
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
