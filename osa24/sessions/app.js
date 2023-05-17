import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.0.5/mod.ts";

const app = new Application();
app.use(Session.initMiddleware());

const sessionGreet = async (context) => {
  let count = await context.state.session.get("count");
  if (!count || count < 3) {
    if (!count) {
      count = 0;
    }
    await context.state.session.set("count", Number(count) + 1);
    context.response.body = `Welcome! Here are the truths that you are seeking for!`;
  } else {
    context.response.body = `No more free truths. Payment required.`;
  }
  
};

app.use(sessionGreet);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;