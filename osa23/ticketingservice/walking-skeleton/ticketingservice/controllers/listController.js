import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    uncollected: await listEntryService.findUncollected(urlParts[2]),
    collected: await listEntryService.findCollected(urlParts[2])
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllNonCompletedLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const completeTask = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await taskService.deactivateById(urlParts[2]);

  return await requestUtils.redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactivateById(urlParts[2]);

  return await requestUtils.redirectTo("/lists");
};

const viewMain = async (request) => {
  const data = {
    lists: (await listService.findAllLists())[0].count,
    items: (await listEntryService.findAllItems())[0].count,
  };

  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { addList, deactivateList, viewList, viewLists, completeTask, viewMain };