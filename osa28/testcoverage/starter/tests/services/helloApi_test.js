import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import { app } from "../../app.js";

Deno.test("json posted is returned with status 200", async () => {
    const testClient1 = await superoak(app);
    await testClient1.post("/api/hello")
    .send({"message": "jaa"})
    .expect(200)
});

Deno.test("json posted in the previous test is returned", async () =>{
    const testClient2 = await superoak(app);
    await testClient2.get("/api/hello")
    .expect({"message": "jaa"});
});