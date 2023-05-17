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
    console.log("-- body");
    console.log(body);
  
    // similar to previous, we need to read the content --
    // this is done again by calling await on the value variable in the body
  
    // in the case of oak and form-data, the response is a
    // form data reader
    const reader = await body.value;
    console.log("-- reader");
    console.log(reader);
  
    // to read data using a form data reader, we call its asynchronous
    // read function
    const data = await reader.read();
  
    // the data object has two variables: fields and files
    console.log("-- data");
    console.log(data);
  
    // in our case, our form allows submitting only one file, so we
    // look at the details of that file
    const fileDetails = data.files[0];
  
    // the file details contains relevant information about the file,
    // including a temporary folder path into which the file has been stored
    console.log("-- file details");
    console.log(fileDetails.contentType);
  
    // the temporary file path is in the filename attribute
    response.body = `Sent a file called ${fileDetails.contentType}`;
};

router.get("/", showForm);
router.post("/", processUpload);

app.use(router.routes());
app.listen({ port: 7777 });
