import { lastUploadedId, uploadNewFile, retrieveFile } from "../../services/fileService.js";
import { send } from "https://deno.land/x/oak@v11.1.0/mod.ts";
const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const sendFile = async ({ render, request, response }) => {
  const body = await request.body({ type: "form-data" });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];
  
  // console.log('filedetails: ',fileDetails, 'data: ', data);
  // console.log('filecontents: ', fileContents);

  const pass = await uploadNewFile(fileDetails);
  response.body = pass;
};

const getFile = async (context) => {
  const body = await context.request.body({ type: "form" });
  const params = await body.value;
  const password = params.get('password');
  const id = params.get('id');
  // console.log(body, params, password, id);
  const file = await retrieveFile(password, id);
  // console.log(file)
  if (!file) {
    context.response.status = 401;
    return;
  }
  context.response.body = file.data;
  context.response.headers.set("Content-Type", file.type);
  // await send(context, file.name,
  //   {
  //     root: "/",
  //   });
  // const reader = await body.value;
  // const data = await reader.read();
  // const fileDetails = data.files[0];
  
  // console.log('filedetails: ',fileDetails, 'data: ', data);
  // console.log('filecontents: ', fileContents);

  // const pass = await uploadNewFile(fileDetails);
  // response.body = pass;
};

export { viewForm, sendFile, getFile }; 
