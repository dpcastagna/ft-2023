import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { validate, minLength, required, isNumeric, minNumber, maxNumber } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const validationRules = {
  name: [required, minLength(4)],
  yearOfBirth: [required, isNumeric, minNumber(1900), maxNumber(2000)],
};

const getData = async (request) => {
  const data = {
    name: "",
    yearOfBirth: "",
    errors: {},
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
    data.yearOfBirth = Number(params.get("yearOfBirth"));
  }

  return data;
};

const showForm = ({ render }) => {
  render("index.eta", { errors: [], name: "", yearOfBirth: "" });
};

const submitForm = async ({ request, response, render }) => {
  const data = await getData(request);
  const [passes, errors] = await validate(data, validationRules, { 
    messages: {
      "name": "Invalid name",
      "yearOfBirth.isNumeric": "Invalid year of birth",
      "yearOfBirth.minNumber": "Year of birth should be between 1900 and 2000",
      "yearOfBirth.maxNumber": "Year of birth should be between 1900 and 2000",
  }});
  if (!passes) {
    data.errors = errors;
    console.log(data, passes, errors);
    render("index.eta", data);
  } else {
    // data was ok, could store it
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
