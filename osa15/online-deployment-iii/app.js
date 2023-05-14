import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as messageService from "./services/messageService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response("-", {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addMessage = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");
  //if (rating !== null) {
      await messageService.create(sender, message);
  //}
  return redirectTo("/");
};

const deleteSong = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await songService.deleteById(id);

  return redirectTo("/songs");
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const data = {
    //songs: await songService.findAll(),
    //average: Number.parseFloat((await songService.findAverage())[0].avg).toFixed(1),
    messages: await messageService.findLatest(),
  };
  
  if (request.method === "POST" && url.pathname === "/") {
    return await addMessage(request);
  /*} else if (request.method === "POST" && url.pathname.endsWith("/delete")) {
    return await deleteSong(request);*/
  } else {
    return new Response(await renderFile("index.eta", data), responseDetails);
  }
};

serve(handleRequest, { port: 7777 });
