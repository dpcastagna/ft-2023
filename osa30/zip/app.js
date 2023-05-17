import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const data = {
  name: "Karen Spärck Jones",
  yearOfBirth: 1935,
  title: "Professor",
};

const sendData = ({ response }) => {
  response.body = data;
  response.headers.set("Content-Type", "application/zip");
};

app.use(sendData);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
