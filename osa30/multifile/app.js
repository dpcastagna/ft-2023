import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta");
};

const processUpload = async ({ request, response }) => {
    const body = request.body({ type: "form-data" });
    
    const reader = await body.value;
    
    const data = await reader.read();
    //console.log(data)
    //const fileDetails = data.files[0];

    response.body = data.files.length;
};

router.get("/", showForm);
router.post("/", processUpload);

app.use(router.routes());
app.listen({ port: 7777 });
