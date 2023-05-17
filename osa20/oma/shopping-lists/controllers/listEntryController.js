import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await listEntryService.addItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const collectItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listEntryService.collectItem(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { addItem, collectItem };