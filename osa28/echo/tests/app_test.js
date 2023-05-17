import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";

import { echo } from "../app.js";

// implement tests here
Deno.test("Function echo returns 'Hello service world!' with the parameter 'Hello service world!'", () => {
    assertEquals(echo("Hello service world!"), "Hello service world!");
});

Deno.test("echo function returns echoechoecho with no parameter set", () => {
    assertEquals(echo(), "echoechoecho!");
});

Deno.test("This test is supposed to fail", () => {
    assertEquals(echo(), "blaaaaaa!");
});