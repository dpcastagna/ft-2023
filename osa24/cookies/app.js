import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const hello = async ({ cookies, request, response }) => {
  
  //console.log(request.url.pathname.includes("admin"));
  //console.log(await cookies.get("secret"), cookies)
  if (await cookies.get("secret")) {
    const cookie = await cookies.get("secret");
    response.body = `The secret is ${cookie}`;
  } else {
    const cookie = await cookies.get("secret");
    response.body = `The secret is ${cookie}`;
  }

  
};

app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
    app.listen({ port: 7777 });
  }
  
export default app;