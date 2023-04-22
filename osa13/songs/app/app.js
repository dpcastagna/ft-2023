import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as songService from "./services/songService.js";

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

const addSong = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const rating = formData.get("rating");
  if (name !== null && rating !== null) {
      await songService.create(name, Number(rating));
  }
  return redirectTo("/songs");
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
    songs: await songService.findAll(),
  };
  if (request.method === "POST" && url.pathname === "/songs") {
    return await addSong(request);
  } else if (request.method === "POST" && url.pathname.endsWith("/delete")) {
    return await deleteSong(request);
  } else {
    return new Response(await renderFile("index.eta", data), responseDetails);
  }
};

serve(handleRequest, { port: 7777 });
