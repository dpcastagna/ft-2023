import { lastUploadedId, uploadNewFile } from "../../services/fileService.js";

const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const sendFile = async ({ render, request, response }) => {
  const body = request.body({ type: "form-data" });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];
  console.log(fileDetails, data);

  const pass = await uploadNewFile();
  response.body = pass;
};

export { viewForm, sendFile };
