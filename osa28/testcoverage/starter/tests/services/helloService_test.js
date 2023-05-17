import { assertEquals } from "https://deno.land/std@0.171.0/testing/asserts.ts";
import { getHello, setHello } from "../../services/helloService.js";

Deno.test("Calling 'getHello()' returns 'Oh, hello there!'", async () => {
  assertEquals("Oh, hello there!", getHello());
});

Deno.test("Calling setHello() with no parameter and calling 'getHello()' returns the original message", async () => {
  setHello("");
  assertEquals("Oh, hello there!", getHello());
});

Deno.test("setHello('HOHOHO!') and calling 'getHello()' returns 'HOHOHO!'", async () => {
  setHello("HOHOHO!");
  assertEquals("HOHOHO!", getHello());
});

Deno.test("setHello('aha!') and setHello('Very long message!') and then calling 'getHello()' returns shorter message", async () => {
  setHello("aha!");
  setHello("Very long message!");
  assertEquals("aha!", getHello());
});