import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";

import { app } from "../app.js";

// implement tests here
Deno.test("json posted is returned", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
    .send({"name": "jaa"})
    .expect({"name": "jaa"});
});

Deno.test("json posted with extra keys and values is returned", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
    .send({"name": "jaa", "age": 123})
    .expect({"name": "jaa", "age": 123});
});

Deno.test("json posted with extra keys and values is returned with only name", async () => {
    const testClient = await superoak(app);
    await testClient.post("/name")
    .send({"name": "jaa", "age": 123})
    .expect({"name": "jaa"});
});

Deno.test("This test should fail 1", async () => {
    const testClient = await superoak(app);
    await testClient.post("/name")
    .send({"name": "jaa", "age": 123})
    .expect({"name": "jaa", "age": 123});
});

Deno.test("This test should fail 2", async () => {
    const testClient = await superoak(app);
    await testClient.post("/")
    .send({"name": "jaa", "age": 123})
    .expect({"age": 123});
});